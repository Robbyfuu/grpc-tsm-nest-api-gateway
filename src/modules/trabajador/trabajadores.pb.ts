/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "trabajador";

export interface Trabajador {
  ficha: number;
  rut: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  nacionalidad: string;
  sexo: string;
  cargo: string;
  estado: boolean;
  fechaIngreso: string;
  gerencia: string;
  calificacionTrabajador: string;
  tipoContrato: string;
  createdAt: string;
  updatedAt: string;
  tipoEstructura: string;
  base: string;
  centroCosto: string;
  jefatura: string;
  vacacionesRestantes: number;
}

export interface TrabajadorRequest {
}

export interface TrabajadorResponse {
  ok: boolean;
  status: number;
  trabajadores: Trabajador[];
}

export interface TrabajadorByFichaRequest {
  ficha: number;
}

export interface TrabajadorByFichaResponse {
  ok: boolean;
  status: number;
  trabajador?: Trabajador | undefined;
  msg?: string | undefined;
}

export interface CreateTrabajadorRequest {
  ficha: number;
  rut: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  nacionalidad: string;
  estado?: boolean | undefined;
  sexo: string;
  cargo: string;
  fechaIngreso: string;
  gerencia: string;
  tipoContrato?: string | undefined;
  calificacionTrabajador?: string | undefined;
  tipoEstructura?: string | undefined;
  base?: string | undefined;
  centroCosto?: string | undefined;
  jefatura?: string | undefined;
}

export interface CreateTrabajadorResponse {
  ok: boolean;
  status: number;
  trabajador?: Trabajador | undefined;
  error?: string | undefined;
  msg?: string | undefined;
}

export interface UpdateTrabajadorRequest {
  ficha?: number | undefined;
  rut?: string | undefined;
  nombreCompleto?: string | undefined;
  fechaNacimiento?: string | undefined;
  nacionalidad?: string | undefined;
  estado?: boolean | undefined;
  sexo?: string | undefined;
  cargo?: string | undefined;
  fechaIngreso?: string | undefined;
  gerencia?: string | undefined;
  tipoContrato?: string | undefined;
  calificacionTrabajador?: string | undefined;
  tipoEstructura?: string | undefined;
  base?: string | undefined;
  centroCosto?: string | undefined;
  jefatura?: string | undefined;
  vacacionesRestantes?: number | undefined;
}

export interface UpdateTrabajadorResponse {
  ok: boolean;
  status: number;
  trabajador?: Trabajador | undefined;
  error?: string | undefined;
  msg?: string | undefined;
}

export interface DeleteTrabajadorRequest {
  ficha: number;
}

export interface DeleteTrabajadorResponse {
  ok: boolean;
  status: number;
  trabajador?: Trabajador | undefined;
  msg?: string | undefined;
}

export interface TrabajadorByNombreRequest {
}

export interface TrabajadorNombre {
  ficha: number;
  nombreCompleto: string;
}

export interface TrabajadorByNombreResponse {
  ok: boolean;
  status: number;
  trabajadores: TrabajadorNombre[];
}

export interface TrabajadorLicence {
  ficha: number;
  rut: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  nacionalidad: string;
  estado: boolean;
  sexo: string;
  cargo: string;
  fechaIngreso: string;
  gerencia: string;
  tipoContrato: string;
  calificacionTrabajador: string;
  tipoEstructura: string;
  base: string;
  centroCosto: string;
  jefatura: string;
  vacacionesRestantes: number;
  createdAt: string;
  updatedAt: string;
}

export interface LicenciaMedica {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  cantDias: number;
  ficha: number;
  fechaRecepcion: string;
  doctor: string;
  doctorEspecialidad: string;
  doctorRut: string;
  estadoLicencia: boolean;
  createdAt: string;
  updatedAt: string;
  trabajador: TrabajadorLicence | undefined;
}

