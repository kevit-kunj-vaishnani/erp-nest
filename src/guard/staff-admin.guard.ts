/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class StaffAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    
    const request = context.switchToHttp().getRequest();

    console.log(request.session.role);

    if (request.session.role === 'STUDENT') {
    return false;
    }
    
    return true;
  }
}
