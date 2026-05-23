export interface Especialista {
  id: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  especialidad: string;
  fechaIngreso: Date;
  activo: boolean;
  correoElectronico?: string;
  telefono?: string;
  casosAsignados?: number;
}

export enum Especialidad {
  MEDICINA_GENERAL = 'Medicina General',
  CARDIOLOGIA = 'Cardiología',
  PEDIATRIA = 'Pediatría',
  GINECOLOGIA = 'Ginecología',
  TRAUMATOLOGIA = 'Traumatología',
  NEUROLOGIA = 'Neurología',
  DERMATOLOGIA = 'Dermatología',
  OFTALMOLOGIA = 'Oftalmología',
  PSIQUIATRIA = 'Psiquiatría',
  ONCOLOGIA = 'Oncología',
  CIRUGIA_GENERAL = 'Cirugía General',
  MEDICINA_INTERNA = 'Medicina Interna'
}
