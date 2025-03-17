import { Global, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entity/permission.entity';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { AppUserPermission } from '../app/entity/app.user.permission.entity';
import { AppsModules } from '../app/entity/app.modules.entity';
import { AppSubModulePermission } from '../app/entity/app.submodulepermission.entity';
import { AppPermissionAction } from '../app/entity/app.moduleaction.entity';
import { Reflector } from '@nestjs/core';
import { AppPermission } from '../app/entity/app_permission.entity';
import { AppSubModules } from '../app/entity/app.sub-module.entity';
import { AppModuleActions } from '../app/entity/app_module_action.entity';
import { AppUsersPermission } from '../app/entity/app.users.permission.entity';
import { AppModulesAction } from '../app/entity/app.module.actions.entity';

@Global()
@Module({
  imports: 
  [TypeOrmModule.forFeature([
    UserPermission,
    AppUserPermission,
    AppsModules,
    AppSubModulePermission,
    AppPermissionAction,
    AppPermission,
    AppSubModules,
    AppModuleActions,
    AppUsersPermission,
    AppModulesAction
  ])],
  providers: [PermissionService, AppQueryBuilder],
  exports:[PermissionService]
})
export class PermissionModule {}
