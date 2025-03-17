import {  Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'app_status'})
export class AppStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    description: string;
  
    @Column({name:'status_name'})
    name: string;
}