import { AppUsersPermission } from "src/modules/app/entity/app.users.permission.entity";
import { User } from "src/modules/auth/entity/auth.entity";
import {  Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'users_master'})
export class UserMaster {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'email'})
    email: string;

    @Column({name:'user_name'})
    userName: string;

    @Column({name:'first_name'})
    firstName: string;

    @Column({name:'last_name'})
    lastName: string;

    @Column({name:'contact_number'})
    contactNumber: string;
    
    @Column({name:'is_first_time_login'})
    firstTimeLogin: number;

    @Column({name:'designation'})
    designation: number;

    @Column({name:'department'})
    department: string;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn({name:'id', referencedColumnName:'user_id'})
    user:User;

    @OneToMany(() => AppUsersPermission, (permission) => permission.userMaster)
    permissions: AppUsersPermission[];


}