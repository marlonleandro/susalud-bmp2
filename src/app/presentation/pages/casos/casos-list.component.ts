import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CasoRepository } from '@domain/ports/caso.repository';
import { Caso } from '@domain/models/caso.model';

@Component({
  selector: 'app-casos-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="casos-list">
      <div class="header">
        <h2>Gestión de Casos</h2>
        <a routerLink="/casos/nuevo" class="btn-primary">+ Nuevo Caso</a>
      </div>

      <div class="filters">
        <input type="text" [(ngModel)]="filtros.busqueda" (ngModelChange)="aplicarFiltros()" 
               placeholder="Buscar por expediente, solicitante..." class="search-input">
        
        <select [(ngModel)]="filtros.estado" (ngModelChange)="aplicarFiltros()" class="filter-select">
          <option value="">Todos los estados</option>
          <option value="REGISTRADO">Registrado</option>
          <option value="EN_PROCESO">En Proceso</option>
          <option value="PENDIENTE_INFORME">Pendiente Informe</option>
          <option value="RESUELTO">Resuelto</option>
          <option value="CERRADO">Cerrado</option>
        </select>

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
        <table class="casos-table">
          <thead>
            <tr>
              <th>Expediente</th>
              <th>Fecha Registro</th>
              <th>Tipo</th>
              <th>Solicitante</th>
              <th>Afectado</th>
              <th>Especialista</th>
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
              <td>{{caso.afectado.nombres}} {{caso.afectado.apellidoPaterno}}</td>
              <td>
                <span *ngIf="caso.especialistaAsignado" class="especialista-badge" 
                      [title]="caso.especialistaAsignado.nombres + ' ' + caso.especialistaAsignado.apellidoPaterno">
                  {{caso.especialistaAsignado.apellidoPaterno}}
                </span>
                <span *ngIf="!caso.especialistaAsignado" class="sin-asignar">Sin asignar</span>
              </td>
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
                  <a [routerLink]="['/casos', caso.id]" class="btn-action">Ver</a>
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
    .casos-list {
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

    .btn-primary {
      padding: 12px 24px;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .btn-primary:hover {
      background: #1e40af;
    }

    .filters {
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
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

    .casos-table {
      width: 100%;
      border-collapse: collapse;
    }

    .casos-table th {
      text-align: left;
      padding: 16px;
      background: #f8fafc;
      color: #64748b;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 2px solid #e2e8f0;
    }

    .casos-table td {
      padding: 16px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }

    .casos-table tr:hover {
      background: #f8fafc;
    }

    .casos-table tr.alerta {
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

    .especialista-badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      background: #dbeafe;
      color: #1e40af;
      display: inline-block;
      cursor: help;
    }

    .sin-asignar {
      font-size: 12px;
      color: #94a3b8;
      font-style: italic;
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

    .text-muted {
      color: #94a3b8;
      font-style: italic;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn-action {
      padding: 6px 16px;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .btn-action:hover {
      background: #1e40af;
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
export class CasosListComponent implements OnInit {
  casos: Caso[] = [];
  casosFiltrados: Caso[] = [];
  filtros = {
    busqueda: '',
    estado: '',
    severidad: '',
    tipo: ''
  };

  constructor(private casoRepository: CasoRepository) {}

  ngOnInit() {
    this.cargarCasos();
  }

  cargarCasos() {
    this.casoRepository.obtenerTodos().subscribe(casos => {
      this.casos = casos;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.casosFiltrados = this.casos.filter(caso => {
      const matchBusqueda = !this.filtros.busqueda || 
        caso.numeroExpediente.toLowerCase().includes(this.filtros.busqueda.toLowerCase()) ||
        `${caso.solicitante.nombres} ${caso.solicitante.apellidoPaterno}`.toLowerCase().includes(this.filtros.busqueda.toLowerCase());
      
      const matchEstado = !this.filtros.estado || caso.estado === this.filtros.estado;
      const matchSeveridad = !this.filtros.severidad || caso.severidad === this.filtros.severidad;
      const matchTipo = !this.filtros.tipo || caso.tipoSolicitud === this.filtros.tipo;

      return matchBusqueda && matchEstado && matchSeveridad && matchTipo;
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
