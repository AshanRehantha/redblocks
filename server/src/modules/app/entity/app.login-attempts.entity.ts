import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'app_user_login_attempts'})
export class AppLoginAttempts {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'user_id'})
    userId: number;

}