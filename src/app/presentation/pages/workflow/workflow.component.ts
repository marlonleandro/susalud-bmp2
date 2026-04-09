import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowRepository } from '@domain/ports/workflow.repository';
import { ProcesoWorkflow } from '@domain/models/workflow.model';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="workflow">
      <h2>Configuración de Workflow</h2>
      
      <div class="procesos-grid">
        <div class="proceso-card" *ngFor="let proceso of procesos">
          <div class="proceso-header">
            <div>
              <h3>{{proceso.nombre}}</h3>
              <span class="proceso-codigo">{{proceso.codigo}}</span>
            </div>
            <span class="badge" [class.activo]="proceso.activo">
              {{proceso.activo ? 'Activo' : 'Inactivo'}}
            </span>
          </div>
          
          <p class="proceso-descripcion">{{proceso.descripcion}}</p>
          
          <div class="proceso-sla">
            <div class="sla-item">
              <span class="sla-label">SLA Máximo</span>
              <span class="sla-value">{{proceso.slaMaximoDias}} días</span>
            </div>
            <div class="sla-item">
              <span class="sla-label">Alerta</span>
              <span class="sla-value">{{proceso.alertaDias}} días</span>
            </div>
          </div>

          <div class="estados-flow">
            <h4>Flujo de Estados</h4>
            <div class="flow-diagram">
              <div class="flow-item" *ngFor="let estado of proceso.estados; let i = index">
                <div class="estado-node" [style.background]="estado.color">
                  <span>{{estado.nombre}}</span>
                </div>
                <div class="flow-arrow" *ngIf="i < proceso.estados.length - 1">→</div>
              </div>
            </div>
          </div>

          <div class="proceso-actions">
            <button class="btn-action">Editar</button>
            <button class="btn-action secondary">Ver Transiciones</button>
          </div>
        </div>
      </div>

      <div class="reglas-section">
        <h3>Reglas de Negocio</h3>
        <div class="reglas-list">
          <div class="regla-item">
            <div class="regla-icon">📋</div>
            <div class="regla-content">
              <h4>Validación de Competencia</h4>
              <p>Verificar automáticamente si el caso es competencia de SUSALUD o PROTT</p>
            </div>
            <span class="regla-status activo">Activa</span>
          </div>
          
          <div class="regla-item">
            <div class="regla-icon">⏰</div>
            <div class="regla-content">
              <h4>Escalamiento Automático</h4>
              <p>Escalar casos cuando se alcance el 80% del SLA</p>
            </div>
            <span class="regla-status activo">Activa</span>
          </div>
          
          <div class="regla-item">
            <div class="regla-icon">🔔</div>
            <div class="regla-content">
              <h4>Notificaciones por Vencimiento</h4>
              <p>Enviar alertas 5 días antes del vencimiento del plazo</p>
            </div>
            <span class="regla-status activo">Activa</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .workflow {
      max-width: 1400px;
      margin: 0 auto;
    }

    h2 {
      font-size: 28px;
      color: #1e293b;
      margin-bottom: 30px;
    }

    .procesos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .proceso-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .proceso-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .proceso-header h3 {
      font-size: 20px;
      color: #1e293b;
      margin: 0 0 4px 0;
    }

    .proceso-codigo {
      font-size: 13px;
      color: #64748b;
      font-weight: 500;
    }

    .badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      background: #f1f5f9;
      color: #64748b;
    }

    .badge.activo {
      background: #dcfce7;
      color: #16a34a;
    }

    .proceso-descripcion {
      color: #64748b;
      font-size: 14px;
      margin: 0 0 20px 0;
    }

    .proceso-sla {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .sla-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sla-label {
      font-size: 12px;
      color: #64748b;
    }

    .sla-value {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
    }

    .estados-flow {
      margin-bottom: 20px;
    }

    .estados-flow h4 {
      font-size: 14px;
      color: #64748b;
      margin: 0 0 12px 0;
    }

    .flow-diagram {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
      padding: 12px 0;
    }

    .flow-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .estado-node {
      padding: 8px 16px;
      border-radius: 8px;
      color: white;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
    }

    .flow-arrow {
      font-size: 20px;
      color: #cbd5e1;
    }

    .proceso-actions {
      display: flex;
      gap: 8px;
    }

    .btn-action {
      flex: 1;
      padding: 10px;
      background: #3b82f6;
      color: white;
      border-radius: 8px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .btn-action:hover {
      background: #1e40af;
    }

    .btn-action.secondary {
      background: #f1f5f9;
      color: #64748b;
    }

    .btn-action.secondary:hover {
      background: #e2e8f0;
    }

    .reglas-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .reglas-section h3 {
      font-size: 20px;
      color: #1e293b;
      margin: 0 0 20px 0;
    }

    .reglas-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .regla-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      transition: all 0.2s;
    }

    .regla-item:hover {
      border-color: #cbd5e1;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .regla-icon {
      font-size: 32px;
    }

    .regla-content {
      flex: 1;
    }

    .regla-content h4 {
      font-size: 16px;
      color: #1e293b;
      margin: 0 0 4px 0;
    }

    .regla-content p {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }

    .regla-status {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
    }

    .regla-status.activo {
      background: #dcfce7;
      color: #16a34a;
    }

    @media (max-width: 768px) {
      .procesos-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WorkflowComponent implements OnInit {
  procesos: ProcesoWorkflow[] = [];

  constructor(private workflowRepository: WorkflowRepository) {}

  ngOnInit() {
    this.workflowRepository.obtenerProcesos().subscribe(procesos => {
      this.procesos = procesos;
    });
  }
}
