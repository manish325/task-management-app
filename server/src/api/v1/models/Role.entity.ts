import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinTable,
    ManyToMany
} from "typeorm";
import { User } from "./User.entity";


@Entity()
export class Role {
    @PrimaryGeneratedColumn({
        name : 'role_id'
    })
    id !: number;

    @Column()
    role !: string;

    @ManyToMany(() => User, user => user.roles)
    users !: User[];
}