import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EspecialistaRepository } from '@domain/ports/especialista.repository';
import { Especialista } from '@domain/models/especialista.model';

@Component({
  selector: 'app-especialista-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="especialista-detail" *ngIf="especialista">
      <div class="header">
        <div>
          <a routerLink="/especialistas" class="back-link">← Volver a especialistas</a>
          <h2>{{especialista.nombres}} {{especialista.apellidoPaterno}} {{especialista.apellidoMaterno}}</h2>
        </div>
        <span class="estado-badge" [class.activo]="especialista.activo" [class.inactivo]="!especialista.activo">
          {{especialista.activo ? 'Activo' : 'Inactivo'}}
        </span>
      </div>

      <div class="content-grid">
        <div class="main-content">
          <div class="info-card">
            <h3>Información Personal</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Tipo de Documento</label>
                <span>{{especialista.tipoDocumento}}</span>
              </div>
              <div class="info-item">
                <label>Número de Documento</label>
                <span>{{especialista.numeroDocumento}}</span>
              </div>
              <div class="info-item">
                <label>Nombres</label>
                <span>{{especialista.nombres}}</span>
              </div>
              <div class="info-item">
                <label>Apellido Paterno</label>
                <span>{{especialista.apellidoPaterno}}</span>
              </div>
              <div class="info-item">
                <label>Apellido Materno</label>
                <span>{{especialista.apellidoMaterno}}</span>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3>Información Profesional</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Especialidad</label>
                <span class="especialidad-badge">{{especialista.especialidad}}</span>
              </div>
              <div class="info-item">
                <label>Fecha de Ingreso</label>
                <span>{{especialista.fechaIngreso | date:'dd/MM/yyyy'}}</span>
              </div>
              <div class="info-item">
                <label>Años de Servicio</label>
                <span>{{calcularAniosServicio(especialista.fechaIngreso)}} años</span>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3>Información de Contacto</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Correo Electrónico</label>
                <span>{{especialista.correoElectronico || 'No registrado'}}</span>
              </div>
              <div class="info-item">
                <label>Teléfono</label>
                <span>{{especialista.telefono || 'No registrado'}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar">
          <div class="info-card">
            <h3>Estadísticas</h3>
            <div class="stats-widget">
              <div class="stat-circle">
                <span class="stat-number">{{especialista.casosAsignados || 0}}</span>
                <span class="stat-label">Casos Asignados</span>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3>Acciones</h3>
            <div class="actions-list">
              <button class="action-btn" [routerLink]="['/especialistas', especialista.id, 'editar']">
                Editar Información
              </button>
              <button class="action-btn">Ver Casos Asignados</button>
              <button class="action-btn" *ngIf="especialista.activo" (click)="desactivar()">
                Desactivar Especialista
              </button>
              <button class="action-btn success" *ngIf="!especialista.activo" (click)="activar()">
                Activar Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .especialista-detail {
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
      text-decoration: none;
    }

    .back-link:hover {
      text-decoration: underline;
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

    .estado-badge.activo {
      background: #dcfce7;
      color: #16a34a;
    }

    .estado-badge.inactivo {
      background: #fee2e2;
      color: #dc2626;
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

    .especialidad-badge {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      background: #dbeafe;
      color: #1e40af;
      display: inline-block;
      width: fit-content;
    }

    .stats-widget {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .stat-circle {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #60a5fa);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .stat-number {
      font-size: 48px;
      font-weight: 700;
    }

    .stat-label {
      font-size: 12px;
      opacity: 0.9;
      text-align: center;
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
      cursor: pointer;
    }

    .action-btn:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .action-btn.success {
      background: #dcfce7;
      border-color: #86efac;
      color: #16a34a;
    }

    .action-btn.success:hover {
      background: #bbf7d0;
    }

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EspecialistaDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private especialistaRepository = inject(EspecialistaRepository);

  especialista: Especialista | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.especialistaRepository.obtenerPorId(id).subscribe(especialista => {
        this.especialista = especialista;
      });
    }
  }

  calcularAniosServicio(fechaIngreso: Date): number {
    const hoy = new Date();
    const ingreso = new Date(fechaIngreso);
    const diff = hoy.getTime() - ingreso.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  }

  desactivar() {
    if (this.especialista && confirm('¿Está seguro de desactivar este especialista?')) {
      this.especialistaRepository.actualizar(this.especialista.id, { activo: false })
        .subscribe(updated => {
          this.especialista = updated;
          alert('Especialista desactivado exitosamente');
        });
    }
  }

  activar() {
    if (this.especialista) {
      this.especialistaRepository.actualizar(this.especialista.id, { activo: true })
        .subscribe(updated => {
          this.especialista = updated;
          alert('Especialista activado exitosamente');
        });
    }
  }
}
