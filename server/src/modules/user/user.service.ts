import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entity/auth.entity';
import { DataSource, Repository } from 'typeorm';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { Customer } from './entity/user.audit.entity';
import { CustomerDto, DeleteEmployeesDto, EmailVerifyDto, GetModulesDto, GetPermissionDto, ResetPasswordDto, UpdatePasswordFirstTimeDto, UserCreateDto } from './dto/user.dto';
import { APP_MODULE_DASHBOARD_NAME, APP_STATUS_ACTIVE, APP_USER_AUTH_TYPE_CHANGED_PASSWORD, APP_USER_AUTH_TYPE_FIRST_TIME_LOGIN, APP_USER_AUTH_TYPE_PASSWORD_RESET, APP_USER_TYPE_SUPER_ADMIN, APP_USER_TYPE_USER, ERROR_MESSAGES, GLOBAL_DATE_TIME, LOGGER_TYPES, SUCCESS_MESSAGES } from 'src/helpers/common/constants';
import { AppStatus } from '../app/entity/app.status.entity';
import { Encryption } from 'src/helpers/common/encrypet/encrypte';
import { AppUserTypes } from '../app/entity/app.user-types.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ReturnRequest } from 'src/helpers/common/return.request';
import { LoggerService } from 'src/helpers/logger/logger.service';

import { AppUsersPermission } from '../app/entity/app.users.permission.entity';
import { UserMaster } from './entity/user-master.entity';

@Injectable()
export class UserService {
    private currentDateTime: any;

    constructor(
        @InjectRepository(AppStatus)
        private readonly appStatus: Repository<AppStatus>,

        @InjectRepository(AppUserTypes)
        private readonly appUserType: Repository<AppUserTypes>,

        @InjectRepository(AppUsersPermission)
        private readonly appUsersPermission: Repository<AppUsersPermission>,

        @InjectRepository(UserMaster)
        private readonly userMasterRepository: Repository<UserMaster>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectDataSource()
        private readonly dataSource: DataSource,

        private readonly appData: AppQueryBuilder,
        private readonly passwordHashed: Encryption,
        private readonly returnRequest:ReturnRequest,
        private readonly logger: LoggerService,


   ) {
    this.currentDateTime =  Date.now(); 
   }

   async createUser(request:any, payload:UserCreateDto): Promise<any> {
        let queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const entity = Object.assign(new UserMaster(), payload);
            let users =  await queryRunner.manager.save(entity);

            if(!users){
                throw new HttpException({error:"System Error",error_code:2025031801}, HttpStatus.BAD_REQUEST);
            }

            let auth = await queryRunner.manager.save(User,{
                user_id: users.id,
                statusId: await this.appData.findByFieldId(this.appStatus, "name", APP_STATUS_ACTIVE),
                userType: await this.appData.findByFieldId(this.appUserType, "name", APP_USER_TYPE_USER),
                password: await this.passwordHashed.passwordHashed(payload?.password)
                })
            if(!auth){
                throw new HttpException({error:"System Error",error_code:2025031802}, HttpStatus.BAD_REQUEST);
            }
            await queryRunner.commitTransaction();

            return this.returnRequest.successRequest(SUCCESS_MESSAGES.SUCCESS_USER_CREATE);

        }catch (error) {
            await queryRunner.rollbackTransaction();
            throw new HttpException({error:"System Error",error_code:2025031803}, HttpStatus.BAD_REQUEST);
        }finally{
            await queryRunner.release();
        }
   }

   async getModules(request:any, payload:GetModulesDto): Promise<any> {
    try {

         const permission = await this.appUsersPermission
            .createQueryBuilder('appUserPermission')
            .innerJoinAndSelect('appUserPermission.appModule', 'appModule')
            .innerJoinAndSelect('appUserPermission.appAction', 'appAction')
            .where('appUserPermission.userId = :userId', { userId: request?.user?.user?.userId })
            .getMany();

        return this.returnRequest.successRequest(this.groupByMapper(permission));
    }
    catch (error) {
            const errorResponse = {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error?.message,
            };
            throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
        }
   }

   async getUserList(request:any, payload:GetModulesDto): Promise<any> {
    try{
        let list = await this.appData.findAllByWithRelations(this.userMasterRepository, [], []);
        return this.returnRequest.successRequest(list);
    }catch (error) {
        throw new HttpException({error:"System Error",error_code:2025031807}, HttpStatus.BAD_REQUEST);
    }
   }

   async deleteUsers(request:any, payload:DeleteEmployeesDto): Promise<any> {
            let queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
    
            try{
                const deleteUserTable = await queryRunner.manager.delete(User, {user_id: payload?.id});
                if(deleteUserTable.affected === 0){
                    throw new HttpException({error:"No task Id found",error_code:2025031810}, HttpStatus.BAD_REQUEST);
                }
                const deleteResult = await queryRunner.manager.delete(UserMaster, {id: payload?.id});
                if(deleteResult.affected === 0){
                    throw new HttpException({error:"No task Id found",error_code:2025031810}, HttpStatus.BAD_REQUEST);
                }
                await queryRunner.commitTransaction();
                return this.returnRequest.successRequest(SUCCESS_MESSAGES.SUCCESS_DELETE_EMPLOYEES);
            }catch (error) {      
                await queryRunner.rollbackTransaction();
                if (error instanceof HttpException) {
                    throw error;
                }
                throw new HttpException({error:"System Error",error_code:2025031808}, HttpStatus.BAD_REQUEST);
            }finally{
                await queryRunner.release();
            }
   }

   async getUserDetails(request:any, payload:any):Promise<any> {
            const users = await this.userMasterRepository
            .createQueryBuilder('userMaster')
            .innerJoinAndSelect('userMaster.user', 'user')
            .where('userMaster.id = :userId', { userId: request?.user?.user?.userId })
            .getMany();

            const response = {
                userName: users[0].userName,
                firstName: users[0].firstName,
                lastName: users[0].lastName,
                department: users[0].department,
                userType: users[0].user?.userType,
            }

            return this.returnRequest.successRequest(response);
   }

   private groupByMapper(permission: any){ 
    return Object.values(
        permission.reduce((acc:any, permission:any) => {
            const { moduleId, appModule, appAction } = permission;
            if (!acc[moduleId]) {
              acc[moduleId] = {
                appModule,
                actions: []
              };
            }
            acc[moduleId].actions.push(appAction);
            return acc;
          }, {})
    )
   }
}