import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from './auth.pb';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;
  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly cliente: ClientGrpc,
  ) {}
  public onModuleInit() {
    this.svc = this.cliente.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }

  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    console.log({ body });
    return this.svc.login(body);
  }

  @Post('refresh-token')
  private async refreshToken(
    @Body() body: RefreshTokenRequest,
  ): Promise<Observable<RefreshTokenResponse>> {
    return this.svc.refreshToken(body);
  }

  @Post('forgot-password')
  private async forgotPassword(
    @Body() body: ForgotPasswordRequest,
  ): Promise<Observable<ForgotPasswordResponse>> {
    return this.svc.forgotPassword(body);
  }

  @Patch('reset-password')
  private async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetPasswordRequest,
  ): Promise<Observable<ResetPasswordResponse>> {
    return this.svc.resetPassword({ token, ...body });
  }
}
