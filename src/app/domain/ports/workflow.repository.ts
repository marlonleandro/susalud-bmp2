import { Observable } from 'rxjs';
import { ProcesoWorkflow, HistorialWorkflow } from '../models/workflow.model';

export abstract class WorkflowRepository {
  abstract obtenerProcesos(): Observable<ProcesoWorkflow[]>;
  abstract obtenerProcesoPorId(id: string): Observable<ProcesoWorkflow>;
  abstract obtenerHistorial(casoId: string): Observable<HistorialWorkflow[]>;
  abstract cambiarEstado(casoId: string, nuevoEstado: string, comentario?: string): Observable<void>;
}
