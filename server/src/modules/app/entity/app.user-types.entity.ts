import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'app_user_types'})
export class AppUserTypes {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;
    
    @Column({name:'name'})
    name: string;

}