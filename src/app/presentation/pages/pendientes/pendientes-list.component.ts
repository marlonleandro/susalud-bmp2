import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CasoRepository } from '@domain/ports/caso.repository';
import { Caso } from '@domain/models/caso.model';

@Component({
  selector: 'app-pendientes-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="pendientes-list">
      <div class="header">
        <h2>Mis Pendientes</h2>
        <div class="header-info">
          <span class="badge-count">{{casosFiltrados.length}} casos pendientes</span>
        </div>
      </div>

      <div class="filters">
        <input type="text" [(ngModel)]="filtros.busqueda" (ngModelChange)="aplicarFiltros()" 
               placeholder="Buscar por expediente, solicitante..." class="search-input">
        
        <select [(ngModel)]="filtros.severidad" (ngModelChange)="aplicarFiltros()" class="filter-select">
          <option value="">Todas las severidades</option>
          <option value="LEVE">Leve</option>
          <option value="MODERADO">Moderado</option>
          <option value="SEVERO">Severo</option>
        </select>

        <select [(ngModel)]="filtros.tipo" (ngModelChange)="aplicarFiltros()" class="filter-select">
          <option value="">Todos los tipos</option>
          <option value="CONSULTA">Consulta</option>
          <option value="DENUNCIA">Denuncia</option>
        </select>
      </div>

      <div class="table-container">
        <table class="pendientes-table">
          <thead>
            <tr>
              <th>Expediente</th>
              <th>Fecha Registro</th>
              <th>Tipo</th>
              <th>Solicitante</th>
              <th>Macro Región</th>
              <th>Severidad</th>
              <th>Estado</th>
              <th>SLA</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let caso of casosFiltrados" [class.alerta]="caso.alertaVencimiento">
              <td><strong>{{caso.numeroExpediente}}</strong></td>
              <td>{{caso.fechaRegistro | date:'dd/MM/yyyy'}}</td>
              <td>
                <span class="tipo-badge" [class]="caso.tipoSolicitud.toLowerCase()">
                  {{caso.tipoSolicitud}}
                </span>
              </td>
              <td>{{caso.solicitante.nombres}} {{caso.solicitante.apellidoPaterno}}</td>
              <td>{{caso.macroRegion}}</td>
              <td>
                <span class="severidad-badge" [class]="caso.severidad.toLowerCase()">
                  {{caso.severidad}}
                </span>
              </td>
              <td>
                <span class="estado-badge" [class]="getEstadoClase(caso.estado)">
                  {{formatEstado(caso.estado)}}
                </span>
              </td>
              <td>
                <div class="sla-info">
                  <span [class.text-danger]="caso.alertaVencimiento">
                    {{caso.diasTranscurridos}}d / {{caso.diasRestantes}}d
                  </span>
                  <div class="sla-bar">
                    <div class="sla-fill" [style.width.%]="getSLAPorcentaje(caso)" 
                         [class.danger]="caso.alertaVencimiento"></div>
                  </div>
                </div>
              </td>
              <td>
                <div class="actions">
                  <a [routerLink]="['/pendientes', caso.id]" class="btn-action">Revisar</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <span>Mostrando {{casosFiltrados.length}} de {{casos.length}} casos</span>
      </div>
    </div>
  `,
  styles: [`
    .pendientes-list {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .header h2 {
      margin: 0;
      font-size: 28px;
      color: #1e293b;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .badge-count {
      padding: 8px 16px;
      background: #fef3c7;
      color: #d97706;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
    }

    .filters {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .search-input, .filter-select {
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.2s;
    }

    .search-input:focus, .filter-select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      overflow-x: auto;
    }

    .pendientes-table {
      width: 100%;
      border-collapse: collapse;
    }

    .pendientes-table th {
      text-align: left;
      padding: 16px;
      background: #f8fafc;
      color: #64748b;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 2px solid #e2e8f0;
    }

    .pendientes-table td {
      padding: 16px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }

    .pendientes-table tr:hover {
      background: #f8fafc;
    }

    .pendientes-table tr.alerta {
      background: #fef2f2;
    }

    .tipo-badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
    }

    .tipo-badge.consulta {
      background: #e0e7ff;
      color: #4338ca;
    }

    .tipo-badge.denuncia {
      background: #fce7f3;
      color: #be123c;
    }

    .severidad-badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
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

    .estado-badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
    }

    .estado-badge.registrado {
      background: #dbeafe;
      color: #1e40af;
    }

    .estado-badge.en-proceso {
      background: #fef3c7;
      color: #d97706;
    }

    .estado-badge.pendiente-informe {
      background: #e9d5ff;
      color: #7c3aed;
    }

    .estado-badge.resuelto {
      background: #dcfce7;
      color: #16a34a;
    }

    .estado-badge.cerrado {
      background: #f1f5f9;
      color: #64748b;
    }

    .sla-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sla-bar {
      background: #f1f5f9;
      border-radius: 4px;
      height: 4px;
      overflow: hidden;
    }

    .sla-fill {
      height: 100%;
      background: #10b981;
      transition: width 0.3s;
    }

    .sla-fill.danger {
      background: #ef4444;
    }

    .text-danger {
      color: #dc2626;
      font-weight: 600;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn-action {
      padding: 6px 16px;
      background: #f59e0b;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .btn-action:hover {
      background: #d97706;
    }

    .pagination {
      margin-top: 20px;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .filters {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PendientesListComponent implements OnInit {
  casos: Caso[] = [];
  casosFiltrados: Caso[] = [];
  filtros = {
    busqueda: '',
    severidad: '',
    tipo: ''
  };

  constructor(private casoRepository: CasoRepository) {}

  ngOnInit() {
    this.cargarPendientes();
  }

  cargarPendientes() {
    // Filtrar solo casos en estado EN_PROCESO o PENDIENTE_INFORME
    this.casoRepository.obtenerTodos().subscribe(casos => {
      this.casos = casos.filter(caso => 
        caso.estado === 'EN_PROCESO' || caso.estado === 'PENDIENTE_INFORME'
      );
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.casosFiltrados = this.casos.filter(caso => {
      const matchBusqueda = !this.filtros.busqueda || 
        caso.numeroExpediente.toLowerCase().includes(this.filtros.busqueda.toLowerCase()) ||
        `${caso.solicitante.nombres} ${caso.solicitante.apellidoPaterno}`.toLowerCase().includes(this.filtros.busqueda.toLowerCase());
      
      const matchSeveridad = !this.filtros.severidad || caso.severidad === this.filtros.severidad;
      const matchTipo = !this.filtros.tipo || caso.tipoSolicitud === this.filtros.tipo;

      return matchBusqueda && matchSeveridad && matchTipo;
    });
  }

  getEstadoClase(estado: string): string {
    return estado.toLowerCase().replace('_', '-');
  }

  formatEstado(estado: string): string {
    return estado.replace('_', ' ');
  }

  getSLAPorcentaje(caso: Caso): number {
    const total = caso.diasTranscurridos + caso.diasRestantes;
    return (caso.diasTranscurridos / total) * 100;
  }
}
