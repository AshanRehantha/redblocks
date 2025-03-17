import {  Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'app_user_auth_type'})
export class AppUserAuthType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}