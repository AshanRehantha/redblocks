import { Body, Controller, Post, Request, SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/helpers/filters/http-exception.filter';
import { PermissionGuard } from 'src/helpers/guard/permission.guard';
import { TASK_CREATE_PERMISSION, TASK_LIST_PERMISSION} from 'src/helpers/common/constants';
import { TaskService } from './task.service';
import { TaskCreateDto, TaskCreateResponseDto, TaskDeleteDto, TaskDeleteResponseDto, TaskListDto, TaskUpdateDto, UserTaskListDto } from './dto/tash.dto';
import { Common } from 'src/helpers/decorators/common.decorator';

@Controller('task')
@UseGuards(PermissionGuard)
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
   ) {}

   @SetMetadata('permission', TASK_CREATE_PERMISSION)
   @UseFilters(HttpExceptionFilter)
   @Post("/create-task")
    async createUser(
        @Request() request:any,
        @Body() params: TaskCreateDto,
    ): Promise<any> {
        let response = await this.taskService.createTask(request, params);
        return new TaskCreateResponseDto({
            status: "success",
            data: response,
        });
   }

   @SetMetadata('permission', TASK_LIST_PERMISSION)
   @UseFilters(HttpExceptionFilter)
   @Post("/task-list")
    async taskList(
        @Request() request:any,
        @Body() params: TaskListDto,
    ): Promise<any> {
        return await this.taskService.taskList(request, params);
   }

   @SetMetadata('permission', TASK_LIST_PERMISSION)
   @UseFilters(HttpExceptionFilter)
   @Post("/task-delete")
    async taskDelete(
        @Request() request:any,
        @Body() params: TaskDeleteDto,
    ): Promise<any> {
        let response = await this.taskService.taskDelete(request, params);
        return new TaskDeleteResponseDto({
            status: "success",
            data: response,
        });
   }

   @Common()
   @UseFilters(HttpExceptionFilter)
   @Post("/user-task-list")
    async userTaskList(
        @Request() request:any,
        @Body() params: UserTaskListDto,
    ): Promise<any> {
        return await this.taskService.userTaskList(request, params);
   }

   @Common()
   @UseFilters(HttpExceptionFilter)
   @Post("/user-update-task")
    async userUpdate(
        @Request() request:any,
        @Body() params: TaskUpdateDto,
    ): Promise<any> {
        return await this.taskService.updateTask(request, params);
   }
}



