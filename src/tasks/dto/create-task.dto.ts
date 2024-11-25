import { IsNotEmpty, IsString } from "class-validator";
import { PrimaryColumn } from "typeorm";

export class CreateTaskDto {
    @PrimaryColumn('uuid')
    id: string;

    // @IsNotEmpty()
    title:string;

    // @IsNotEmpty()
    description: string;
}