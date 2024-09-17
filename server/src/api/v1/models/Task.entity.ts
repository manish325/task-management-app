import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { User } from "./User.entity";
import { Stage } from "./Stage.entity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn(
        {
            name : 'task_id'
        }
    )
    id !: number;

    @Column()
    title !: string;

    @Column({
        type : 'text'
    })
    description !: string;

    @Column({
        default : true
    })
    isActive !: boolean

    @CreateDateColumn()
    createdAt !: Date;

    @UpdateDateColumn()
    updatedAt !: Date;

    @ManyToOne(
        () => User,
        user => user.tasks
    )
    user !: User;

    @ManyToOne(
        () => Stage,
        stage => stage.tasks
    )
    stage !: Stage;
}