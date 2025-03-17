import { AppsModules } from "src/modules/app/entity/app.modules.entity";
import { Customer } from "src/modules/user/entity/user.audit.entity";
import {  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user_permission'})
export class UserPermission {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({ name: 'customer_id' })
    customerId: number;

    @Column({ name: 'module_id' })
    moduleId: number;


    @ManyToOne(() => Customer, (customer) => customer.permissions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;


    @ManyToOne(() => AppsModules, { cascade: true })
    @JoinColumn({name:'module_id', referencedColumnName:'id'})
    module:AppsModules;


}