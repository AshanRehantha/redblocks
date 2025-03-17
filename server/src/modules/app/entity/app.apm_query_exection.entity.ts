import {  Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:'app_apm_query_execution'})
@Unique(['tableName', 'executionTime'])
export class AppApmQueryExecution {

    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'table_name'})
    tableName: string;

    @Column({name:'execution_time'})
    executionTime: string;

    @Column({name:'is_low_query'})
    isLowQuery: string;

}