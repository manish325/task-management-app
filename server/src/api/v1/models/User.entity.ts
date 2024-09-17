import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Task } from "./Task.entity";
import { Role } from "./Role.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({
        name : 'user_id'
    })
    id !: number;

    @Column({
        nullable : false,
        unique : true
    })
    email !: string;
    
    @Column({
        nullable : false
    })
    firstName !: string;

    @Column({
        nullable : false
    })
    lastName !: string;

    @Column({
        nullable : true
    })
    password !: string;

    @Column({
        nullable : true
    })
    profilePicture !: string;

    @Column({
        nullable : false
    })
    isRegisteredViaGoogle !: boolean;

    @OneToMany(
        () => Task,
        (task) => task.user
    )
    tasks !: Task[];

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'role_users_user', // name of the join table
        joinColumn: { name: 'userUserId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'roleRoleId', referencedColumnName: 'id' }
    })
    roles !: Role[];
}