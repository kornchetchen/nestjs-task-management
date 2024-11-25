import { TaskStatus } from "../tasks.model";

export class getTasksFileterDto{
    status?: TaskStatus;
    serch?:string;
}