import { AppsModules } from "src/modules/app/entity/app.modules.entity";
import { Customer } from "src/modules/user/entity/user.audit.entity";
import {  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tasks'})
export class Tasks {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({ name: 'task_name' })
    taskName: string;

    @Column({ name: 'task_description' })
    taskDescription: string;

    @Column({ name: 'priority' })
    priority: number;

    @Column({ name: 'status' })
    status: number;

    @Column({ name: 'due_date' })
    dueDate: Date;

    @Column({ name: 'user_id' })
    UserId: number;


    // @ManyToOne(() => Customer, (customer) => customer.permissions, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'customer_id' })
    // customer: Customer;


    // @ManyToOne(() => AppsModules, { cascade: true })
    // @JoinColumn({name:'module_id', referencedColumnName:'id'})
    // module:AppsModules;


}