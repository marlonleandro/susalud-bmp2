import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reportes">
      <h2>Reportería y Análisis</h2>

      <div class="export-section">
        <h3>Exportar Reportes</h3>
        <div class="export-grid">
          <button class="export-btn">
            <span class="icon">📊</span>
            <span>Reporte General</span>
          </button>
          <button class="export-btn">
            <span class="icon">📈</span>
            <span>Indicadores POI/PEI</span>
          </button>
          <button class="export-btn">
            <span class="icon">🗺️</span>
            <span>Mapa Geográfico</span>
          </button>
          <button class="export-btn">
            <span class="icon">⏱️</span>
            <span>Tiempos de Atención</span>
          </button>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-card">
          <h3>Casos por Mes (2026)</h3>
          <div class="bar-chart">
            <div class="bar-group" *ngFor="let mes of mesesData">
              <div class="bar" [style.height.%]="mes.porcentaje"></div>
              <span class="bar-label">{{mes.nombre}}</span>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <h3>Distribución por Departamento</h3>
          <div class="geo-list">
            <div class="geo-item" *ngFor="let dept of departamentos">
              <span class="geo-name">{{dept.nombre}}</span>
              <div class="geo-bar">
                <div class="geo-fill" [style.width.%]="dept.porcentaje"></div>
              </div>
              <span class="geo-value">{{dept.cantidad}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mapa-section">
        <h3>Mapa de Denuncias por Región</h3>
        <div class="mapa-placeholder">
          <p>🗺️ Mapa interactivo de Perú</p>
          <p class="mapa-desc">Visualización geográfica de casos por departamento</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reportes {
      max-width: 1400px;
      margin: 0 auto;
    }

    h2 {
      font-size: 28px;
      color: #1e293b;
      margin-bottom: 30px;
    }

    h3 {
      font-size: 20px;
      color: #1e293b;
      margin: 0 0 20px 0;
    }

    .export-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .export-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .export-btn {
      padding: 20px;
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      transition: all 0.2s;
    }

    .export-btn:hover {
      background: #f1f5f9;
      border-color: #3b82f6;
      transform: translateY(-2px);
    }

    .export-btn .icon {
      font-size: 32px;
    }

    .export-btn span:last-child {
      font-weight: 600;
      color: #1e293b;
    }

    .charts-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 24px;
      margin-bottom: 30px;
    }

    .chart-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .bar-chart {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 250px;
      padding: 20px 0;
      border-bottom: 2px solid #e2e8f0;
    }

    .bar-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .bar {
      width: 40px;
      background: linear-gradient(180deg, #3b82f6, #60a5fa);
      border-radius: 4px 4px 0 0;
      transition: all 0.3s;
    }

    .bar:hover {
      background: linear-gradient(180deg, #1e40af, #3b82f6);
    }

    .bar-label {
      font-size: 12px;
      color: #64748b;
    }

    .geo-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .geo-item {
      display: grid;
      grid-template-columns: 120px 1fr 60px;
      align-items: center;
      gap: 12px;
    }

    .geo-name {
      font-size: 14px;
      color: #1e293b;
      font-weight: 500;
    }

    .geo-bar {
      background: #f1f5f9;
      border-radius: 8px;
      height: 24px;
      overflow: hidden;
    }

    .geo-fill {
      height: 100%;
      background: linear-gradient(90deg, #10b981, #34d399);
      border-radius: 8px;
      transition: width 0.5s ease;
    }

    .geo-value {
      text-align: right;
      font-weight: 600;
      color: #1e293b;
    }

    .mapa-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .mapa-placeholder {
      height: 400px;
      background: linear-gradient(135deg, #f8fafc, #e2e8f0);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .mapa-placeholder p {
      margin: 0;
      font-size: 48px;
    }

    .mapa-desc {
      font-size: 16px !important;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .charts-section {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ReportesComponent {
  mesesData = [
    { nombre: 'Ene', cantidad: 45, porcentaje: 60 },
    { nombre: 'Feb', cantidad: 52, porcentaje: 70 },
    { nombre: 'Mar', cantidad: 68, porcentaje: 90 },
    { nombre: 'Abr', cantidad: 75, porcentaje: 100 }
  ];

  departamentos = [
    { nombre: 'Lima', cantidad: 156, porcentaje: 85 },
    { nombre: 'Arequipa', cantidad: 89, porcentaje: 48 },
    { nombre: 'La Libertad', cantidad: 67, porcentaje: 36 },
    { nombre: 'Cusco', cantidad: 54, porcentaje: 29 },
    { nombre: 'Piura', cantidad: 42, porcentaje: 23 }
  ];
}
