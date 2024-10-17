import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const authToken = req.headers['authorization'].split(' ')[1];

    if (authToken === 'super-secret-token-to-test') return true;
    else new UnauthorizedException();
  }
}
