import {  Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:'app_cpu_usage_details'})
export class AppCpuUsageDetails {

    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'cpu_id'})
    cpuId: string;

    @Column({name:'cpu'})
    cpu: string;

    @Column({name:'cpu_usage'})
    cpuUsage: string;

    @Column({name:'isactive'})
    isActive: string;
}