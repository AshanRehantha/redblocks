import { Body, Controller, Post, Request, SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomerDto, EmailVerifyDto, GetCustomerDto, GetModulesDto, GetPermissionDto, ResetPasswordDto, UpdatePasswordFirstTimeDto, UserCreateDto } from './dto/user.dto';
import { Public } from 'src/helpers/decorators/public.decorator';
import { HttpExceptionFilter } from 'src/helpers/filters/http-exception.filter';
import { PermissionGuard } from 'src/helpers/guard/permission.guard';
import { Common } from 'src/helpers/decorators/common.decorator';
import { DASHBOARD_APM_HEADER_CARD_STATUS_VIEW, USER_CREATE_PERMISSION } from 'src/helpers/common/constants';

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



}