import {  Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AppsModules } from "./app.modules.entity";
import { AppSubModules } from "./app.sub-module.entity";
import { AppModuleActions } from "./app_module_action.entity";

@Entity({name:'app_permissions'})
export class AppPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'user_id'})
    userId: number;

    @Column({name:'module_id'})
    moduleId: number;

    @Column({name:'submodule_id'})
    submoduleId: number;

    @Column({name:'action_id'})
    actionId: number;


    // @ManyToOne(() => AppsModules, (appModule) => appModule.permissionAction)
    // @JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
    // appModule: AppsModules;

    @ManyToOne(() => AppSubModules, (subModule) => subModule.AppPermission)
    @JoinColumn({ name: 'submodule_id', referencedColumnName: 'id' })
    subModule: AppSubModules;

    // @ManyToOne(() => AppModuleActions, (appAction) => appAction.AppPermission)
    // @JoinColumn({ name: 'action_id', referencedColumnName: 'id' })
    // actions: AppSubModules;

}