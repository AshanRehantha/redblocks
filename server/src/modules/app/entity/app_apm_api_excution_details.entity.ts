import {  Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:'app_apm_api_excution_details'})
export class AppApmExecutionDetails {

    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'method'})
    method: string;

    @Column({name:'path'})
    path: string;

    @Column({name:'time'})
    time: string;
}