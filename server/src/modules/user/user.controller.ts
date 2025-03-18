import { Body, Controller, Post, Request, SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { DeleteEmployeesDto, GetModulesDto, GetUserDto, UserCreateDto } from './dto/user.dto';
import { HttpExceptionFilter } from 'src/helpers/filters/http-exception.filter';
import { PermissionGuard } from 'src/helpers/guard/permission.guard';
import { Common } from 'src/helpers/decorators/common.decorator';
import { USER_CREATE_PERMISSION, USER_DELETE_PERMISSION, USER_GET_LIST_PERMISSION } from 'src/helpers/common/constants';

@Controller('users')
@UseGuards(PermissionGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
   ) {}

   @Common()
   @UseFilters(HttpExceptionFilter)
   @Post("/get-modules")
    async getModules(
        @Request() request:any,
        @Body() params: GetModulesDto,
    ): Promise<any> {
        return await this.userService.getModules(request, params);
   }

   @SetMetadata('permission', USER_CREATE_PERMISSION)
   @UseFilters(HttpExceptionFilter)
   @Post("/user-create")
    async createUser(
        @Request() request:any,
        @Body() params: UserCreateDto,
    ): Promise<any> {
        return await this.userService.createUser(request, params);
   }

   @SetMetadata('permission', USER_GET_LIST_PERMISSION)
   @UseFilters(HttpExceptionFilter)
   @Post("/get-user-list")
    async getUserList(
        @Request() request:any,
        @Body() params: GetUserDto,
    ): Promise<any> {
        return await this.userService.getUserList(request, params);
   }

   @SetMetadata('permission', USER_DELETE_PERMISSION)
   @UseFilters(HttpExceptionFilter)
   @Post("/delete-user")
    async deleteUsers(
        @Request() request:any,
        @Body() params: DeleteEmployeesDto,
    ): Promise<any> {
        return await this.userService.deleteUsers(request, params);
   }

   @Common()
   @UseFilters(HttpExceptionFilter)
   @Post("/get-user-details")
    async getUserDetails(
        @Request() request:any,
        @Body() params: any,
    ): Promise<any> {
        return await this.userService.getUserDetails(request, params);
   }



}