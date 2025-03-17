import { Customer } from "src/modules/user/entity/user.audit.entity";
import {  Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AppsModules } from "./app.modules.entity";
import { AppSubModulePermission } from "./app.submodulepermission.entity";

@Entity({name:'app_permission_action'})
export class AppPermissionAction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    customer_id: number;

    @Column()
    module_id: number;

    @Column()
    sub_module_id: number;

    @ManyToOne(() => Customer, (customer) => customer.action)
    @JoinColumn({name:'customer_id', referencedColumnName:'id'})
    customer: Customer;

    // @ManyToOne(() => AppsModules, (appModule) => appModule.permissionAction)
    // @JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
    // appModule: AppsModules;

    @ManyToOne(() => AppSubModulePermission, (subModule) => subModule.permissionActions)
    @JoinColumn({ name: 'sub_module_id', referencedColumnName: 'id' })
    subModule: AppSubModulePermission;
    
}