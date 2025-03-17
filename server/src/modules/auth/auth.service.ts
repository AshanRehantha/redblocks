import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SignInDto } from './dto/auth.dto';
import { User } from './entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Encryption } from 'src/helpers/common/encrypet/encrypte';
import { AppLoginAttempts } from '../app/entity/app.login-attempts.entity';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { AppStatus } from '../app/entity/app.status.entity';
import { APP_STATUS_INACTIVE, ERROR_MESSAGES } from 'src/helpers/common/constants';
import { Customer } from '../user/entity/user.audit.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserMaster } from '../user/entity/user-master.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(AppLoginAttempts)
        private readonly appLoginAttemptsRepository: Repository<AppLoginAttempts>,
        @InjectRepository(AppStatus)
        private readonly appStatus: Repository<AppStatus>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @InjectRepository(UserMaster)
        private readonly userMasterRepository: Repository<UserMaster>,



        @InjectDataSource()
        private readonly dataSource: DataSource,

        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,

        private readonly jwtService: JwtService,
        private readonly encryption: Encryption,
        private readonly appData: AppQueryBuilder,

   ) {}

   async signIn(payload:SignInDto): Promise<any> {

        const user = await this.appData.findByWithRelations(
            this.userMasterRepository, 
            {'email': payload.email}, 
            ['user', 'user.status']);
    
        if(user === null){
            throw new UnauthorizedException();
        };

        if(user.user.status.name === APP_STATUS_INACTIVE){
          //  await this.audit.userAudit(user.id, "user_blocked");
            throw new HttpException(ERROR_MESSAGES.USER_BLOCKED, HttpStatus.BAD_REQUEST);  
        }

        const passwordVerify = await this.encryption.passwordVerify(payload.password, user?.user?.password);

        if(!passwordVerify){
            throw new UnauthorizedException();
        }

        return {
            userId:user.id,
            name:user.firstName,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            contactNumber:user.contactNumber,
            isFirstTimeLogin:user.firstTimeLogin,
        }
   }

   async userLoginAttempts(userId:number): Promise<any> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let attempts = await this.appLoginAttemptsRepository.count({
            where:{userId:userId}
        });

        try {
            if(attempts <= 5){
                const loginAttempt = new AppLoginAttempts();
                loginAttempt.userId = userId;
                await queryRunner.manager.save(AppLoginAttempts, loginAttempt);
                await queryRunner.commitTransaction();
            }else {
                const user = new User();
                user.user_id = userId;
                user.statusId = await this.appData.findByFieldId(this.appStatus, "name", "in-active");

                await queryRunner.manager.save(User, user);
                await queryRunner.commitTransaction();
            }

        }catch (error) {
                await queryRunner.rollbackTransaction();
                throw new HttpException(ERROR_MESSAGES.SYSTEM_ERROR, HttpStatus.BAD_REQUEST);
            }
        finally {
            await queryRunner.release();
        } 

        
   }

   async removeLoginAttempts(userId:number):Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        await queryRunner.manager.delete(AppLoginAttempts, {userId:userId});
        await queryRunner.commitTransaction();
    }catch (error) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(ERROR_MESSAGES.SYSTEM_ERROR, HttpStatus.BAD_REQUEST);
    } finally {
        await queryRunner.release();
    } 

   }

   async jwtToken(user:any): Promise<any> {
    const payload = user;

    return this.jwtService.sign(payload);
   }

   async logOut(request: any):Promise<any> {
    const token = request?.cookies?.["auth-token"] || 
                  request?.headers?.authorization?.split(" ")[1];        
    if(!token){
        throw new UnauthorizedException(ERROR_MESSAGES.SYSTEM_ERROR);
    }

    await this.cacheManager.set(token, 'blacklisted', 100000);
   }


}
