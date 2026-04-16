import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CasoRepository } from '@domain/ports/caso.repository';
import { Caso, EstadoCaso, Severidad } from '@domain/models/caso.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <h2 class="page-title">Dashboard - Monitoreo en Tiempo Real</h2>
      
      <div class="stats-grid">
        <div class="stat-card primary">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <h3>Total Casos</h3>
            <p class="stat-value">{{estadisticas.total}}</p>
            <span class="stat-trend up">+12% vs mes anterior</span>
          </div>
        </div>
        
        <div class="stat-card success">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>Resueltos</h3>
            <p class="stat-value">{{estadisticas.resueltos}}</p>
            <span class="stat-trend up">+8% vs mes anterior</span>
          </div>
        </div>
        
        <div class="stat-card warning">
          <div class="stat-icon">⏱️</div>
          <div class="stat-content">
            <h3>En Proceso</h3>
            <p class="stat-value">{{estadisticas.enProceso}}</p>
            <span class="stat-trend stable">Sin cambios</span>
          </div>
        </div>
        
        <div class="stat-card danger">
          <div class="stat-icon">⚠️</div>
          <div class="stat-content">
            <h3>Con Alerta</h3>
            <p class="stat-value">{{estadisticas.conAlerta}}</p>
            <span class="stat-trend down">-5% vs mes anterior</span>
          </div>
        </div>
      </div>

      <div class="charts-grid">
        <div class="chart-card">
          <h3>Casos por Severidad</h3>
          <div class="chart-bars">
            <div class="bar-item">
              <span class="bar-label">Leve</span>
              <div class="bar-container">
                <div class="bar leve" [style.width.%]="getSeveridadPorcentaje('LEVE')"></div>
              </div>
              <span class="bar-value">{{getSeveridadCantidad('LEVE')}}</span>
            </div>
            <div class="bar-item">
              <span class="bar-label">Moderado</span>
              <div class="bar-container">
                <div class="bar moderado" [style.width.%]="getSeveridadPorcentaje('MODERADO')"></div>
              </div>
              <span class="bar-value">{{getSeveridadCantidad('MODERADO')}}</span>
            </div>
            <div class="bar-item">
              <span class="bar-label">Severo</span>
              <div class="bar-container">
                <div class="bar severo" [style.width.%]="getSeveridadPorcentaje('SEVERO')"></div>
              </div>
              <span class="bar-value">{{getSeveridadCantidad('SEVERO')}}</span>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <h3>Casos por Estado</h3>
          <div class="estado-list">
            <div class="estado-item" *ngFor="let estado of estadosCasos">
              <div class="estado-info">
                <span class="estado-badge" [class]="estado.clase">{{estado.nombre}}</span>
                <span class="estado-count">{{estado.cantidad}} casos</span>
              </div>
              <div class="estado-bar">
                <div class="estado-fill" [style.width.%]="estado.porcentaje" [class]="estado.clase"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="recent-cases">
        <div class="section-header">
          <h3>Casos Recientes</h3>
          <a routerLink="/casos" class="btn-link">Ver todos →</a>
        </div>
        
        <div class="table-container">
          <table class="cases-table">
            <thead>
              <tr>
                <th>Expediente</th>
                <th>Tipo</th>
                <th>Solicitante</th>
                <th>Afectado</th>
                <th>Especialista</th>
                <th>Severidad</th>
                <th>Estado</th>
                <th>Días</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let caso of casosRecientes">
                <td><strong>{{caso.numeroExpediente}}</strong></td>
                <td>
                  <span class="tipo-badge" [class.consulta]="caso.tipoSolicitud === 'CONSULTA'" 
                        [class.denuncia]="caso.tipoSolicitud === 'DENUNCIA'">
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
                  <span *ngIf="!caso.especialistaAsignado" class="sin-asignar">-</span>
                </td>
                <td>
                  <span class="severidad-badge" [class]="caso.severidad.toLowerCase()">
                    {{caso.severidad}}
                  </span>
                </td>
                <td>
                  <span class="estado-badge" [class]="getEstadoClase(caso.estado)">
                    {{caso.estado.replace('_', ' ')}}
                  </span>
                </td>
                <td>
                  <span [class.text-danger]="caso.alertaVencimiento">
                    {{caso.diasTranscurridos}} / {{caso.diasRestantes}} restantes
                  </span>
                </td>
                <td>
                  <a [routerLink]="['/casos', caso.id]" class="btn-action">Ver</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="indicadores-poi">
        <h3>Indicadores POI / PEI</h3>
        <div class="indicadores-grid">
          <div class="indicador-card">
            <h4>Tiempo Promedio de Resolución</h4>
            <p class="indicador-value">18.5 días</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 74%"></div>
            </div>
            <span class="indicador-meta">Meta: 25 días</span>
          </div>
          
          <div class="indicador-card">
            <h4>Casos Resueltos en Plazo</h4>
            <p class="indicador-value">92%</p>
            <div class="progress-bar">
              <div class="progress-fill success" style="width: 92%"></div>
            </div>
            <span class="indicador-meta">Meta: 90%</span>
          </div>
          
          <div class="indicador-card">
            <h4>Satisfacción del Usuario</h4>
            <p class="indicador-value">4.2/5</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 84%"></div>
            </div>
            <span class="indicador-meta">Meta: 4.0/5</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 28px;
      color: #1e293b;
      margin-bottom: 30px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: transform 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    }

    .stat-icon {
      font-size: 48px;
      opacity: 0.9;
    }

    .stat-content h3 {
      margin: 0 0 8px 0;
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }

    .stat-value {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      color: #1e293b;
    }

    .stat-trend {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 8px;
    }

    .stat-trend.up {
      background: #dcfce7;
      color: #16a34a;
    }

    .stat-trend.down {
      background: #fee2e2;
      color: #dc2626;
    }

    .stat-trend.stable {
      background: #f1f5f9;
      color: #64748b;
    }

    .text-muted {
      color: #94a3b8;
      font-style: italic;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .chart-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .chart-card h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      color: #1e293b;
    }

    .chart-bars {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .bar-item {
      display: grid;
      grid-template-columns: 100px 1fr 60px;
      align-items: center;
      gap: 12px;
    }

    .bar-label {
      font-size: 14px;
      color: #64748b;
    }

    .bar-container {
      background: #f1f5f9;
      border-radius: 8px;
      height: 32px;
      overflow: hidden;
    }

    .bar {
      height: 100%;
      border-radius: 8px;
      transition: width 0.5s ease;
    }

    .bar.leve {
      background: linear-gradient(90deg, #10b981, #34d399);
    }

    .bar.moderado {
      background: linear-gradient(90deg, #f59e0b, #fbbf24);
    }

    .bar.severo {
      background: linear-gradient(90deg, #ef4444, #f87171);
    }

    .bar-value {
      text-align: right;
      font-weight: 600;
      color: #1e293b;
    }

    .estado-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .estado-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .estado-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .estado-badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
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

    .estado-count {
      font-size: 14px;
      color: #64748b;
    }

    .estado-bar {
      background: #f1f5f9;
      border-radius: 4px;
      height: 8px;
      overflow: hidden;
    }

    .estado-fill {
      height: 100%;
      transition: width 0.5s ease;
    }

    .estado-fill.registrado {
      background: #3b82f6;
    }

    .estado-fill.en-proceso {
      background: #f59e0b;
    }

    .estado-fill.resuelto {
      background: #10b981;
    }

    .recent-cases {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      margin-bottom: 30px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .section-header h3 {
      margin: 0;
      font-size: 18px;
      color: #1e293b;
    }

    .btn-link {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .btn-link:hover {
      color: #1e40af;
    }

    .table-container {
      overflow-x: auto;
    }

    .cases-table {
      width: 100%;
      border-collapse: collapse;
    }

    .cases-table th {
      text-align: left;
      padding: 12px;
      background: #f8fafc;
      color: #64748b;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 2px solid #e2e8f0;
    }

    .cases-table td {
      padding: 16px 12px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }

    .cases-table tr:hover {
      background: #f8fafc;
    }

    .tipo-badge {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
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
    }

    .text-danger {
      color: #dc2626;
      font-weight: 600;
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

    .indicadores-poi {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .indicadores-poi h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      color: #1e293b;
    }

    .indicadores-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .indicador-card {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }

    .indicador-card h4 {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }

    .indicador-value {
      margin: 0 0 12px 0;
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
    }

    .progress-bar {
      background: #f1f5f9;
      border-radius: 8px;
      height: 8px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 8px;
      transition: width 0.5s ease;
    }

    .progress-fill.success {
      background: #10b981;
    }

    .indicador-meta {
      font-size: 12px;
      color: #94a3b8;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }

      .indicadores-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  casos: Caso[] = [];
  casosRecientes: Caso[] = [];
  estadisticas = {
    total: 0,
    resueltos: 0,
    enProceso: 0,
    conAlerta: 0
  };
  estadosCasos: any[] = [];

  constructor(private casoRepository: CasoRepository) {}

  ngOnInit() {
    this.casoRepository.obtenerTodos().subscribe(casos => {
      this.casos = casos;
      this.casosRecientes = casos.slice(0, 5);
      this.calcularEstadisticas();
      this.calcularEstadosCasos();
    });
  }

  calcularEstadisticas() {
    this.estadisticas.total = this.casos.length;
    this.estadisticas.resueltos = this.casos.filter(c => c.estado === EstadoCaso.RESUELTO).length;
    this.estadisticas.enProceso = this.casos.filter(c => c.estado === EstadoCaso.EN_PROCESO).length;
    this.estadisticas.conAlerta = this.casos.filter(c => c.alertaVencimiento).length;
  }

  calcularEstadosCasos() {
    const estados = [
      { nombre: 'Registrado', clase: 'registrado', cantidad: 0 },
      { nombre: 'En Proceso', clase: 'en-proceso', cantidad: 0 },
      { nombre: 'Resuelto', clase: 'resuelto', cantidad: 0 }
    ];

    this.casos.forEach(caso => {
      const estado = estados.find(e => e.clase === caso.estado.toLowerCase().replace('_', '-'));
      if (estado) estado.cantidad++;
    });

    this.estadosCasos = estados.map(e => ({
      ...e,
      porcentaje: (e.cantidad / this.estadisticas.total) * 100
    }));
  }

  getSeveridadCantidad(severidad: string): number {
    return this.casos.filter(c => c.severidad === severidad).length;
  }

  getSeveridadPorcentaje(severidad: string): number {
    const cantidad = this.getSeveridadCantidad(severidad);
    return (cantidad / this.estadisticas.total) * 100;
  }

  getEstadoClase(estado: EstadoCaso): string {
    return estado.toLowerCase().replace('_', '-');
  }
}
