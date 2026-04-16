import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EspecialistaRepository } from '@domain/ports/especialista.repository';
import { Especialista } from '@domain/models/especialista.model';

@Component({
  selector: 'app-especialista-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="especialista-form">
      <h2>Registro de Nuevo Especialista</h2>
      
      <form (ngSubmit)="guardar()" #especialistaForm="ngForm">
        <div class="form-section">
          <h3>Datos Personales</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Tipo de Documento *</label>
              <select [(ngModel)]="especialista.tipoDocumento" name="tipoDocumento" required>
                <option value="DNI">DNI</option>
                <option value="CE">Carnet de Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div class="form-group">
              <label>Número de Documento *</label>
              <input type="text" [(ngModel)]="especialista.numeroDocumento" name="numeroDocumento" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Nombres *</label>
              <input type="text" [(ngModel)]="especialista.nombres" name="nombres" required>
            </div>

            <div class="form-group">
              <label>Apellido Paterno *</label>
              <input type="text" [(ngModel)]="especialista.apellidoPaterno" name="apellidoPaterno" required>
            </div>

            <div class="form-group">
              <label>Apellido Materno *</label>
              <input type="text" [(ngModel)]="especialista.apellidoMaterno" name="apellidoMaterno" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Información Profesional</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Especialidad *</label>
              <select [(ngModel)]="especialista.especialidad" name="especialidad" required>
                <option value="">Seleccione una especialidad...</option>
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
            </div>

            <div class="form-group">
              <label>Fecha de Ingreso *</label>
              <input type="date" [(ngModel)]="especialista.fechaIngreso" name="fechaIngreso" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Datos de Contacto</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label>Correo Electrónico</label>
              <input type="email" [(ngModel)]="especialista.correoElectronico" name="correoElectronico">
            </div>

            <div class="form-group">
              <label>Teléfono</label>
              <input type="tel" [(ngModel)]="especialista.telefono" name="telefono">
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" (click)="cancelar()" class="btn-secondary">Cancelar</button>
          <button type="submit" [disabled]="!especialistaForm.valid" class="btn-primary">Guardar Especialista</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .especialista-form {
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
    .form-group select {
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #3b82f6;
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
      border: none;
      cursor: pointer;
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
export class EspecialistaFormComponent {
  especialista: any = {
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    especialidad: '',
    fechaIngreso: new Date(),
    activo: true,
    correoElectronico: '',
    telefono: ''
  };

  constructor(
    private especialistaRepository: EspecialistaRepository,
    private router: Router
  ) {}

  guardar() {
    this.especialistaRepository.crear(this.especialista).subscribe(() => {
      alert('Especialista registrado exitosamente');
      this.router.navigate(['/especialistas']);
    });
  }

  cancelar() {
    this.router.navigate(['/especialistas']);
  }
}
