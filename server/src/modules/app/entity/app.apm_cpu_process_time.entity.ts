import {  Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name:'app_apm_cpu_process_time'})
export class AppApmCpuProcessTime {

    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column({name:'total_cpus'})
    totalCpus: string;

    @Column({name:'over_all_cpu_usage'})
    overallCpuUsage: string;

    @Column({name:'active_cpus'})
    activeCpus: string;

    @Column({name:'cpu_details'})
    cpuDetails: string;

    @Column({name:'date'})
    date: Date;

    @Column({name:'time'})
    time: string;

}