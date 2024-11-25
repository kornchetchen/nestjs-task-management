import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFileterDto } from './dto/Get-tasks-filter.dto';
import { UpdateStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}
  ///*** */

//     @Get() // from this has geting type from interface
//     getTasks(@Query() filterDto:GetTasksFileterDto):Task[]{ 
//         //from this it we have any Filter define
//         //call taskService to getTaskwith Filter
//         if (Object.keys(filterDto).length){
//            return this.tasksService.getTaskWithFilters(filterDto);
//         } else {
//             return this.tasksService.getAllTasks();
//         }

            @Get(':/id')
            getTaskById(@Param('id') id:string):Promise<Task> {
                return this.tasksService.getTaskById(id);
                
            }



// }

//     @Get('/:id')
//     getTaskById(@Param('id') id:string):Task {
//         return this.tasksService.getTaskById(id);
//     }
    @Post()
    //in this case  we using @Body to recieved build from post 
    //with createTaslk it will be has post value to Task to be get it 
    createTask(@Body()  createTaskDto:CreateTaskDto): Promise<Task> {
            return this.tasksService.createTask(createTaskDto)
        }

    @Delete('/:id')
    deleteTask(@Param('id') id:string ): Promise <void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string , @Body() updateStatusDto:UpdateStatusDto): Promise<Task> {
        
    const   {status } = updateStatusDto;
    return this.tasksService.updateTaskStatus(id,status)
    }
    }

