import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPermission } from './entity/permission.entity';
import { Repository } from 'typeorm';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { AppUserPermission } from '../app/entity/app.user.permission.entity';
import { AppsModules } from '../app/entity/app.modules.entity';
import { AppPermission } from '../app/entity/app_permission.entity';
import { AppSubModules } from '../app/entity/app.sub-module.entity';
import { AppModuleActions } from '../app/entity/app_module_action.entity';
import { AppUsersPermission } from '../app/entity/app.users.permission.entity';
import { AppModulesAction } from '../app/entity/app.module.actions.entity';

interface UserId {
    id:number;
}
interface ModuleName {
    name:any;
}
@Injectable()
export class PermissionService {
    constructor(

        @InjectRepository(UserPermission)
        private readonly AppUserPermissionRepository: Repository<UserPermission>,

        @InjectRepository(AppsModules)
        private readonly AppsModuleRepository: Repository<AppsModules>,

        @InjectRepository(AppUsersPermission)
        private readonly appPermission: Repository<AppUsersPermission>,

        @InjectRepository(AppModulesAction)
        private readonly appPermissionActions: Repository<AppModulesAction>,

        private queryBuilder:AppQueryBuilder
    ){}

    async checkPermission(userId: number, moduleName: string, actionName: string): Promise<any> {

        try {
            const getModalId = await this.queryBuilder.findByFieldId(this.AppsModuleRepository, "name", moduleName);
            const getActionId = await this.queryBuilder.findByFieldId(this.appPermissionActions, "actionName", actionName);

            const userPermission = await this.appPermission
                                        .createQueryBuilder('appPermission')
                                        .innerJoin(AppsModules, 'appModule', 'appModule.id = appPermission.module_id')
                                        .where('appPermission.user_id = :userId', { userId })
                                        .andWhere('appPermission.module_id = :moduleId', { moduleId: getModalId })
                                        .andWhere('appPermission.action_id = :actionId', { actionId:getActionId })
                                        .getOne();                      
            if(userPermission === null) {
                throw new UnauthorizedException("module or submodule permission not available");
            }
            return true; 
        }
        catch (error) {
            throw new UnauthorizedException(error.message);
        }

    }

}
