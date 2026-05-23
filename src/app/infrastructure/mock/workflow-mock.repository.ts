import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { WorkflowRepository } from '@domain/ports/workflow.repository';
import { ProcesoWorkflow, HistorialWorkflow } from '@domain/models/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowMockRepository extends WorkflowRepository {
  private procesos: ProcesoWorkflow[] = [
    {
      id: '1',
      codigo: 'M2.P03',
      nombre: 'Proceso de Consultas',
      descripcion: 'Gestión de consultas ciudadanas',
      slaMaximoDias: 25,
      alertaDias: 20,
      activo: true,
      estados: [
        { id: '1', nombre: 'Ingresado', descripcion: 'Caso Ingresado', orden: 1, esInicial: true, esFinal: false, color: '#3b82f6' },
        { id: '2', nombre: 'En Proceso', descripcion: 'En análisis', orden: 2, esInicial: false, esFinal: false, color: '#f59e0b' },
        { id: '3', nombre: 'Resuelto', descripcion: 'Caso resuelto', orden: 3, esInicial: false, esFinal: true, color: '#10b981' }
      ],
      transiciones: [
        { id: '1', estadoOrigen: '1', estadoDestino: '2', accion: 'Iniciar análisis', rolesPermitidos: ['ANALISTA'] },
        { id: '2', estadoOrigen: '2', estadoDestino: '3', accion: 'Resolver', rolesPermitidos: ['ANALISTA', 'SUPERVISOR'] }
      ]
    },
    {
      id: '2',
      codigo: 'M2.P06',
      nombre: 'Proceso de Denuncias',
      descripcion: 'Gestión de denuncias ciudadanas',
      slaMaximoDias: 25,
      alertaDias: 20,
      activo: true,
      estados: [
        { id: '1', nombre: 'Ingresado', descripcion: 'Denuncia ingresada', orden: 1, esInicial: true, esFinal: false, color: '#3b82f6' },
        { id: '2', nombre: 'En Proceso', descripcion: 'En investigación', orden: 2, esInicial: false, esFinal: false, color: '#f59e0b' },
        { id: '3', nombre: 'Pendiente Informe', descripcion: 'Esperando informe', orden: 3, esInicial: false, esFinal: false, color: '#8b5cf6' },
        { id: '4', nombre: 'Resuelto', descripcion: 'Denuncia resuelta', orden: 4, esInicial: false, esFinal: false, color: '#10b981' },
        { id: '5', nombre: 'Cerrado', descripcion: 'Caso cerrado', orden: 5, esInicial: false, esFinal: true, color: '#6b7280' }
      ],
      transiciones: [
        { id: '1', estadoOrigen: '1', estadoDestino: '2', accion: 'Iniciar investigación', rolesPermitidos: ['INVESTIGADOR'] },
        { id: '2', estadoOrigen: '2', estadoDestino: '3', accion: 'Solicitar informe', rolesPermitidos: ['INVESTIGADOR'] },
        { id: '3', estadoOrigen: '3', estadoDestino: '4', accion: 'Aprobar informe', rolesPermitidos: ['SUPERVISOR'] },
        { id: '4', estadoOrigen: '4', estadoDestino: '5', accion: 'Cerrar caso', rolesPermitidos: ['SUPERVISOR'] }
      ]
    }
  ];

  private historial: HistorialWorkflow[] = [
    {
      id: '1',
      casoId: '1',
      estadoAnterior: 'INGRESADO',
      estadoNuevo: 'EN_PROCESO',
      usuario: 'Marlon Leandro',
      fecha: new Date('2026-04-04'),
      comentario: 'Iniciando análisis del caso',
      tiempoEnEstado: 1
    }
  ];

  obtenerProcesos(): Observable<ProcesoWorkflow[]> {
    return of(this.procesos).pipe(delay(300));
  }

  obtenerProcesoPorId(id: string): Observable<ProcesoWorkflow> {
    const proceso = this.procesos.find(p => p.id === id);
    return of(proceso!).pipe(delay(200));
  }

  obtenerHistorial(casoId: string): Observable<HistorialWorkflow[]> {
    const hist = this.historial.filter(h => h.casoId === casoId);
    return of(hist).pipe(delay(300));
  }

  cambiarEstado(casoId: string, nuevoEstado: string, comentario?: string): Observable<void> {
    const nuevoHistorial: HistorialWorkflow = {
      id: (this.historial.length + 1).toString(),
      casoId,
      estadoAnterior: 'EN_PROCESO',
      estadoNuevo: nuevoEstado,
      usuario: 'Usuario Actual',
      fecha: new Date(),
      comentario,
      tiempoEnEstado: 0
    };
    this.historial.push(nuevoHistorial);
    return of(void 0).pipe(delay(400));
  }
}
