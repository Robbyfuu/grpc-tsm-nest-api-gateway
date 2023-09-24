import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class User {
  id: number;
  nombre: string;
  email: string;
  estado: boolean;
  password: string;
  role: 'ADMIN_ROLE' | 'USER_ROLE';
  refreshTokens: RefreshToken[];
  createdAt: Date;
  updatedAt: Date;
}

export class RefreshToken {
  // Define las propiedades de la clase RefreshToken aquí
}
export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  User
>((_, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
