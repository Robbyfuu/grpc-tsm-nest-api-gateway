import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  TrabajadorServiceClient,
  TRABAJADOR_SERVICE_NAME,
} from './trabajadores.pb';

@Injectable()
export class TrabajadorService {
  private svc: TrabajadorServiceClient;
  constructor(
    @Inject(TRABAJADOR_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}
  public onModuleInit(): void {
    this.svc = this.client.getService<TrabajadorServiceClient>(
      TRABAJADOR_SERVICE_NAME,
    );
  }
}
