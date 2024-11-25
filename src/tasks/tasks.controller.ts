import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}


    @Get() // from this has geting type from interface
    getAllTasks():Task[]{ 
        return this.tasksService.getAllTasks();
}
    @Get('id')
    getTaskById(@Param('id') id:string):Task {
        return this.tasksService.getTaskById(id);
    }
    @Post()
    //in this case  we using @Body to recieved build from post 
    //with createTaslk it will be has post value to Task to be get it 
    createTask(@Body()  createTaskDto:CreateTaskDto): Task {
            return this.tasksService.createTaslk(createTaskDto)
        }
        
    }

