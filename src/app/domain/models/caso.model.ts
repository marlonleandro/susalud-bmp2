export enum TipoSolicitud {
  CONSULTA = 'CONSULTA',
  DENUNCIA = 'DENUNCIA'
}

export enum Severidad {
  LEVE = 'LEVE',
  MODERADO = 'MODERADO',
  SEVERO = 'SEVERO'
}

export enum EstadoCaso {
  REGISTRADO = 'REGISTRADO',
  EN_PROCESO = 'EN_PROCESO',
  PENDIENTE_INFORME = 'PENDIENTE_INFORME',
  RESUELTO = 'RESUELTO',
  CERRADO = 'CERRADO'
}

export interface Solicitante {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: Date;
  genero: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  telefono: string;
  correoElectronico: string;
}

export interface Afectado {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  edad: number;
  genero: string;
}

export interface Caso {
  id: string;
  numeroExpediente: string;
  fechaRegistro: Date;
  fechaRecepcion: Date;
  canalIngreso: string;
  areaActual: string;
  tipoSolicitud: TipoSolicitud;
  tipoDenuncia?: string;
  competenciaSUSALUD: boolean;
  competenciaPROTT: boolean;
  huboSolicitud: boolean;
  severidad: Severidad;
  estado: EstadoCaso;
  solicitante: Solicitante;
  afectado?: Afectado;
  descripcion: string;
  macroRegion: string;
  idSGD?: string;
  diasTranscurridos: number;
  diasRestantes: number;
  alertaVencimiento: boolean;
}
