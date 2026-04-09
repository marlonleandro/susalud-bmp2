import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CasoRepository } from '@domain/ports/caso.repository';
import { Caso, TipoSolicitud, Severidad, EstadoCaso } from '@domain/models/caso.model';

@Component({
  selector: 'app-caso-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="caso-form">
      <h2>Registro de Nuevo Caso</h2>
      
      <form (ngSubmit)="guardar()" #casoForm="ngForm">
        <div class="form-section">
          <h3>Información del Caso</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Canal de Ingreso *</label>
              <select [(ngModel)]="caso.canalIngreso" name="canalIngreso" required>
                <option value="">Seleccione...</option>
                <option value="Página web">Página web</option>
                <option value="Correo Electrónico">Correo Electrónico</option>
                <option value="Presencial">Presencial</option>
                <option value="Telefónico">Telefónico</option>
              </select>
            </div>

            <div class="form-group">
              <label>Tipo de Solicitud *</label>
              <select [(ngModel)]="caso.tipoSolicitud" name="tipoSolicitud" required>
                <option value="CONSULTA">Consulta</option>
                <option value="DENUNCIA">Denuncia</option>
              </select>
            </div>

            <div class="form-group">
              <label>Severidad *</label>
              <select [(ngModel)]="caso.severidad" name="severidad" required>
                <option value="LEVE">Leve</option>
                <option value="MODERADO">Moderado</option>
                <option value="SEVERO">Severo</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Descripción del Caso *</label>
            <textarea [(ngModel)]="caso.descripcion" name="descripcion" rows="4" required></textarea>
          </div>
        </div>

        <div class="form-section">
          <h3>Datos del Solicitante</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Tipo de Documento *</label>
              <select [(ngModel)]="caso.solicitante.tipoDocumento" name="tipoDocumento" required>
                <option value="DNI">DNI</option>
                <option value="CE">Carnet de Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div class="form-group">
              <label>Número de Documento *</label>
              <input type="text" [(ngModel)]="caso.solicitante.numeroDocumento" name="numeroDocumento" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Nombres *</label>
              <input type="text" [(ngModel)]="caso.solicitante.nombres" name="nombres" required>
            </div>

            <div class="form-group">
              <label>Apellido Paterno *</label>
              <input type="text" [(ngModel)]="caso.solicitante.apellidoPaterno" name="apellidoPaterno" required>
            </div>

            <div class="form-group">
              <label>Apellido Materno *</label>
              <input type="text" [(ngModel)]="caso.solicitante.apellidoMaterno" name="apellidoMaterno" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Correo Electrónico</label>
              <input type="email" [(ngModel)]="caso.solicitante.correoElectronico" name="correoElectronico">
            </div>

            <div class="form-group">
              <label>Teléfono</label>
              <input type="tel" [(ngModel)]="caso.solicitante.telefono" name="telefono">
            </div>
          </div>

          <div class="form-group">
            <label>Dirección</label>
            <input type="text" [(ngModel)]="caso.solicitante.direccion" name="direccion">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Departamento *</label>
              <select [(ngModel)]="caso.solicitante.departamento" name="departamento" required>
                <option value="">Seleccione...</option>
                <option value="Lima">Lima</option>
                <option value="Arequipa">Arequipa</option>
                <option value="Cusco">Cusco</option>
                <option value="La Libertad">La Libertad</option>
              </select>
            </div>

            <div class="form-group">
              <label>Provincia</label>
              <input type="text" [(ngModel)]="caso.solicitante.provincia" name="provincia">
            </div>

            <div class="form-group">
              <label>Distrito</label>
              <input type="text" [(ngModel)]="caso.solicitante.distrito" name="distrito">
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" (click)="cancelar()" class="btn-secondary">Cancelar</button>
          <button type="submit" [disabled]="!casoForm.valid" class="btn-primary">Guardar Caso</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .caso-form {
      max-width: 1000px;
      margin: 0 auto;
    }

    h2 {
      font-size: 28px;
      color: #1e293b;
      margin-bottom: 30px;
    }

    .form-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .form-section h3 {
      font-size: 18px;
      color: #1e293b;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #f1f5f9;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-size: 14px;
      font-weight: 500;
      color: #475569;
      margin-bottom: 8px;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .form-group textarea {
      resize: vertical;
      font-family: inherit;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    .btn-primary,
    .btn-secondary {
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #1e40af;
    }

    .btn-primary:disabled {
      background: #cbd5e1;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f1f5f9;
      color: #64748b;
    }

    .btn-secondary:hover {
      background: #e2e8f0;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CasoFormComponent {
  caso: any = {
    tipoSolicitud: TipoSolicitud.CONSULTA,
    severidad: Severidad.LEVE,
    estado: EstadoCaso.REGISTRADO,
    canalIngreso: '',
    descripcion: '',
    solicitante: {
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correoElectronico: '',
      telefono: '',
      direccion: '',
      departamento: '',
      provincia: '',
      distrito: '',
      genero: 'Masculino',
      fechaNacimiento: new Date()
    },
    fechaRegistro: new Date(),
    fechaRecepcion: new Date(),
    areaActual: 'Equipo de Intermediación',
    competenciaSUSALUD: true,
    competenciaPROTT: false,
    huboSolicitud: false,
    macroRegion: 'Macro Regional Lima',
    diasTranscurridos: 0,
    diasRestantes: 25,
    alertaVencimiento: false
  };

  constructor(
    private casoRepository: CasoRepository,
    private router: Router
  ) {}

  guardar() {
    const numeroCaso = Math.floor(Math.random() * 90000) + 10000;
    this.caso.numeroExpediente = `${numeroCaso}-2026`;
    
    this.casoRepository.crear(this.caso).subscribe(() => {
      alert('Caso registrado exitosamente');
      this.router.navigate(['/casos']);
    });
  }

  cancelar() {
    this.router.navigate(['/casos']);
  }
}
