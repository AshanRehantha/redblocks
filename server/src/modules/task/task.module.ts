import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entity/task.entity';
import { ReturnRequest } from 'src/helpers/common/return.request';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { UserMaster } from '../user/entity/user-master.entity';
import { AppPriority } from '../app/entity/app.priority.entity';
import { AppStatus } from '../app/entity/app.status.entity';
import { PusherService } from 'src/helpers/common/pusher/pusherService';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tasks,
      UserMaster,
      AppPriority,
      AppStatus
  ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, ReturnRequest, AppQueryBuilder, PusherService]
})
export class TaskModule {}
