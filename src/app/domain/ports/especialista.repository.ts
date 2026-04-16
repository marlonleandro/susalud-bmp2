import { Observable } from 'rxjs';
import { Especialista } from '../models/especialista.model';

export abstract class EspecialistaRepository {
  abstract obtenerTodos(): Observable<Especialista[]>;
  abstract obtenerPorId(id: string): Observable<Especialista>;
  abstract obtenerActivos(): Observable<Especialista[]>;
  abstract crear(especialista: Especialista): Observable<Especialista>;
  abstract actualizar(id: string, especialista: Partial<Especialista>): Observable<Especialista>;
  abstract eliminar(id: string): Observable<void>;
  abstract buscarPorEspecialidad(especialidad: string): Observable<Especialista[]>;
}
