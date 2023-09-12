import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface User {
  id: number;
  nombre: string;
  email: string;
  estado: boolean;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  usuario?: User | undefined;
  error?: string;
  ok: boolean;
  status: number;
  token?: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  usuario?: User | undefined;
  error?: string;
  ok: boolean;
  status: number;
  token?: string;
  refreshToken?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  usuario?: User | undefined;
  error?: string;
  ok: boolean;
  status: number;
  token?: string;
  refreshToken?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  usuario?: User | undefined;
  error?: string;
  ok: boolean;
  status: number;
}

export interface ResetPasswordRequest {
  password: string;
  token: string;
}

export interface ResetPasswordResponse {
  usuario?: User | undefined;
  error?: string;
  ok: boolean;
  status: number;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;
  login(request: LoginRequest): Observable<LoginResponse>;
  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse>;
  forgotPassword(
    request: ForgotPasswordRequest,
  ): Observable<ForgotPasswordResponse>;
  resetPassword(
    request: ResetPasswordRequest,
  ): Observable<ResetPasswordResponse>;
}

export interface AuthServiceController {
  register(
    request: RegisterRequest,
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;
  login(
    request: LoginRequest,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;
  refreshToken(
    request: RefreshTokenRequest,
  ):
    | Promise<RefreshTokenResponse>
    | Observable<RefreshTokenResponse>
    | RefreshTokenResponse;
  forgotPassword(
    request: ForgotPasswordRequest,
  ):
    | Promise<ForgotPasswordResponse>
    | Observable<ForgotPasswordResponse>
    | ForgotPasswordResponse;
  resetPassword(
    request: ResetPasswordRequest,
  ):
    | Promise<ResetPasswordResponse>
    | Observable<ResetPasswordResponse>
    | ResetPasswordResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'login', 'validate'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
