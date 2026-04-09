import { Observable } from 'rxjs';
import { Ipress } from '../models/ipress.model';

export abstract class IpressRepository {
  abstract obtenerPorUbigeo(ubigeo: string): Observable<Ipress[]>;
  abstract buscarPorNombre(nombre: string, ubigeo?: string): Observable<Ipress[]>;
  abstract obtenerTodos(): Observable<Ipress[]>;
}
