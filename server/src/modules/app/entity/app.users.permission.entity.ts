import { Customer } from "src/modules/user/entity/user.audit.entity";
import {  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppsModules } from "./app.modules.entity";
import { AppSubModulePermission } from "./app.submodulepermission.entity";
import { UserMaster } from "src/modules/user/entity/user-master.entity";
import { AppModulesAction } from "./app.module.actions.entity";

@Entity({name:'app_permission'})
export class AppUsersPermission {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'user_id'})
    userId: number;

    @Column({name:'module_id'})
    moduleId: number;

    @Column({name:'action_id'})
    actionId: number;

    @ManyToOne(() => UserMaster, (userMaster) => userMaster.permissions)
    @JoinColumn({name:'user_id', referencedColumnName:'id'})
    userMaster: UserMaster;

    @ManyToOne(() => AppsModules, (appModule) => appModule.permissions)
    @JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
    appModule: AppsModules;

    @ManyToOne(() => AppModulesAction, (appModule) => appModule.permissions)
    @JoinColumn({ name: 'action_id', referencedColumnName: 'id' })
    appAction: AppModulesAction;

}