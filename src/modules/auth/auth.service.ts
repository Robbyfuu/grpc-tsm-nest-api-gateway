import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  ValidateTokenResponse,
} from './auth.pb';

@Injectable()
export class AuthService {
  private svc: AuthServiceClient;
  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async validateToken(token: string): Promise<ValidateTokenResponse> {
    return firstValueFrom(this.svc.validateToken({ token }));
  }
}
