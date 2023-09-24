import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
// import { RedisCacheModule } from './modules/redis-cache/redis-cache.module';
import { TrabajadorModule } from './modules/trabajador/trabajador.module';

@Module({
  imports: [AuthModule, TrabajadorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
