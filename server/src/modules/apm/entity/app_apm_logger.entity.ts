import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'app_amp_logger'})
export class AppApmLogger {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false, name:'status_code' })
    statusCode: string;

    @Column({ nullable: false, name:'method' })
    method: string;

    @Column({ nullable: false, name:'path' })
    path: number;

    @Column({ nullable: false, name:'responseTime' })
    responseTime?: number;

}