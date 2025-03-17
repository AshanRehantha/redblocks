import {  Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AppsModules } from "./app.modules.entity";
import { AppPermission } from "./app_permission.entity";

@Entity({name:'app_submodules'})
export class AppSubModules {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'name'})
    name: string;

    @Column({name:'module_id'})
    moduleId: string;
  
    @Column({name:'description'})
    description: string;

    // @ManyToOne(() => AppsModules, (appModule) => appModule.subModules)
    // @JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
    // appModule: AppsModules;

    @OneToMany(() => AppPermission, (permissionAction) => permissionAction.subModule)
    AppPermission: AppPermission[];

}