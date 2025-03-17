import { Customer } from "src/modules/user/entity/user.audit.entity";
import {  Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AppsModules } from "./app.modules.entity";
import { AppPermissionAction } from "./app.moduleaction.entity";

@Entity({name:'app_sub_module_permission'})
export class AppSubModulePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    customer_id: number;

    @Column()
    module_id: number;

    @Column({name:'display_name'})
    displayName: number;

    @ManyToOne(() => Customer, (customer) => customer.submodules)
    @JoinColumn({name:'customer_id', referencedColumnName:'id'})
    customer: Customer;

    // @ManyToOne(() => AppsModules, (appModule) => appModule.subModules)
    // @JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
    // appModule: AppsModules;

    @OneToMany(() => AppPermissionAction, (permissionAction) => permissionAction.subModule)
    permissionActions: AppPermissionAction[];

    

}