import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";
import { Task } from "./Task.entity";

@Entity()
export class Stage extends BaseEntity {
    @PrimaryGeneratedColumn({
        name : 'stage_id'
    })
    id !: number;

    @Column({
        nullable : false
    })
    stage !: string;

    @Column({
        default : false
    })
    isDefault : boolean = false;

    @OneToMany(
        () => Task,
        task => task.stage
    )
    tasks !: Task[];

}