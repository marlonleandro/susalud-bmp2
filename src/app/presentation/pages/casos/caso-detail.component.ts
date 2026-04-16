import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CasoRepository } from '@domain/ports/caso.repository';
import { WorkflowRepository } from '@domain/ports/workflow.repository';
import { Caso } from '@domain/models/caso.model';
import { HistorialWorkflow } from '@domain/models/workflow.model';

@Component({
  selector: 'app-caso-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="caso-detail" *ngIf="caso">
      <div class="header">
        <div>
          <a routerLink="/casos" class="back-link">← Volver a casos</a>
          <h2>Caso {{caso.numeroExpediente}}</h2>
        </div>
        <span class="estado-badge" [class]="getEstadoClase(caso.estado)">
          {{formatEstado(caso.estado)}}
        </span>
      </div>

      <div class="content-grid">
        <div class="main-content">
          <div class="info-card">
            <h3>Información General</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Tipo de Solicitud</label>
                <span class="tipo-badge" [class]="caso.tipoSolicitud.toLowerCase()">
                  {{caso.tipoSolicitud}}
                </span>
              </div>
              <div class="info-item">
                <label>Severidad</label>
                <span class="severidad-badge" [class]="caso.severidad.toLowerCase()">
                  {{caso.severidad}}
                </span>
              </div>
              <div class="info-item">
                <label>Fecha de Registro</label>
                <span>{{caso.fechaRegistro | date:'dd/MM/yyyy HH:mm'}}</span>
              </div>
              <div class="info-item">
                <label>Canal de Ingreso</label>
                <span>{{caso.canalIngreso}}</span>
              </div>
              <div class="info-item">
                <label>Área Actual</label>
                <span>{{caso.areaActual}}</span>
              </div>
              <div class="info-item">
                <label>Macro Región</label>
                <span>{{caso.macroRegion}}</span>
              </div>
            </div>
          </div>

          <div class="info-card" *ngIf="caso.especialistaAsignado">
            <h3>Especialista Asignado</h3>
            <div class="especialista-info">
              <div class="especialista-avatar">
                👨‍⚕️
              </div>
              <div class="especialista-datos">
                <div class="especialista-nombre">
                  {{caso.especialistaAsignado.nombres}} {{caso.especialistaAsignado.apellidoPaterno}} {{caso.especialistaAsignado.apellidoMaterno}}
                </div>
                <div class="especialista-especialidad">
                  {{caso.especialistaAsignado.especialidad}}
                </div>
                <a [routerLink]="['/especialistas', caso.especialistaAsignado.id]" class="ver-perfil">
                  Ver perfil completo →
                </a>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3>Descripción del Caso</h3>
            <p>{{caso.descripcion}}</p>
          </div>

          <div class="info-card">
            <h3>Datos del Solicitante</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Documento</label>
                <span>{{caso.solicitante.tipoDocumento}}: {{caso.solicitante.numeroDocumento}}</span>
              </div>
              <div class="info-item">
                <label>Nombres Completos</label>
                <span>{{caso.solicitante.nombres}} {{caso.solicitante.apellidoPaterno}} {{caso.solicitante.apellidoMaterno}}</span>
              </div>
              <div class="info-item">
                <label>Correo Electrónico</label>
                <span>{{caso.solicitante.correoElectronico}}</span>
              </div>
              <div class="info-item">
                <label>Teléfono</label>
                <span>{{caso.solicitante.telefono || 'No registrado'}}</span>
              </div>
              <div class="info-item">
                <label>Dirección</label>
                <span>{{caso.solicitante.direccion}}</span>
              </div>
              <div class="info-item">
                <label>Ubicación</label>
                <span>{{caso.solicitante.distrito}}, {{caso.solicitante.provincia}}, {{caso.solicitante.departamento}}</span>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3>Datos del Afectado</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Documento</label>
                <span>{{caso.afectado.tipoDocumento}}: {{caso.afectado.numeroDocumento}}</span>
              </div>
              <div class="info-item">
                <label>Nombres Completos</label>
                <span>{{caso.afectado.nombres}} {{caso.afectado.apellidoPaterno}} {{caso.afectado.apellidoMaterno}}</span>
              </div>
              <div class="info-item">
                <label>Fecha de Nacimiento</label>
                <span>{{caso.afectado.fechaNacimiento | date:'dd/MM/yyyy'}}</span>
              </div>
              <div class="info-item">
                <label>Género</label>
                <span>{{caso.afectado.genero}}</span>
              </div>
              <div class="info-item">
                <label>Historia Clínica</label>
                <span>{{caso.afectado.numeroHistoriaClinica || 'No registrado'}}</span>
              </div>
              <div class="info-item">
                <label>Tipo de Seguro</label>
                <span class="seguro-badge" [class]="caso.afectado.tipoSeguro.toLowerCase()">
                  {{caso.afectado.tipoSeguro}}
                </span>
              </div>
              <div class="info-item">
                <label>Correo Electrónico</label>
                <span>{{caso.afectado.correoElectronico || 'No registrado'}}</span>
              </div>
              <div class="info-item">
                <label>Teléfono</label>
                <span>{{caso.afectado.telefono || 'No registrado'}}</span>
              </div>
              <div class="info-item">
                <label>Dirección</label>
                <span>{{caso.afectado.direccion}}</span>
              </div>
              <div class="info-item">
                <label>Ubicación</label>
                <span>{{caso.afectado.distrito}}, {{caso.afectado.provincia}}, {{caso.afectado.departamento}}</span>
              </div>
            </div>
          </div>

          <div class="info-card" *ngIf="caso.establecimientosInvolucrados && caso.establecimientosInvolucrados.length > 0">
            <h3>Establecimientos Involucrados ({{caso.establecimientosInvolucrados.length}})</h3>
            <div class="establecimientos-list">
              <div class="establecimiento-card" *ngFor="let establecimiento of caso.establecimientosInvolucrados">
                <div class="establecimiento-header">
                  <div class="establecimiento-title">
                    <strong>{{establecimiento.nombre}}</strong>
                    <span class="establecimiento-badge">{{establecimiento.tipo}}</span>
                  </div>
                </div>
                <div class="establecimiento-details">
                  <div class="detail-row">
                    <div class="detail-col">
                      <label>Código Único</label>
                      <span>{{establecimiento.codigoUnico}}</span>
                    </div>
                    <div class="detail-col">
                      <label>Institución</label>
                      <span>{{establecimiento.institucion}}</span>
                    </div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-col">
                      <label>Clasificación</label>
                      <span>{{establecimiento.clasificacion}}</span>
                    </div>
                    <div class="detail-col">
                      <label>Categoría</label>
                      <span>{{establecimiento.categoria}}</span>
                    </div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-col full-width">
                      <label>Ubicación</label>
                      <span>{{establecimiento.distrito}}, {{establecimiento.provincia}}, {{establecimiento.departamento}}</span>
                    </div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-col full-width">
                      <label>Dirección</label>
                      <span>{{establecimiento.direccion}}</span>
                    </div>
                  </div>
                  <div class="detail-row" *ngIf="establecimiento.telefono">
                    <div class="detail-col">
                      <label>Teléfono</label>
                      <span>{{establecimiento.telefono}}</span>
                    </div>
                    <div class="detail-col">
                      <label>UBIGEO</label>
                      <span>{{establecimiento.ubigeo}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3>Historial de Gestiones</h3>
            <div class="timeline">
              <div class="timeline-item" *ngFor="let item of historial">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <strong>{{item.estadoNuevo.replace('_', ' ')}}</strong>
                    <span class="timeline-date">{{item.fecha | date:'dd/MM/yyyy HH:mm'}}</span>
                  </div>
                  <p class="timeline-user">Por: {{item.usuario}}</p>
                  <p class="timeline-comment" *ngIf="item.comentario">{{item.comentario}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar">
          <div class="info-card">
            <h3>SLA y Plazos</h3>
            <div class="sla-widget">
              <div class="sla-circle" [class.danger]="caso.alertaVencimiento">
                <span class="sla-days">{{caso.diasRestantes}}</span>
                <span class="sla-label">días restantes</span>
              </div>
              <div class="sla-details">
                <div class="sla-detail-item">
                  <span>Días transcurridos</span>
                  <strong>{{caso.diasTranscurridos}}</strong>
                </div>
                <div class="sla-detail-item">
                  <span>Plazo total</span>
                  <strong>25 días</strong>
                </div>
              </div>
              <div class="alert-box" *ngIf="caso.alertaVencimiento">
                ⚠️ Caso próximo a vencer
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3>Integración SGD</h3>
            <div class="sgd-info">
              <div class="sgd-item">
                <label>ID SGD</label>
                <span>{{caso.idSGD || 'No asignado'}}</span>
              </div>
              <button class="btn-sgd">Sincronizar con SGD</button>
            </div>
          </div>

          <div class="info-card">
            <h3>Acciones</h3>
            <div class="actions-list">
              <button class="action-btn">Cambiar Estado</button>
              <button class="action-btn">Asignar Responsable</button>
              <button class="action-btn">Generar Informe</button>
              <button class="action-btn">Exportar PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .caso-detail {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .back-link {
      color: #3b82f6;
      font-size: 14px;
      margin-bottom: 8px;
      display: inline-block;
    }

    .header h2 {
      font-size: 28px;
      color: #1e293b;
      margin: 0;
    }

    .estado-badge {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
    }

    .estado-badge.registrado {
      background: #dbeafe;
      color: #1e40af;
    }

    .estado-badge.en-proceso {
      background: #fef3c7;
      color: #d97706;
    }

    .estado-badge.resuelto {
      background: #dcfce7;
      color: #16a34a;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 24px;
    }

    .info-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .info-card h3 {
      font-size: 18px;
      color: #1e293b;
      margin: 0 0 20px 0;
      padding-bottom: 12px;
      border-bottom: 2px solid #f1f5f9;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item label {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .info-item span {
      font-size: 14px;
      color: #1e293b;
    }

    .tipo-badge, .severidad-badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
      width: fit-content;
    }

    .tipo-badge.consulta {
      background: #e0e7ff;
      color: #4338ca;
    }

    .tipo-badge.denuncia {
      background: #fce7f3;
      color: #be123c;
    }

    .severidad-badge.leve {
      background: #dcfce7;
      color: #16a34a;
    }

    .severidad-badge.moderado {
      background: #fef3c7;
      color: #d97706;
    }

    .severidad-badge.severo {
      background: #fee2e2;
      color: #dc2626;
    }

    .seguro-badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
      width: fit-content;
    }

    .seguro-badge.essalud {
      background: #dbeafe;
      color: #1e40af;
    }

    .seguro-badge.eps {
      background: #e0e7ff;
      color: #4338ca;
    }

    .seguro-badge.otro {
      background: #f1f5f9;
      color: #64748b;
    }

    .especialista-info {
      display: flex;
      gap: 16px;
      align-items: center;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
    }

    .especialista-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #60a5fa);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      flex-shrink: 0;
    }

    .especialista-datos {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .especialista-nombre {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
    }

    .especialista-especialidad {
      font-size: 14px;
      color: #64748b;
    }

    .ver-perfil {
      font-size: 13px;
      color: #3b82f6;
      text-decoration: none;
      margin-top: 4px;
    }

    .ver-perfil:hover {
      text-decoration: underline;
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .timeline-item {
      display: flex;
      gap: 16px;
      position: relative;
    }

    .timeline-item:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 24px;
      bottom: -20px;
      width: 2px;
      background: #e2e8f0;
    }

    .timeline-marker {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #3b82f6;
      border: 3px solid white;
      box-shadow: 0 0 0 2px #3b82f6;
      flex-shrink: 0;
      margin-top: 4px;
    }

    .timeline-content {
      flex: 1;
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .timeline-date {
      font-size: 12px;
      color: #64748b;
    }

    .timeline-user {
      font-size: 13px;
      color: #64748b;
      margin: 0 0 4px 0;
    }

    .timeline-comment {
      font-size: 14px;
      color: #475569;
      margin: 0;
    }

    .sla-widget {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .sla-circle {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981, #34d399);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .sla-circle.danger {
      background: linear-gradient(135deg, #ef4444, #f87171);
    }

    .sla-days {
      font-size: 48px;
      font-weight: 700;
    }

    .sla-label {
      font-size: 12px;
      opacity: 0.9;
    }

    .sla-details {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sla-detail-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .sla-detail-item span {
      font-size: 13px;
      color: #64748b;
    }

    .sla-detail-item strong {
      font-size: 14px;
      color: #1e293b;
    }

    .alert-box {
      width: 100%;
      padding: 12px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #dc2626;
      font-size: 13px;
      text-align: center;
    }

    .sgd-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .sgd-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sgd-item label {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .sgd-item span {
      font-size: 14px;
      color: #1e293b;
    }

    .btn-sgd {
      padding: 10px;
      background: #3b82f6;
      color: white;
      border-radius: 8px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .btn-sgd:hover {
      background: #1e40af;
    }

    .actions-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .action-btn {
      padding: 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #475569;
      transition: all 0.2s;
    }

    .action-btn:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .establecimientos-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .establecimiento-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
    }

    .establecimiento-header {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
    }

    .establecimiento-title {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .establecimiento-title strong {
      font-size: 15px;
      color: #1e293b;
    }

    .establecimiento-badge {
      display: inline-block;
      padding: 4px 12px;
      background: #dbeafe;
      color: #1e40af;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      width: fit-content;
    }

    .establecimiento-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .detail-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .detail-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-col.full-width {
      grid-column: 1 / -1;
    }

    .detail-col label {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .detail-col span {
      font-size: 14px;
      color: #1e293b;
    }

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .detail-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CasoDetailComponent implements OnInit {
  caso: Caso | null = null;
  historial: HistorialWorkflow[] = [];

  constructor(
    private route: ActivatedRoute,
    private casoRepository: CasoRepository,
    private workflowRepository: WorkflowRepository
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.casoRepository.obtenerPorId(id).subscribe(caso => {
        this.caso = caso;
      });

      this.workflowRepository.obtenerHistorial(id).subscribe(historial => {
        this.historial = historial;
      });
    }
  }

  getEstadoClase(estado: string): string {
    return estado.toLowerCase().replace('_', '-');
  }

  formatEstado(estado: string): string {
    return estado.replace('_', ' ');
  }
}
