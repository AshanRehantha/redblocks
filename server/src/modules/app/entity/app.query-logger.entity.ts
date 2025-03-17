import {  Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'app_query_logger'})
export class AppQueryLogger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'method'})
    method: string;

    @Column({name:'duration'})
    duration: number;

    @Column({name:'query'})
    query: string;

    @Column({name:'status'})
    status: string;

    @Column({name:'errorMessage'})
    errorMessage: string;

    @CreateDateColumn({name:'created_at'}) // This auto-handles createdAt with timestamps
    createdAt: Date;

}