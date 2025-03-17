import { Customer } from "src/modules/user/entity/user.audit.entity";
import {  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppsModules } from "./app.modules.entity";
import { AppSubModulePermission } from "./app.submodulepermission.entity";

@Entity({name:'app_user_permission'})
export class AppUserPermission {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'user_id'})
    userId: number;

    @Column({name:'module_id'})
    moduleId: number;

    @Column({name:'sub_module_id'})
    subModuleId: number;


    @ManyToOne(() => Customer, (customer) => customer.action)
    @JoinColumn({name:'user_id', referencedColumnName:'id'})
    customer: Customer;

    // @ManyToOne(() => AppsModules, (appModule) => appModule.permissionAction)
    // @JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
    // appModule: AppsModules;

    @ManyToOne(() => AppSubModulePermission, (subModule) => subModule.permissionActions)
    @JoinColumn({ name: 'sub_module_id', referencedColumnName: 'id' })
    subModule: AppSubModulePermission;

}