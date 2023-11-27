/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class StudentGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    
    const request = context.switchToHttp().getRequest();
    
    if (request.session.role === 'STUDENT') {
      return true;
    }

    return false;
  }
}
