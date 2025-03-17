import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'app_priority'})
export class AppPriority {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;
    
    @Column({name:'name'})
    name: string;
}