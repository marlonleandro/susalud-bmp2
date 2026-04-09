import { Observable } from 'rxjs';
import { Caso } from '../models/caso.model';

export abstract class CasoRepository {
  abstract obtenerTodos(): Observable<Caso[]>;
  abstract obtenerPorId(id: string): Observable<Caso>;
  abstract crear(caso: Caso): Observable<Caso>;
  abstract actualizar(id: string, caso: Partial<Caso>): Observable<Caso>;
  abstract eliminar(id: string): Observable<void>;
  abstract buscar(filtros: any): Observable<Caso[]>;
}
