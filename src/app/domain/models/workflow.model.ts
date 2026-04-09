export interface EstadoWorkflow {
  id: string;
  nombre: string;
  descripcion: string;
  orden: number;
  esInicial: boolean;
  esFinal: boolean;
  color: string;
}

export interface TransicionWorkflow {
  id: string;
  estadoOrigen: string;
  estadoDestino: string;
  accion: string;
  condiciones?: string[];
  rolesPermitidos: string[];
}

export interface ProcesoWorkflow {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  estados: EstadoWorkflow[];
  transiciones: TransicionWorkflow[];
  slaMaximoDias: number;
  alertaDias: number;
  activo: boolean;
}

export interface HistorialWorkflow {
  id: string;
  casoId: string;
  estadoAnterior: string;
  estadoNuevo: string;
  usuario: string;
  fecha: Date;
  comentario?: string;
  tiempoEnEstado: number;
}
