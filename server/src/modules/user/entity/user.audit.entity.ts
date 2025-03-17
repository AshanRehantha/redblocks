import { AppPermissionAction } from "src/modules/app/entity/app.moduleaction.entity";
import { AppSubModulePermission } from "src/modules/app/entity/app.submodulepermission.entity";
import { User } from "src/modules/auth/entity/auth.entity";
import { UserPermission } from "src/modules/permission/entity/permission.entity";
import {  Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEmailVerify } from "./user.emailveryfy.entity";

@Entity({name:'customer'})
export class Customer {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'email'})
    email: string;

    @Column({name:'first_name'})
    firstName: string;

    @Column({name:'last_name'})
    lastName: string;

    @Column({name:'contact_number'})
    contactNumber: string;
    
    @Column({name:'is_first_time_login'})
    firstTimeLogin: number;


    @OneToOne(() => User, { cascade: true })
    @JoinColumn({name:'id', referencedColumnName:'user_id'})
    user:User;

    @OneToMany(() => UserPermission, (permission) => permission.customer)
    permissions: UserPermission[];

    @OneToMany(() => AppSubModulePermission, (submodule) => submodule.customer)
    submodules: AppSubModulePermission[];

    @OneToMany(() => AppPermissionAction, (moduleAction) => moduleAction.customer)
    action: AppPermissionAction[];

    @OneToOne(() => UserEmailVerify)
    @JoinColumn({name:'id', referencedColumnName:'user_id'})
    emailVerify:UserEmailVerify;


}