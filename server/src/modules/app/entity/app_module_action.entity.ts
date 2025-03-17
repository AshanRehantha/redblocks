import {  Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AppPermission } from "./app_permission.entity";

@Entity({name:'app_module_actions'})
export class AppModuleActions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'name'})
    name: string;

    @Column({name:'description'})
    description: number;

    // @OneToMany(() => AppPermission, (action) => action.appModule)
    // AppPermission:AppPermission[];

}