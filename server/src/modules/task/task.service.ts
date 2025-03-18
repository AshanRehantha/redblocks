import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskCreateDto, TaskDeleteDto, TaskListDto, TaskUpdateDto } from './dto/tash.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entity/task.entity';
import { ReturnRequest } from 'src/helpers/common/return.request';
import { APP_STATUS_DONE, SUCCESS_MESSAGES } from 'src/helpers/common/constants';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { UserMaster } from '../user/entity/user-master.entity';
import { AppPriority } from '../app/entity/app.priority.entity';
import { AppStatus } from '../app/entity/app.status.entity';
import { PusherService } from 'src/helpers/common/pusher/pusherService';

@Injectable()
export class TaskService {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,

        @InjectRepository(Tasks)
        private readonly taskRepository: Repository<Tasks>,

        @InjectRepository(UserMaster)
        private readonly userMasterRepository: Repository<UserMaster>,

        /*appl repository */

        @InjectRepository(AppPriority)
        private readonly appPriorityRepository: Repository<AppPriority>,

        @InjectRepository(AppStatus)
        private readonly appStatusRepository: Repository<AppStatus>,

        private readonly returnRequest:ReturnRequest,
        private readonly queryBuilder: AppQueryBuilder,
        private pusherService: PusherService
    ) {

    }


    private async mapper(data:any){
        return {
            taskList: await Promise.all(data.map(async (list: any) => ({
                taskId:list?.id,
                taskName: list?.taskName,
                taskDescription: list?.taskDescription,
                user: await this.userMasterRepository.find({
                    where: { id: list?.UserId },
                    select: ['firstName', 'lastName', 'department', 'id']
                }),
                priority: await this.queryBuilder.findByFieldName(this.appPriorityRepository, "id", list?.priority),
                status: await this.queryBuilder.findByFieldName(this.appStatusRepository, "id", list?.status),
                DueDate: list?.dueDate,
            }))),
        };
    }

    async taskList(request:any, payload:TaskListDto): Promise<any> {
        try{
            let list = await this.queryBuilder.findAllByWithRelations(this.taskRepository, [], []);
            return this.returnRequest.successRequest(await this.mapper(list));
        }catch (error) {
            throw new HttpException({error:"System Error",error_code:2025031806}, HttpStatus.BAD_REQUEST);
        }
    }

    async userTaskList(request:any, payload:TaskListDto):Promise<any> {
        try{
            let list = await this.queryBuilder.findAllByWithRelations(this.taskRepository, {
                'UserId': request?.user?.user?.userId,
            }, []);
            return this.returnRequest.successRequest(await this.mapper(list));
        }catch (error) {
            throw new HttpException({error:"System Error",error_code:2025031806}, HttpStatus.BAD_REQUEST);
        }
    }

    async taskDelete(request:any, payload:TaskDeleteDto):Promise<any> {
        let queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const deleteResult = await queryRunner.manager.delete(Tasks, {id: payload?.taskId});
            if(deleteResult.affected === 0){
                throw new HttpException({error:"No task Id found",error_code:2025031807}, HttpStatus.BAD_REQUEST);
            }
            await queryRunner.commitTransaction();
            return this.returnRequest.successRequest(SUCCESS_MESSAGES.SUCCESS_DELETE_TASKS);
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

    async createTask(request:any, payload:TaskCreateDto): Promise<any> {
        let queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const userId = await this.queryBuilder.findByFieldId(this.userMasterRepository, "userName", payload?.userName);
            let entity = Object.assign(new Tasks(), payload);
            entity.UserId = userId;
            entity.status = 1;
            let task =  await queryRunner.manager.save(Tasks, entity);
            if(!task){
                throw new HttpException({error:"System Error",error_code:2025031804}, HttpStatus.BAD_REQUEST);
            }
            await queryRunner.commitTransaction();
            return this.returnRequest.successRequest(SUCCESS_MESSAGES.SUCCESS_USER_CREATE);
        }catch (error) 
        {
            await queryRunner.rollbackTransaction();
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException({error:"System Error",error_code:2025031805}, HttpStatus.BAD_REQUEST);
        }finally{
            await queryRunner.release();
        }
    }

    async updateTask(request:any, payload:TaskUpdateDto): Promise<any> {
        let queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const task = await queryRunner.manager.findOne(Tasks, { where: { id: payload?.taskId } })
            if(task){
                task.status = await this.queryBuilder.findByFieldId(this.appStatusRepository, 'name', APP_STATUS_DONE);
                const updatedTask = await queryRunner.manager.save(Tasks, task);
                if(!updatedTask){
                    throw new HttpException({error:"System Error",error_code:2025031812}, HttpStatus.BAD_REQUEST);
                }
                await queryRunner.commitTransaction();
                return this.returnRequest.successRequest(SUCCESS_MESSAGES.SUCCESS_UPDATE_TASK_STATUS);
            }
        }catch (error) {
            await queryRunner.rollbackTransaction();
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException({error:"System Error",error_code:2025031813}, HttpStatus.BAD_REQUEST);
        }finally{
            await queryRunner.release();
        }
    }


}
