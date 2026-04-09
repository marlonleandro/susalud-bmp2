export interface Departamento {
  codigo: string;
  nombre: string;
}

export interface Provincia {
  codigo: string;
  nombre: string;
  codigoDepartamento: string;
}

export interface Distrito {
  codigo: string;
  nombre: string;
  codigoProvincia: string;
  codigoDepartamento: string;
  codigoUbigeo: string;
}

export interface UbigeoData {
  nombreDepartamento: string;
  nombreProvincia: string;
  nombreDistrito: string;
  codigoUbigeo: string;
  codigoDepartamento: string;
  codigoProvincia: string;
  codigoDistrito: string;
}
