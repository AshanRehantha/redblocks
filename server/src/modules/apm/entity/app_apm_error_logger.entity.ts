import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'app_apm_error_logger'})
export class AppApmErrorLogger {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false, name:'status_code' })
    statusCode: string;

    @Column({ nullable: false, name:'method' })
    method: string;

    @Column({ nullable: false, name:'path' })
    path: string;

    @Column({ nullable: false, name:'responseTime' })
    responseTime?: number;

    @Column({ nullable: false, name:'message' })
    message?: string;

}