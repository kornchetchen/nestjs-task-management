
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { GetTasksFileterDto } from "./dto/Get-tasks-filter.dto";


@EntityRepository(Task)
//in this we using Task form task entity for taking 
export class TaskRepository  extends Repository<Task>{
    async getTasks(filterDto:GetTasksFileterDto) : Promise<Task[]> {
        
        const query = this.createQueryBuilder('task');
        const task = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto:GetTasksFileterDto):Promise<Task> {
        const { title, description} = createTaskDto;

        const talk  = this.create({
            title,
            description,
            status:TaskStatus.OPEN,
        });

        await this.save(task)
        return  task;
    }

}