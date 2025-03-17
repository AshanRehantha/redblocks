import { DynamicModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entity/auth.entity';
import { Customer } from './entity/user.audit.entity';
import { AppStatus } from '../app/entity/app.status.entity';
import { Encryption } from 'src/helpers/common/encrypet/encrypte';
import { AppUserTypes } from '../app/entity/app.user-types.entity';
import { ReturnRequest } from 'src/helpers/common/return.request';
import { AppUserAuthType } from '../app/entity/app.user-auth-types.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { UserEmailVerify } from './entity/user.emailveryfy.entity';
import { UserPermission } from '../permission/entity/permission.entity';
import { AppsModules } from '../app/entity/app.modules.entity';
import { PermissionService } from '../permission/permission.service';
import { AppUserPermission } from '../app/entity/app.user.permission.entity';
import { AppPermissionAction } from '../app/entity/app.moduleaction.entity';
import { LoggerService } from 'src/helpers/logger/logger.service';
import { BullModule } from '@nestjs/bull';
import { AppPermission } from '../app/entity/app_permission.entity';
import { AppSubModules } from '../app/entity/app.sub-module.entity';
import { AppModuleActions } from '../app/entity/app_module_action.entity';
import { AppUsersPermission } from '../app/entity/app.users.permission.entity';
import { AppModulesAction } from '../app/entity/app.module.actions.entity';
import { UserMaster } from './entity/user-master.entity';

@Module({})
export class UserModule {
  static register(): DynamicModule {
    return {
      module: UserModule,
      imports: [
        CacheModule.register({
          ttl: 3000000,
          max: 100,
        }),
        BullModule.registerQueue({
          name: 'log-queue',
          defaultJobOptions: {
            attempts: 1,
          },
          settings: {
            maxStalledCount: 0,
          },
        }),
        TypeOrmModule.forFeature([
          User,
          Customer,
          AppStatus,
          AppUserTypes,
          AppUserAuthType,
          UserEmailVerify,
          UserPermission,
          AppsModules,
          AppUserPermission,
          AppPermissionAction,
          AppPermission,
          AppSubModules,
          AppModuleActions,
          AppUsersPermission,
          AppModulesAction,
          UserMaster
        ]),
      ],
      controllers: [UserController],
      providers: [
        AppQueryBuilder,
        UserService,
        Encryption,
        ReturnRequest,
        PermissionService,
        LoggerService,
      ],
      exports: [UserService],
    };
  }
}


