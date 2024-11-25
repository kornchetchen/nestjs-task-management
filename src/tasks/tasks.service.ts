import { Injectable, NotFoundException, Search } from '@nestjs/common';
import { Task , TaskStatus } from './tasks.model';
import { v4  as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFileterDto } from './dto/Get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasks:Task[]= []; //this mean setting for empty  | pub,pr will you design for using 
     

    getAllTasks():Task[]{
        return this.tasks;
    }
    getTaskWithFilters(filterDto:GetTasksFileterDto):Task[]{
        const {status, serch} = filterDto;

        let tasks  = this.getAllTasks();
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
    getTaskById(id:string):Task {
        // return this.tasks.find( (task) => task.id === id);'
        const found = this.tasks.find( (task) => task.id === id);   
        if (!found) {
                throw new NotFoundException(`This task by this ${id} has been not found `);
        }
            return found;
    }
    createTaslk(createTaskDto:CreateTaskDto):Task{ //Tacking Task for know type of it 

        const  {title ,description} = createTaskDto;
        const task :Task =  {
            id:uuid(),  
            title,
            description,
            status:TaskStatus.OPEN
        };

        this.tasks.push(task);  
        return task;
    }
    deleteTask (id:string): void {
        const found  = this.getTaskById(id); //getTaskById and using on found.id for NotFoundException
        this.tasks = this.tasks.filter((task) => task.id !== found.id);
    }
    updateTaskStatus ( id:string , status:TaskStatus) 
    {
        const task =  this.getTaskById(id);
        task.status  = status;
        return  task ;
}}