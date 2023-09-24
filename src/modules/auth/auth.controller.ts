import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

import { JwtGuard } from './guards/jwt.guard';
import { CurrentUser, User } from './decorators/current-user.decorator';
import { Timestamp } from './google/protobuf/timestamp.pb';

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
  private register(
    @Body() body: RegisterRequest,
  ): Observable<RegisterResponse> {
    return this.svc.register(body);
    // .pipe(
    //   map((newUser) => {
    //     const createdAtTimestamp = new Date(
    //       newUser.usuario.createdAt.seconds * 1000 +
    //       newUser.usuario.createdAt.nanos / 1e6,
    //     );

    //     // Ajusta la fecha a UTC-3
    //     createdAtTimestamp.setUTCHours(createdAtTimestamp.getUTCHours() - 3);

    //     const updatedAtTimestamp = new Date(
    //       newUser.usuario.updatedAt.seconds * 1000 +
    //       newUser.usuario.updatedAt.nanos / 1e6,
    //     );

    //     // Ajusta la fecha a UTC-3
    //     updatedAtTimestamp.setUTCHours(updatedAtTimestamp.getUTCHours() - 3);

    //     newUser.usuario.createdAt = createdAtTimestamp as unknown as Timestamp; // Actualiza el campo createdAt
    //     newUser.usuario.updatedAt = updatedAtTimestamp as unknown as Timestamp; // Actualiza el campo updatedAt
    //     return newUser;
    //   }),
    // );
  }

  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    console.log({ body });
    console.log('login');
    return this.svc.login(body).pipe(
      map((newUser) => {
        const createdAtTimestamp = new Date(
          newUser.usuario.createdAt.seconds * 1000 +
            newUser.usuario.createdAt.nanos / 1e6,
        );
        // Ajusta la fecha a UTC-3
        createdAtTimestamp.setUTCHours(createdAtTimestamp.getUTCHours() - 3);

        const updatedAtTimestamp = new Date(
          newUser.usuario.updatedAt.seconds * 1000 +
            newUser.usuario.updatedAt.nanos / 1e6,
        );

        // Ajusta la fecha a UTC-3
        updatedAtTimestamp.setUTCHours(updatedAtTimestamp.getUTCHours() - 3);

        newUser.usuario.createdAt = createdAtTimestamp as unknown as Timestamp; // Actualiza el campo createdAt
        newUser.usuario.updatedAt = updatedAtTimestamp as unknown as Timestamp; // Actualiza el campo updatedAt
        return newUser;
      }),
    );
  }
  // @Post('login')
  // private async login(
  //   @Body() body: LoginRequest,
  // ): Promise<Observable<LoginResponse>> {
  //   const cacheLogin: Observable<LoginResponse> = of(
  //     await this.cacheManager.get(`user_${body.email}`),
  //   );
  //   const loginObservable = this.svc.login(body);

  //   return cacheLogin.pipe(
  //     switchMap((cachedData) => {
  //       return loginObservable.pipe(
  //         switchMap((newData) => {
  //           if (isEqual(cachedData, newData)) {
  //             // Los datos son iguales, devuelve los datos en caché
  //             return of(cachedData);
  //           } else {
  //             // Los datos son diferentes, actualiza la caché y devuelve los nuevos datos
  //             return from(
  //               this.cacheManager.set(`user_${body.email}`, newData),
  //             ).pipe(
  //               switchMap(() => {
  //                 return of(newData);
  //               }),
  //             );
  //           }
  //         }),
  //       );
  //     }),
  //   );
  // }

  @Post('refresh-token')
  private async refreshToken(
    @Body() body: RefreshTokenRequest,
  ): Promise<Observable<RefreshTokenResponse>> {
    return this.svc.refreshToken(body).pipe(
      map((newUser) => {
        const createdAtTimestamp = new Date(
          newUser.usuario.createdAt.seconds * 1000 +
            newUser.usuario.createdAt.nanos / 1e6,
        );

        // Ajusta la fecha a UTC-3
        createdAtTimestamp.setUTCHours(createdAtTimestamp.getUTCHours() - 3);

        const updatedAtTimestamp = new Date(
          newUser.usuario.updatedAt.seconds * 1000 +
            newUser.usuario.updatedAt.nanos / 1e6,
        );

        // Ajusta la fecha a UTC-3
        updatedAtTimestamp.setUTCHours(updatedAtTimestamp.getUTCHours() - 3);

        newUser.usuario.createdAt = createdAtTimestamp as unknown as Timestamp; // Actualiza el campo createdAt
        newUser.usuario.updatedAt = updatedAtTimestamp as unknown as Timestamp; // Actualiza el campo updatedAt
        return newUser;
      }),
    );
  }

  @Post('forgot-password')
  private async forgotPassword(
    @Body() body: ForgotPasswordRequest,
  ): Promise<Observable<ForgotPasswordResponse>> {
    return this.svc.forgotPassword(body).pipe(
      map((newUser) => {
        const createdAtTimestamp = new Date(
          newUser.usuario.createdAt.seconds * 1000 +
            newUser.usuario.createdAt.nanos / 1e6,
        );

        // Ajusta la fecha a UTC-3
        createdAtTimestamp.setUTCHours(createdAtTimestamp.getUTCHours() - 3);

        const updatedAtTimestamp = new Date(
          newUser.usuario.updatedAt.seconds * 1000 +
            newUser.usuario.updatedAt.nanos / 1e6,
        );

        // Ajusta la fecha a UTC-3
        updatedAtTimestamp.setUTCHours(updatedAtTimestamp.getUTCHours() - 3);

        newUser.usuario.createdAt = createdAtTimestamp as unknown as Timestamp; // Actualiza el campo createdAt
        newUser.usuario.updatedAt = updatedAtTimestamp as unknown as Timestamp; // Actualiza el campo updatedAt
        return newUser;
      }),
    );
  }

  @Patch('reset-password/:token')
  private async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetPasswordRequest,
  ): Promise<Observable<ResetPasswordResponse>> {
    return this.svc.resetPassword({ token, ...body }).pipe(
      map((newUser) => {
        const createdAtTimestamp = new Date(
          newUser.usuario.createdAt.seconds * 1000 +
            newUser.usuario.createdAt.nanos / 1e6,
        );

        // Ajusta la fecha a UTC-3
        createdAtTimestamp.setUTCHours(createdAtTimestamp.getUTCHours() - 3);

        const updatedAtTimestamp = new Date(
          newUser.usuario.updatedAt.seconds * 1000 +
            newUser.usuario.updatedAt.nanos / 1e6,
        );

        // Ajusta la fecha a UTC-3
        updatedAtTimestamp.setUTCHours(updatedAtTimestamp.getUTCHours() - 3);

        newUser.usuario.createdAt = createdAtTimestamp as unknown as Timestamp; // Actualiza el campo createdAt
        newUser.usuario.updatedAt = updatedAtTimestamp as unknown as Timestamp; // Actualiza el campo updatedAt
        return newUser;
      }),
    );
  }
  @UseGuards(JwtGuard)
  @Get('/me')
  async me(@CurrentUser() user: User) {
    return user;
  }
}
