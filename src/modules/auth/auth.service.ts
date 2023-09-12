import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';
import { AuthServiceClient, AUTH_SERVICE_NAME } from './auth.pb';

@Injectable()
export class AuthService {
  constructor(
    private readonly client: ClientGrpc,
    @Inject(AUTH_SERVICE_NAME)
    private svc: AuthServiceClient,
  ) {}

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
}
