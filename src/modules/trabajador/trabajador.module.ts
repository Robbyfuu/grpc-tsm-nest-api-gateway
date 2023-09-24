import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TrabajadorService } from './trabajador.service';
import {
  TRABAJADOR_PACKAGE_NAME,
  TRABAJADOR_SERVICE_NAME,
} from './trabajadores.pb';
import { TrabajadorController } from './trabajador.controller';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRABAJADOR_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.GRPC_SERVER_HOST_TRABAJADOR}:50052`,
          package: TRABAJADOR_PACKAGE_NAME,
          protoPath:
            'node_modules/grpc-tsm-nestjs-proto/proto/trabajadores.proto',
        },
      },
    ]),
  ],
  controllers: [TrabajadorController],
  providers: [TrabajadorService],
})
export class TrabajadorModule {}
