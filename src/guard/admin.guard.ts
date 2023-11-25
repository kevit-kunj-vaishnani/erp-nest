/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    
    const request = context.switchToHttp().getRequest();
    
    if (request.session.role !== 'ADMIN') {
      return false;
    }

    return true;
  }
}
