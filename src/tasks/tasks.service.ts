import { Injectable } from '@nestjs/common';
import { Task , TaskStatus } from './tasks.model';
import { v4  as uuid} from 'uuid';
@Injectable()
export class TasksService {
    private tasks:Task[]= []; //this mean setting for empty  | pub,pr will you design for using 
     
    getAllTasks():Task[]{
        return this.tasks;
    }
    getTaskById(id:string):Task {
        return this.tasks.find( (task) => task.id === id);

    }
    createTaslk(CreateTaskDto):Task{ //Tacking Task for know type of it 

        const  {title ,description} = CreateTaskDto;
        const task :Task =  {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        };

        this.tasks.push(task);  
        return task;
    }
}