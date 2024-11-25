import { Column, Entity, PrimaryColumn } from "typeorm";
import { TaskStatus } from "./tasks.model";

@Entity()
export class Task {
    @PrimaryColumn()
    id: string;

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    status:TaskStatus;
}