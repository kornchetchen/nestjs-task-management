
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";


@EntityRepository(Task)
//in this we using Task form task entity for taking 
export class TaskRepository  extends Repository<Task>{

}