import { Controller, Inject, OnModuleInit, Get } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';
// import { TrabajadorService } from './trabajador.service';
import {
  LicenciasMedicasResponse,
  TRABAJADOR_SERVICE_NAME,
  TrabajadorResponse,
  TrabajadorServiceClient,
} from './trabajadores.pb';
import { isEqual } from 'lodash';
import { Observable, from, of, switchMap } from 'rxjs';

@Controller('trabajador')
export class TrabajadorController implements OnModuleInit {
  private svc: TrabajadorServiceClient;
  constructor(
    @Inject(TRABAJADOR_SERVICE_NAME)
    private readonly client: ClientGrpc,
    // @Inject(CACHE_MANAGER)
    // private readonly cacheManager: Cache,
  ) {}
  onModuleInit() {
    this.svc = this.client.getService<TrabajadorServiceClient>(
      TRABAJADOR_SERVICE_NAME,
    );
  }

  @Get('/')
  private async getTrabajadores(): Promise<Observable<TrabajadorResponse>> {
    return this.svc.getTrabajadores({});
  }
  @Get('/licencias-medicas')
  private async getLicenciasMedicas(): Promise<Observable<LicenciasMedicasResponse>> {
    return this.svc.getLicenciasMedicas({});
  }
}
