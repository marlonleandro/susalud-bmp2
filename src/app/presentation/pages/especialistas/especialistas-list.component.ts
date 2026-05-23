import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EspecialistaRepository } from '@domain/ports/especialista.repository';
import { Especialista } from '@domain/models/especialista.model';

@Component({
  selector: 'app-especialistas-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="especialistas-list">
      <div class="header">
        <h2>Gestión de Especialistas</h2>
        <a routerLink="/especialistas/nuevo" class="btn-primary">+ Nuevo Especialista</a>
      </div>

      <div class="filters">
        <input type="text" [(ngModel)]="filtros.busqueda" (ngModelChange)="aplicarFiltros()" 
               placeholder="Buscar por nombre, documento o especialidad..." class="search-input">
        
        <select [(ngModel)]="filtros.especialidad" (ngModelChange)="aplicarFiltros()" class="filter-select">
          <option value="">Todas las especialidades</option>
          <option value="Medicina General">Medicina General</option>
          <option value="Cardiología">Cardiología</option>
          <option value="Pediatría">Pediatría</option>
          <option value="Ginecología">Ginecología</option>
          <option value="Traumatología">Traumatología</option>
          <option value="Neurología">Neurología</option>
          <option value="Dermatología">Dermatología</option>
          <option value="Oftalmología">Oftalmología</option>
          <option value="Psiquiatría">Psiquiatría</option>
          <option value="Oncología">Oncología</option>
          <option value="Cirugía General">Cirugía General</option>
          <option value="Medicina Interna">Medicina Interna</option>
        </select>

        <select [(ngModel)]="filtros.estado" (ngModelChange)="aplicarFiltros()" class="filter-select">
          <option value="">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon">👨‍⚕️</div>
          <div class="stat-content">
            <span class="stat-label">Total Especialistas</span>
            <span class="stat-value">{{especialistas.length}}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <span class="stat-label">Activos</span>
            <span class="stat-value">{{getEspecialistasActivos()}}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <span class="stat-label">Casos Asignados</span>
            <span class="stat-value">{{getTotalCasosAsignados()}}</span>
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="especialistas-table">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Nombres Completos</th>
              <th>Especialidad</th>
              <th>Fecha Ingreso</th>
              <th>Casos Asignados</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let especialista of especialistasFiltrados">
              <td>
                <div class="doc-info">
                  <span class="doc-type">{{especialista.tipoDocumento}}</span>
                  <span class="doc-number">{{especialista.numeroDocumento}}</span>
                </div>
              </td>
              <td>
                <div class="name-info">
                  <strong>{{especialista.nombres}} {{especialista.apellidoPaterno}} {{especialista.apellidoMaterno}}</strong>
                  <span class="contact-info" *ngIf="especialista.correoElectronico">
                    📧 {{especialista.correoElectronico}}
                  </span>
                </div>
              </td>
              <td>
                <span class="especialidad-badge">{{especialista.especialidad}}</span>
              </td>
              <td>{{especialista.fechaIngreso | date:'dd/MM/yyyy'}}</td>
              <td>
                <div class="casos-badge">
                  <span class="casos-count">{{especialista.casosAsignados || 0}}</span>
                  <span class="casos-label">casos</span>
                </div>
              </td>
              <td>
                <span class="estado-badge" [class.activo]="especialista.activo" [class.inactivo]="!especialista.activo">
                  {{especialista.activo ? 'Activo' : 'Inactivo'}}
                </span>
              </td>
              <td>
                <div class="actions">
                  <a [routerLink]="['/especialistas', especialista.id]" class="btn-action">Ver</a>
                  <button (click)="toggleEstado(especialista)" class="btn-action secondary">
                    {{especialista.activo ? 'Desactivar' : 'Activar'}}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <span>Mostrando {{especialistasFiltrados.length}} de {{especialistas.length}} especialistas</span>
      </div>
    </div>
  `,
  styles: [`
    .especialistas-list {
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

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .stat-icon {
      font-size: 40px;
    }

    .stat-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-label {
      font-size: 13px;
      color: #64748b;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      overflow-x: auto;
    }

    .especialistas-table {
      width: 100%;
      border-collapse: collapse;
    }

    .especialistas-table th {
      text-align: left;
      padding: 16px;
      background: #f8fafc;
      color: #64748b;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 2px solid #e2e8f0;
    }

    .especialistas-table td {
      padding: 16px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }

    .especialistas-table tr:hover {
      background: #f8fafc;
    }

    .doc-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .doc-type {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
    }

    .doc-number {
      font-size: 14px;
      color: #1e293b;
      font-weight: 600;
    }

    .name-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .name-info strong {
      color: #1e293b;
    }

    .contact-info {
      font-size: 12px;
      color: #64748b;
    }

    .especialidad-badge {
      padding: 6px 12px;
      background: #e0e7ff;
      color: #4338ca;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      display: inline-block;
    }

    .casos-badge {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .casos-count {
      font-size: 20px;
      font-weight: 700;
      color: #3b82f6;
    }

    .casos-label {
      font-size: 12px;
      color: #64748b;
    }

    .estado-badge {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
    }

    .estado-badge.activo {
      background: #dcfce7;
      color: #16a34a;
    }

    .estado-badge.inactivo {
      background: #fee2e2;
      color: #dc2626;
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
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
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

      .stats-cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EspecialistasListComponent implements OnInit {
  especialistas: Especialista[] = [];
  especialistasFiltrados: Especialista[] = [];
  filtros = {
    busqueda: '',
    especialidad: '',
    estado: ''
  };

  constructor(private especialistaRepository: EspecialistaRepository) {}

  ngOnInit() {
    this.cargarEspecialistas();
  }

  cargarEspecialistas() {
    this.especialistaRepository.obtenerTodos().subscribe(especialistas => {
      this.especialistas = especialistas;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.especialistasFiltrados = this.especialistas.filter(especialista => {
      const matchBusqueda = !this.filtros.busqueda || 
        `${especialista.nombres} ${especialista.apellidoPaterno} ${especialista.apellidoMaterno}`.toLowerCase().includes(this.filtros.busqueda.toLowerCase()) ||
        especialista.numeroDocumento.includes(this.filtros.busqueda) ||
        especialista.especialidad.toLowerCase().includes(this.filtros.busqueda.toLowerCase());
      
      const matchEspecialidad = !this.filtros.especialidad || especialista.especialidad === this.filtros.especialidad;
      const matchEstado = !this.filtros.estado || 
        (this.filtros.estado === 'activo' && especialista.activo) ||
        (this.filtros.estado === 'inactivo' && !especialista.activo);

      return matchBusqueda && matchEspecialidad && matchEstado;
    });
  }

  getEspecialistasActivos(): number {
    return this.especialistas.filter(e => e.activo).length;
  }

  getTotalCasosAsignados(): number {
    return this.especialistas.reduce((total, e) => total + (e.casosAsignados || 0), 0);
  }

  toggleEstado(especialista: Especialista) {
    const nuevoEstado = !especialista.activo;
    const mensaje = nuevoEstado ? 'activar' : 'desactivar';
    
    if (confirm(`¿Está seguro de ${mensaje} al especialista ${especialista.nombres} ${especialista.apellidoPaterno}?`)) {
      this.especialistaRepository.actualizar(especialista.id, { activo: nuevoEstado })
        .subscribe(() => {
          especialista.activo = nuevoEstado;
        });
    }
  }
}
