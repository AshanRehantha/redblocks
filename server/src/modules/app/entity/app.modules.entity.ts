import { UserPermission } from "src/modules/permission/entity/permission.entity";
import {  Column, Entity, JoinColumn,  OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppUsersPermission } from "./app.users.permission.entity";


@Entity({name:'app_modules'})
export class AppsModules {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'module_name'})
    name: string;

    @Column({name:'module_description'})
    displayName: string;
  

    @OneToMany(() => AppUsersPermission, (permission) => permission.appModule)
    @JoinColumn({name:'id', referencedColumnName:'module_id'})
    permissions: AppUsersPermission[];


}