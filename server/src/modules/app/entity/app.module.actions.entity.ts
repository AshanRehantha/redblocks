import { Customer } from "src/modules/user/entity/user.audit.entity";
import {  Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AppsModules } from "./app.modules.entity";
import { AppSubModulePermission } from "./app.submodulepermission.entity";
import { AppUsersPermission } from "./app.users.permission.entity";

@Entity({name:'app_modules_actions'})
export class AppModulesAction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'action_name'})
    actionName: string;

    @Column({name:'action_description'})
    actionDescription: string;

    @OneToMany(() => AppUsersPermission, (permission) => permission.appModule)
    @JoinColumn({name:'id', referencedColumnName:'action_id'})
    permissions: AppUsersPermission[];
 
}