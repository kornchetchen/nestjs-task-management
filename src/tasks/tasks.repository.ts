
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { GetTasksFileterDto } from "./dto/Get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";


@EntityRepository(Task)
//in this we using Task form task entity for taking 
export class TaskRepository  extends Repository<Task>{
    async getTasks(filterDto:GetTasksFileterDto) : Promise<Task[]> {
        
        const query = this.createQueryBuilder('task');
        const task = await query.getMany();
        return task;
    }

    async createTask(createTaskDto:GetTasksFileterDto):Promise<Task> {
        const { title, description} = createTaskDto;

        const task  = this.create({
            title,
            description,
            status:TaskStatus.OPEN,
        });

        await this.save(task)
        return  task;
    }

}