// permission.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject, HttpException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from 'src/modules/permission/permission.service';
import { AppQueryBuilder } from '../common/queryBuilder/appQueryBuilder';


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService, 
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const permission = this.reflector.get<string>(
      "permission",
      context.getHandler(),
    );

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    const isCommon = this.reflector.get<boolean>(
      'isCommon',
      context.getHandler(),
    );

    if(isPublic || isCommon) {
      return true
    }

    if(!permission || permission === undefined) {
      throw new UnauthorizedException("module permission not available");
    }

    const request = context.switchToHttp().getRequest();
    const splitPermission = permission.split("/");

    await this.permissionService.checkPermission(request?.user?.user?.userId, splitPermission[0], splitPermission[1]);
    
    return true;
  }
}
