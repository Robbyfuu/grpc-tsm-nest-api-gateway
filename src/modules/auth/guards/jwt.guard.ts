import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { ValidateTokenResponse } from '../auth.pb';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = request.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    const bearer: string[] = token.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const jwtoken: string = bearer[1];

    const { status, userId }: ValidateTokenResponse =
      await this.authService.validateToken(jwtoken);

    request.user = userId;

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
