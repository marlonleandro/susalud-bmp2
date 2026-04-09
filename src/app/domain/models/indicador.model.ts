export interface Indicador {
  id: string;
  nombre: string;
  valor: number;
  meta: number;
  unidad: string;
  tendencia: 'up' | 'down' | 'stable';
  porcentajeCumplimiento: number;
}

export interface EstadisticaCaso {
  total: number;
  porEstado: { [key: string]: number };
  porSeveridad: { [key: string]: number };
  porTipo: { [key: string]: number };
  tiempoPromedioResolucion: number;
}

export interface DatoGeografico {
  departamento: string;
  cantidad: number;
  coordenadas: { lat: number; lng: number };
}
