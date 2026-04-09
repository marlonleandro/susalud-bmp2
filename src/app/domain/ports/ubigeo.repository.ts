import { Observable } from 'rxjs';
import { Departamento, Provincia, Distrito } from '../models/ubigeo.model';

export abstract class UbigeoRepository {
  abstract obtenerDepartamentos(): Observable<Departamento[]>;
  abstract obtenerProvinciasPorDepartamento(codigoDepartamento: string): Observable<Provincia[]>;
  abstract obtenerDistritosPorProvincia(codigoDepartamento: string, codigoProvincia: string): Observable<Distrito[]>;
}
