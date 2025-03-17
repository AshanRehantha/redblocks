import {  Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./user.audit.entity";

@Entity({name:'user_email_verify'})
export class UserEmailVerify {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'user_id'})
    user_id: number;

    @Column({name:'user_temp_code'})
    userTempCode: string;

    @Column({name:'is_user_verify'})
    isUserVerify: boolean;


}