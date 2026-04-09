import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sgd',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sgd-module">
      <h2>Integración con SGD</h2>

      <div class="status-card">
        <div class="status-header">
          <h3>Estado de Conexión</h3>
          <span class="status-badge connected">🟢 Conectado</span>
        </div>
        <div class="status-info">
          <div class="info-item">
            <span class="info-label">Última sincronización</span>
            <span class="info-value">Hace 5 minutos</span>
          </div>
          <div class="info-item">
            <span class="info-label">Documentos sincronizados hoy</span>
            <span class="info-value">47</span>
          </div>
          <div class="info-item">
            <span class="info-label">Pendientes de envío</span>
            <span class="info-value">3</span>
          </div>
        </div>
        <button class="btn-sync">🔄 Sincronizar Ahora</button>
      </div>

      <div class="features-section">
        <h3>Funcionalidades de Integración</h3>
        <div class="features-list">
          <div class="feature-item">
            <div class="feature-icon">📤</div>
            <div class="feature-content">
              <h4>Envío Automático de Documentos</h4>
              <p>Los casos registrados se envían automáticamente al SGD con toda la documentación adjunta</p>
              <span class="feature-status active">Activo</span>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">📥</div>
            <div class="feature-content">
              <h4>Recepción de Estados</h4>
              <p>Actualización automática del estado de los documentos desde el SGD</p>
              <span class="feature-status active">Activo</span>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">🔄</div>
            <div class="feature-content">
              <h4>Sincronización Bidireccional</h4>
              <p>Mantiene la información actualizada en ambos sistemas en tiempo real</p>
              <span class="feature-status active">Activo</span>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">🔗</div>
            <div class="feature-content">
              <h4>Identificador Único BPM-SGD</h4>
              <p>Cada caso tiene un identificador único que vincula ambos sistemas</p>
              <span class="feature-status active">Activo</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sync-log">
        <h3>Registro de Sincronizaciones</h3>
        <div class="log-table">
          <table>
            <thead>
              <tr>
                <th>Fecha/Hora</th>
                <th>Expediente</th>
                <th>Acción</th>
                <th>ID SGD</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let log of syncLogs">
                <td>{{log.fecha}}</td>
                <td>{{log.expediente}}</td>
                <td>{{log.accion}}</td>
                <td>{{log.idSGD}}</td>
                <td>
                  <span class="log-status" [class]="log.estado">
                    {{log.estado === 'success' ? '✓ Exitoso' : '✗ Error'}}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="config-section">
        <h3>Configuración de Integración</h3>
        <div class="config-grid">
          <div class="config-item">
            <label>URL del Servicio SGD</label>
            <input type="text" value="https://sgd.susalud.gob.pe/api" readonly>
          </div>
          <div class="config-item">
            <label>Frecuencia de Sincronización</label>
            <select>
              <option>Cada 5 minutos</option>
              <option>Cada 10 minutos</option>
              <option>Cada 30 minutos</option>
            </select>
          </div>
          <div class="config-item">
            <label>Reintentos en caso de error</label>
            <input type="number" value="3">
          </div>
          <div class="config-item">
            <label>Timeout (segundos)</label>
            <input type="number" value="30">
          </div>
        </div>
        <button class="btn-save">Guardar Configuración</button>
      </div>
    </div>
  `,
  styles: [`
    .sgd-module {
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

    .status-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .status-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .status-badge {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
    }

    .status-badge.connected {
      background: #dcfce7;
      color: #16a34a;
    }

    .status-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-label {
      font-size: 13px;
      color: #64748b;
    }

    .info-value {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
    }

    .btn-sync {
      width: 100%;
      padding: 12px;
      background: #3b82f6;
      color: white;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .btn-sync:hover {
      background: #1e40af;
    }

    .features-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .features-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .feature-item {
      display: flex;
      gap: 16px;
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      transition: all 0.2s;
    }

    .feature-item:hover {
      border-color: #cbd5e1;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .feature-icon {
      font-size: 32px;
    }

    .feature-content {
      flex: 1;
    }

    .feature-content h4 {
      font-size: 16px;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .feature-content p {
      font-size: 14px;
      color: #64748b;
      margin: 0 0 12px 0;
    }

    .feature-status {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
    }

    .feature-status.active {
      background: #dcfce7;
      color: #16a34a;
    }

    .sync-log {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .log-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 12px;
      background: #f8fafc;
      color: #64748b;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 2px solid #e2e8f0;
    }

    td {
      padding: 16px 12px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }

    tr:hover {
      background: #f8fafc;
    }

    .log-status {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
    }

    .log-status.success {
      background: #dcfce7;
      color: #16a34a;
    }

    .log-status.error {
      background: #fee2e2;
      color: #dc2626;
    }

    .config-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .config-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .config-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .config-item label {
      font-size: 14px;
      font-weight: 500;
      color: #475569;
    }

    .config-item input,
    .config-item select {
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
    }

    .config-item input:focus,
    .config-item select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .btn-save {
      padding: 12px 24px;
      background: #10b981;
      color: white;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .btn-save:hover {
      background: #059669;
    }

    @media (max-width: 768px) {
      .config-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SGDComponent {
  syncLogs = [
    { fecha: '09/04/2026 14:35', expediente: '29736-2026', accion: 'Envío', idSGD: 'SGD-2026-000186', estado: 'success' },
    { fecha: '09/04/2026 14:30', expediente: '29735-2026', accion: 'Actualización', idSGD: 'SGD-2026-000185', estado: 'success' },
    { fecha: '09/04/2026 14:25', expediente: '29734-2026', accion: 'Envío', idSGD: 'SGD-2026-000184', estado: 'success' },
    { fecha: '09/04/2026 14:20', expediente: '29733-2026', accion: 'Actualización', idSGD: 'SGD-2026-000183', estado: 'error' }
  ];
}
