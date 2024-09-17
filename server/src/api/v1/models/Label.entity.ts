import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
} from "typeorm";

@Entity()
export class Labels extends BaseEntity {
    @PrimaryGeneratedColumn({
        name : 'label_id'
    })
    id !: number;

    @Column()
    label !: string;
    
}