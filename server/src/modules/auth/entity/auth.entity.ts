import { AppStatus } from "src/modules/app/entity/app.status.entity";
import { AppUserTypes } from "src/modules/app/entity/app.user-types.entity";
import {  Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn({name:'id'})
    id: number;

    @Column()
    user_id: number;
  
    @Column({ nullable: false, name:'password' })
    password: string;

    @Column({ nullable: false, name:'status_id' })
    statusId: number;

    @Column({ nullable: false, name:'user_type' })
    userType?: number;

    // @OneToOne(() => AppUserTypes, { cascade: true })
    // @JoinColumn({name:'user_type', referencedColumnName:'id'})
    // userTypes:AppStatus;

    @OneToOne(() => AppStatus, { cascade: true })
    @JoinColumn({name:'status_id', referencedColumnName:'id'})
    status:AppStatus;

}