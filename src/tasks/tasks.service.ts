import { Injectable, NotFoundException, Search } from '@nestjs/common';
import {  TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFileterDto } from './dto/Get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksModule } from './tasks.module';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
@Injectable()
export class TasksService {
    tasks: Task[];
    constructor(
        @InjectRepository(Task)
        private taskRepository:Repository<Task>,
    ){} 
    async getTask(filterDto:GetTasksFileterDto) : Promise<Task[]> {
        return Promise.resolve(this.getTaskWithFilters(filterDto));
    }
   
    // private tasks:Task[]= []; //this mean setting for empty  | pub,pr will you design for using 
     

    getAllTasks():Task[]{
        return this.tasks;
    }
    getTaskWithFilters(filterDto:GetTasksFileterDto):Task[]{
        const {status, serch} = filterDto;

        let tasks  = this.getAllTasks();
        console.log({tasks});
        
        if (status) { 
            tasks = tasks.filter((task) => task.status === status);
        }
        if (serch) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(serch) || task.description.includes(serch)){
                    return true;
                }
                return false;
            });
        }
        return tasks;
    }
        async getTaskById(id:string) : Promise<Task> {
            const found =  await this.taskRepository.findOne({where:{id}});
            if (!found) {
                throw new NotFoundException(`Task with this ID "${id}" not found `)
        }
                return found;
    }

        async createTask(createTaskDto:CreateTaskDto):Promise<Task> {
        // return this.taskRepository.create(createTaskDto);
        const {title,description} = createTaskDto;
        const task = this.taskRepository.create({
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN,
        })
        await this.taskRepository.save(task);
        return task;
        }
        //     const { title,description} =createTaskDto;

        //     const task = this.taskRepository.create({
        //         title,
        //         description,
        //         status: TaskStatus.OPEN,
        //     });  
        //     await this.taskRepository.save(task);
        //     return task;
        // }
//     getTaskById(id:string):Task  {
//         //if array meaing calling all to using 
//         // return this.tasks.find( (task) => task.id === id);'
//         const found = this.tasks.find( (task) => task.id === id);   
//         if (!found) {
//                 throw new NotFoundException(`This task by this ${id} has been not found `);//lib error
//         }   
//         // return { message }
//             return found;
//     }
//     createTaslk(createTaskDto:CreateTaskDto):Task{ //Tacking Task for know type of it 

//         const  {title ,description} = createTaskDto;
//         const task :Task =  {
//             id:uuid(),  
//             title,
//             description,
//             status:TaskStatus.OPEN
//         };

//         this.tasks.push(task);  
//         return task;
//     }
    async deleteTask (id:string): Promise <void> {
        const result = await this.taskRepository.delete(id);
        console.log(result)
        // const found  = this.getTaskById(id); //getTaskById and using on found.id for NotFoundException
        // this.tasks = this.tasks.filter((task) => task.id !== found.id);
    }
    async updateTaskStatus ( id:string , status:TaskStatus) : Promise<Task>
    {
        const task = await this.getTaskById(id);
        // const task =  this.getTaskById(id);
        // task.status  = status;
        task.status = status;
        await this.taskRepository.save(task);
        return  task ;
// }
}
}