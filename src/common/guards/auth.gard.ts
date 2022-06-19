import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { verifyToken } from '../utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const { userId }: any = await verifyToken(token);
    if (userId !== +request.params.userId) {
      return false;
    }
    return true;
  }
}
