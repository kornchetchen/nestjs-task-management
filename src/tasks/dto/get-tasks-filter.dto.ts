import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTasksFileterDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    // @IsString()
    title?:string;

    // @IsOptional()
    // @IsString()
    serch?:string;

    // @IsString()
    description:string;
}