export interface LicenciasMedicasResponse {
  ok: boolean;
  status: number;
  licenciasMedicas: LicenciaMedica[];
}

export const TRABAJADOR_PACKAGE_NAME = "trabajador";

export interface TrabajadorServiceClient {
  getTrabajadores(request: TrabajadorRequest): Observable<TrabajadorResponse>;

  getTabajadoresActivos(request: TrabajadorRequest): Observable<TrabajadorResponse>;

  getTabajadorByFicha(request: TrabajadorByFichaRequest): Observable<TrabajadorByFichaResponse>;

  createTrabajador(request: CreateTrabajadorRequest): Observable<CreateTrabajadorResponse>;

  updateTrabajador(request: UpdateTrabajadorRequest): Observable<UpdateTrabajadorResponse>;

  deleteTrabajador(request: DeleteTrabajadorRequest): Observable<DeleteTrabajadorResponse>;

  /**
   * rpc CreateTrabajadoresMasivo(CreateTrabajadoresMasivoRequest) returns (CreateTrabajadoresMasivoResponse);
   * rpc UpdateTrabajadoresMasivo(UpdateTrabajadoresMasivoRequest) returns (UpdateTrabajadoresMasivoResponse);
   */

  getTrabajadoresByNombre(request: TrabajadorByNombreRequest): Observable<TrabajadorByNombreResponse>;

  /** licencias medicas */

  getLicenciasMedicas(request: TrabajadorRequest): Observable<LicenciasMedicasResponse>;
}

export interface TrabajadorServiceController {
  getTrabajadores(
    request: TrabajadorRequest,
  ): Promise<TrabajadorResponse> | Observable<TrabajadorResponse> | TrabajadorResponse;

  getTabajadoresActivos(
    request: TrabajadorRequest,
  ): Promise<TrabajadorResponse> | Observable<TrabajadorResponse> | TrabajadorResponse;

  getTabajadorByFicha(
    request: TrabajadorByFichaRequest,
  ): Promise<TrabajadorByFichaResponse> | Observable<TrabajadorByFichaResponse> | TrabajadorByFichaResponse;

  createTrabajador(
    request: CreateTrabajadorRequest,
  ): Promise<CreateTrabajadorResponse> | Observable<CreateTrabajadorResponse> | CreateTrabajadorResponse;

  updateTrabajador(
    request: UpdateTrabajadorRequest,
  ): Promise<UpdateTrabajadorResponse> | Observable<UpdateTrabajadorResponse> | UpdateTrabajadorResponse;

  deleteTrabajador(
    request: DeleteTrabajadorRequest,
  ): Promise<DeleteTrabajadorResponse> | Observable<DeleteTrabajadorResponse> | DeleteTrabajadorResponse;

  /**
   * rpc CreateTrabajadoresMasivo(CreateTrabajadoresMasivoRequest) returns (CreateTrabajadoresMasivoResponse);
   * rpc UpdateTrabajadoresMasivo(UpdateTrabajadoresMasivoRequest) returns (UpdateTrabajadoresMasivoResponse);
   */

  getTrabajadoresByNombre(
    request: TrabajadorByNombreRequest,
  ): Promise<TrabajadorByNombreResponse> | Observable<TrabajadorByNombreResponse> | TrabajadorByNombreResponse;

  /** licencias medicas */

  getLicenciasMedicas(
    request: TrabajadorRequest,
  ): Promise<LicenciasMedicasResponse> | Observable<LicenciasMedicasResponse> | LicenciasMedicasResponse;
}

export function TrabajadorServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getTrabajadores",
      "getTabajadoresActivos",
      "getTabajadorByFicha",
      "createTrabajador",
      "updateTrabajador",
      "deleteTrabajador",
      "getTrabajadoresByNombre",
      "getLicenciasMedicas",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TrabajadorService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TrabajadorService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TRABAJADOR_SERVICE_NAME = "TrabajadorService";
