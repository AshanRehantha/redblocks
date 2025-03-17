import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class TaskCreateDto {
    @IsNotEmpty({message: "task name is require"})
    taskName: string;

    @IsNotEmpty({message: "Task description is require"})
    taskDescription: string;

    @IsNotEmpty({message: "priority is require"})
    priority: number;

    @IsNotEmpty({message: "Due date is require"})
    dueDate: string;

    @IsNotEmpty({message: "user name is require"})
    userName: string;

}

export class TaskCreateServiceResponseDto {
    @IsNotEmpty()
    responseCode: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    message: string;

    @IsArray()
    data: [];
}

export class TaskCreateResponseDto {
    @ValidateNested()
    @Type(() => TaskCreateServiceResponseDto)
    data: TaskCreateServiceResponseDto;

    @IsNotEmpty()
    status: string;

    constructor(partial: Partial<TaskCreateResponseDto>){
        Object.assign(this, partial);
    }
}

export class TaskListDto {
    @IsOptional()
    pageNumber: number;

}

export class UserTaskListDto {
    @IsOptional()
    pageNumber: number;

}


export class TaskDeleteDto {
    @IsNotEmpty({message: "task id is require"})
    taskId: string;

}

export class TaskDeleteServiceResponseDto {
    @IsNotEmpty()
    responseCode: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    message: string;

    @IsArray()
    data: [];
}

export class TaskDeleteResponseDto {
    @ValidateNested()
    @Type(() => TaskDeleteServiceResponseDto)
    data: TaskDeleteServiceResponseDto;

    @IsNotEmpty()
    status: string;

    constructor(partial: Partial<TaskDeleteResponseDto>){
        Object.assign(this, partial);
    }
}