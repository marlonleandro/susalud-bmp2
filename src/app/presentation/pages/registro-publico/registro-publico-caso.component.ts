import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CasoRepository } from '@domain/ports/caso.repository';
import { UbigeoRepository } from '@domain/ports/ubigeo.repository';
import { IpressRepository } from '@domain/ports/ipress.repository';
import { TipoSolicitud, Severidad, EstadoCaso } from '@domain/models/caso.model';
import { Departamento, Provincia, Distrito } from '@domain/models/ubigeo.model';
import { Ipress } from '@domain/models/ipress.model';

@Component({
  selector: 'app-registro-publico-caso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="registro-publico-container">
      <div class="registro-header">
        <img src="assets/images/logo_susalud.png" alt="SUSALUD" class="logo">
        <h1>Registro de Consulta o Denuncia</h1>
        <p>SUSALUD - Superintendencia Nacional de Salud</p>
      </div>

      <div class="registro-card" *ngIf="!mostrarMensajeExito">
        <form (ngSubmit)="guardar()" #casoForm="ngForm">
          <div class="form-section">
            <h3>Información del Caso</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label>Tipo de Solicitud *</label>
                <select [(ngModel)]="caso.tipoSolicitud" name="tipoSolicitud" required>
                  <option value="CONSULTA">Consulta</option>
                  <option value="DENUNCIA">Denuncia</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Descripción del Caso *</label>
              <textarea [(ngModel)]="caso.descripcion" name="descripcion" rows="4" required 
                placeholder="Describa detalladamente su consulta o denuncia"></textarea>
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
                <select 
                  [(ngModel)]="departamentoSeleccionado" 
                  name="departamento" 
                  (change)="onDepartamentoChange()"
                  required>
                  <option value="">Seleccione un departamento...</option>
                  <option *ngFor="let dept of departamentos" [value]="dept.codigo">
                    {{dept.nombre}}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Provincia *</label>
                <select 
                  [(ngModel)]="provinciaSeleccionada" 
                  name="provincia"
                  (change)="onProvinciaChange()"
                  [disabled]="!departamentoSeleccionado"
                  required>
                  <option value="">Seleccione una provincia...</option>
                  <option *ngFor="let prov of provincias" [value]="prov.codigo">
                    {{prov.nombre}}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Distrito *</label>
                <select 
                  [(ngModel)]="distritoSeleccionado" 
                  name="distrito"
                  (change)="onDistritoChange()"
                  [disabled]="!provinciaSeleccionada"
                  required>
                  <option value="">Seleccione un distrito...</option>
                  <option *ngFor="let dist of distritos" [value]="dist.codigo">
                    {{dist.nombre}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Datos del Afectado</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label>Tipo de Documento *</label>
                <select [(ngModel)]="caso.afectado.tipoDocumento" name="afectadoTipoDocumento" required>
                  <option value="DNI">DNI</option>
                  <option value="CE">Carnet de Extranjería</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>

              <div class="form-group">
                <label>Número de Documento *</label>
                <input type="text" [(ngModel)]="caso.afectado.numeroDocumento" name="afectadoNumeroDocumento" required>
              </div>

              <div class="form-group">
                <label>Fecha de Nacimiento *</label>
                <input type="date" [(ngModel)]="caso.afectado.fechaNacimiento" name="afectadoFechaNacimiento" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Nombres *</label>
                <input type="text" [(ngModel)]="caso.afectado.nombres" name="afectadoNombres" required>
              </div>

              <div class="form-group">
                <label>Apellido Paterno *</label>
                <input type="text" [(ngModel)]="caso.afectado.apellidoPaterno" name="afectadoApellidoPaterno" required>
              </div>

              <div class="form-group">
                <label>Apellido Materno *</label>
                <input type="text" [(ngModel)]="caso.afectado.apellidoMaterno" name="afectadoApellidoMaterno" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Género *</label>
                <select [(ngModel)]="caso.afectado.genero" name="afectadoGenero" required>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>

              <div class="form-group">
                <label>Número de Historia Clínica</label>
                <input type="text" [(ngModel)]="caso.afectado.numeroHistoriaClinica" name="afectadoHistoriaClinica">
              </div>

              <div class="form-group">
                <label>Tipo de Seguro *</label>
                <select [(ngModel)]="caso.afectado.tipoSeguro" name="afectadoTipoSeguro" required>
                  <option value="ESSALUD">ESSALUD</option>
                  <option value="EPS">EPS</option>
                  <option value="OTRO">OTRO</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Correo Electrónico</label>
                <input type="email" [(ngModel)]="caso.afectado.correoElectronico" name="afectadoCorreoElectronico">
              </div>

              <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" [(ngModel)]="caso.afectado.telefono" name="afectadoTelefono">
              </div>
            </div>

            <div class="form-group">
              <label>Dirección *</label>
              <input type="text" [(ngModel)]="caso.afectado.direccion" name="afectadoDireccion" required>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Departamento *</label>
                <select 
                  [(ngModel)]="departamentoAfectado" 
                  name="afectadoDepartamento" 
                  (change)="onDepartamentoAfectadoChange()"
                  required>
                  <option value="">Seleccione un departamento...</option>
                  <option *ngFor="let dept of departamentos" [value]="dept.codigo">
                    {{dept.nombre}}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Provincia *</label>
                <select 
                  [(ngModel)]="provinciaAfectado" 
                  name="afectadoProvincia"
                  (change)="onProvinciaAfectadoChange()"
                  [disabled]="!departamentoAfectado"
                  required>
                  <option value="">Seleccione una provincia...</option>
                  <option *ngFor="let prov of provinciasAfectado" [value]="prov.codigo">
                    {{prov.nombre}}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Distrito *</label>
                <select 
                  [(ngModel)]="distritoAfectado" 
                  name="afectadoDistrito"
                  (change)="onDistritoAfectadoChange()"
                  [disabled]="!provinciaAfectado"
                  required>
                  <option value="">Seleccione un distrito...</option>
                  <option *ngFor="let dist of distritosAfectado" [value]="dist.codigo">
                    {{dist.nombre}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Establecimientos Involucrados</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label>Departamento del Establecimiento *</label>
                <select 
                  [(ngModel)]="departamentoIpress" 
                  name="departamentoIpress" 
                  (change)="onDepartamentoIpressChange()">
                  <option value="">Seleccione un departamento...</option>
                  <option *ngFor="let dept of departamentos" [value]="dept.codigo">
                    {{dept.nombre}}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Provincia del Establecimiento *</label>
                <select 
                  [(ngModel)]="provinciaIpress" 
                  name="provinciaIpress"
                  (change)="onProvinciaIpressChange()"
                  [disabled]="!departamentoIpress">
                  <option value="">Seleccione una provincia...</option>
                  <option *ngFor="let prov of provinciasIpress" [value]="prov.codigo">
                    {{prov.nombre}}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>Distrito del Establecimiento *</label>
                <select 
                  [(ngModel)]="distritoIpress" 
                  name="distritoIpress"
                  (change)="onDistritoIpressChange()"
                  [disabled]="!provinciaIpress">
                  <option value="">Seleccione un distrito...</option>
                  <option *ngFor="let dist of distritosIpress" [value]="dist.codigoUbigeo">
                    {{dist.nombre}}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-row" *ngIf="distritoIpress">
              <div class="form-group full-width">
                <label>Seleccionar Establecimiento *</label>
                <select 
                  [(ngModel)]="ipressSeleccionado" 
                  name="ipressSeleccionado"
                  [disabled]="!establecimientosDisponibles.length">
                  <option value="">Seleccione un establecimiento...</option>
                  <option *ngFor="let ipress of establecimientosDisponibles" [value]="ipress.codigoUnico">
                    {{ipress.nombre}} - {{ipress.tipo}}
                  </option>
                </select>
                <small *ngIf="!establecimientosDisponibles.length && distritoIpress" class="help-text text-warning">
                  No se encontraron establecimientos activos en este distrito
                </small>
              </div>
            </div>

            <div class="form-actions-inline" *ngIf="ipressSeleccionado">
              <button type="button" (click)="agregarIpress()" class="btn-add">
                + Agregar Establecimiento
              </button>
            </div>

            <div class="ipress-list" *ngIf="establecimientosAgregados.length > 0">
              <h4>Establecimientos Agregados ({{establecimientosAgregados.length}})</h4>
              <div class="ipress-card" *ngFor="let ipress of establecimientosAgregados; let i = index">
                <div class="ipress-header">
                  <div class="ipress-title">
                    <strong>{{ipress.nombre}}</strong>
                    <span class="ipress-badge">{{ipress.tipo}}</span>
                  </div>
                  <button type="button" (click)="eliminarIpress(i)" class="btn-remove" title="Eliminar">
                    ✕
                  </button>
                </div>
                <div class="ipress-details">
                  <div class="detail-item">
                    <span class="detail-label">Ubicación:</span>
                    <span>{{ipress.distrito}}, {{ipress.provincia}}, {{ipress.departamento}}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Dirección:</span>
                    <span>{{ipress.direccion}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" (click)="cancelar()" class="btn-secondary">Cancelar</button>
            <button type="submit" [disabled]="!casoForm.valid || isSubmitting" class="btn-primary">
              <span *ngIf="!isSubmitting">Registrar Caso</span>
              <span *ngIf="isSubmitting">Registrando...</span>
            </button>
          </div>
        </form>
      </div>

      <div class="mensaje-exito" *ngIf="mostrarMensajeExito">
        <div class="exito-icon">✓</div>
        <h2>¡Caso Registrado Exitosamente!</h2>
        <p>Gracias por registrar su caso. Estaremos comunicándonos con usted cuando tengamos novedades sobre su caso.</p>
        <p class="numero-caso">Número de expediente: <strong>{{numeroExpediente}}</strong></p>
        <button (click)="volverLogin()" class="btn-volver">Volver al Inicio</button>
      </div>
    </div>
  `,
  styles: [`
    .registro-publico-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0EA6F1 0%, #568FDD 100%);
      padding: 40px 20px;
    }

    .registro-header {
      text-align: center;
      margin-bottom: 30px;
      color: white;
    }

    .logo {
      max-width: 180px;
      height: auto;
      margin-bottom: 20px;
    }

    .registro-header h1 {
      font-size: 2rem;
      margin: 0 0 10px 0;
      font-weight: 600;
    }

    .registro-header p {
      font-size: 1rem;
      margin: 0;
    }

    .registro-card {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .form-section {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid #f1f5f9;
    }

    .form-section:last-of-type {
      border-bottom: none;
    }

    .form-section h3 {
      font-size: 18px;
      color: #1e293b;
      margin-bottom: 20px;
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

    .form-group.full-width {
      grid-column: 1 / -1;
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

    .form-group input:disabled,
    .form-group select:disabled {
      background-color: #f1f5f9;
      cursor: not-allowed;
      color: #94a3b8;
    }

    .form-group textarea {
      resize: vertical;
      font-family: inherit;
    }

    .help-text {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 4px;
      font-style: italic;
    }

    .text-warning {
      color: #f59e0b;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    .form-actions-inline {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }

    .btn-primary,
    .btn-secondary,
    .btn-add,
    .btn-volver {
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

    .btn-add {
      padding: 10px 20px;
      background: #10b981;
      color: white;
    }

    .btn-add:hover {
      background: #059669;
    }

    .btn-volver {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-top: 20px;
    }

    .btn-volver:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .ipress-list {
      margin-top: 24px;
    }

    .ipress-list h4 {
      font-size: 16px;
      color: #1e293b;
      margin-bottom: 16px;
    }

    .ipress-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
    }

    .ipress-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
    }

    .ipress-title {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .ipress-title strong {
      font-size: 15px;
      color: #1e293b;
    }

    .ipress-badge {
      display: inline-block;
      padding: 4px 12px;
      background: #dbeafe;
      color: #1e40af;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      width: fit-content;
    }

    .btn-remove {
      padding: 6px 10px;
      background: #fee2e2;
      color: #dc2626;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-remove:hover {
      background: #fecaca;
    }

    .ipress-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 12px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-label {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .detail-item span:not(.detail-label) {
      font-size: 14px;
      color: #1e293b;
    }

    .mensaje-exito {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 60px 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
    }

    .exito-icon {
      width: 80px;
      height: 80px;
      background: #10b981;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      margin: 0 auto 24px;
    }

    .mensaje-exito h2 {
      font-size: 28px;
      color: #1e293b;
      margin-bottom: 16px;
    }

    .mensaje-exito p {
      font-size: 16px;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .numero-caso {
      font-size: 18px;
      color: #1e293b;
      margin-top: 24px;
    }

    .numero-caso strong {
      color: #3b82f6;
    }

    @media (max-width: 768px) {
      .registro-card {
        padding: 30px 20px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .ipress-details {
        grid-template-columns: 1fr;
      }

      .registro-header h1 {
        font-size: 1.5rem;
      }

      .mensaje-exito {
        padding: 40px 20px;
      }
    }
  `]
})
export class RegistroPublicoCasoComponent implements OnInit {
  private casoRepository = inject(CasoRepository);
  private ubigeoRepository = inject(UbigeoRepository);
  private ipressRepository = inject(IpressRepository);
  private router = inject(Router);

  // Listas de ubigeo para solicitante
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];

  // Valores seleccionados para solicitante
  departamentoSeleccionado = '';
  provinciaSeleccionada = '';
  distritoSeleccionado = '';

  // Listas de ubigeo para afectado
  provinciasAfectado: Provincia[] = [];
  distritosAfectado: Distrito[] = [];

  // Valores seleccionados para afectado
  departamentoAfectado = '';
  provinciaAfectado = '';
  distritoAfectado = '';

  // Listas de ubigeo para IPRESS
  provinciasIpress: Provincia[] = [];
  distritosIpress: Distrito[] = [];

  // Valores seleccionados para IPRESS
  departamentoIpress = '';
  provinciaIpress = '';
  distritoIpress = '';

  // IPRESS
  establecimientosDisponibles: Ipress[] = [];
  establecimientosAgregados: Ipress[] = [];
  ipressSeleccionado = '';

  // Control de UI
  mostrarMensajeExito = false;
  isSubmitting = false;
  numeroExpediente = '';

  caso: any = {
    tipoSolicitud: TipoSolicitud.CONSULTA,
    severidad: Severidad.LEVE, // Valor por defecto, será asignado por especialista
    estado: EstadoCaso.INGRESADO,
    canalIngreso: 'Página web', // Auto-asignado
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
    afectado: {
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      fechaNacimiento: new Date(),
      numeroHistoriaClinica: '',
      tipoSeguro: 'ESSALUD',
      correoElectronico: '',
      telefono: '',
      direccion: '',
      departamento: '',
      provincia: '',
      distrito: '',
      genero: 'Masculino'
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

  ngOnInit() {
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    this.ubigeoRepository.obtenerDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    });
  }

  // Métodos para Solicitante
  onDepartamentoChange() {
    this.provinciaSeleccionada = '';
    this.distritoSeleccionado = '';
    this.provincias = [];
    this.distritos = [];
    this.caso.solicitante.provincia = '';
    this.caso.solicitante.distrito = '';

    if (this.departamentoSeleccionado) {
      const dept = this.departamentos.find(d => d.codigo === this.departamentoSeleccionado);
      if (dept) {
        this.caso.solicitante.departamento = dept.nombre;
      }

      this.ubigeoRepository.obtenerProvinciasPorDepartamento(this.departamentoSeleccionado)
        .subscribe(provincias => {
          this.provincias = provincias;
        });
    } else {
      this.caso.solicitante.departamento = '';
    }
  }

  onProvinciaChange() {
    this.distritoSeleccionado = '';
    this.distritos = [];
    this.caso.solicitante.distrito = '';

    if (this.provinciaSeleccionada) {
      const prov = this.provincias.find(p => p.codigo === this.provinciaSeleccionada);
      if (prov) {
        this.caso.solicitante.provincia = prov.nombre;
      }

      this.ubigeoRepository.obtenerDistritosPorProvincia(
        this.departamentoSeleccionado,
        this.provinciaSeleccionada
      ).subscribe(distritos => {
        this.distritos = distritos;
      });
    } else {
      this.caso.solicitante.provincia = '';
    }
  }

  onDistritoChange() {
    if (this.distritoSeleccionado) {
      const dist = this.distritos.find(d => d.codigo === this.distritoSeleccionado);
      if (dist) {
        this.caso.solicitante.distrito = dist.nombre;
      }
    } else {
      this.caso.solicitante.distrito = '';
    }
  }

  // Métodos para Afectado
  onDepartamentoAfectadoChange() {
    this.provinciaAfectado = '';
    this.distritoAfectado = '';
    this.provinciasAfectado = [];
    this.distritosAfectado = [];
    this.caso.afectado.provincia = '';
    this.caso.afectado.distrito = '';

    if (this.departamentoAfectado) {
      const dept = this.departamentos.find(d => d.codigo === this.departamentoAfectado);
      if (dept) {
        this.caso.afectado.departamento = dept.nombre;
      }

      this.ubigeoRepository.obtenerProvinciasPorDepartamento(this.departamentoAfectado)
        .subscribe(provincias => {
          this.provinciasAfectado = provincias;
        });
    } else {
      this.caso.afectado.departamento = '';
    }
  }

  onProvinciaAfectadoChange() {
    this.distritoAfectado = '';
    this.distritosAfectado = [];
    this.caso.afectado.distrito = '';

    if (this.provinciaAfectado) {
      const prov = this.provinciasAfectado.find(p => p.codigo === this.provinciaAfectado);
      if (prov) {
        this.caso.afectado.provincia = prov.nombre;
      }

      this.ubigeoRepository.obtenerDistritosPorProvincia(
        this.departamentoAfectado,
        this.provinciaAfectado
      ).subscribe(distritos => {
        this.distritosAfectado = distritos;
      });
    } else {
      this.caso.afectado.provincia = '';
    }
  }

  onDistritoAfectadoChange() {
    if (this.distritoAfectado) {
      const dist = this.distritosAfectado.find(d => d.codigo === this.distritoAfectado);
      if (dist) {
        this.caso.afectado.distrito = dist.nombre;
      }
    } else {
      this.caso.afectado.distrito = '';
    }
  }

  // Métodos para IPRESS
  onDepartamentoIpressChange() {
    this.provinciaIpress = '';
    this.distritoIpress = '';
    this.provinciasIpress = [];
    this.distritosIpress = [];
    this.establecimientosDisponibles = [];
    this.ipressSeleccionado = '';

    if (this.departamentoIpress) {
      this.ubigeoRepository.obtenerProvinciasPorDepartamento(this.departamentoIpress)
        .subscribe(provincias => {
          this.provinciasIpress = provincias;
        });
    }
  }

  onProvinciaIpressChange() {
    this.distritoIpress = '';
    this.distritosIpress = [];
    this.establecimientosDisponibles = [];
    this.ipressSeleccionado = '';

    if (this.provinciaIpress) {
      this.ubigeoRepository.obtenerDistritosPorProvincia(
        this.departamentoIpress,
        this.provinciaIpress
      ).subscribe(distritos => {
        this.distritosIpress = distritos;
      });
    }
  }

  onDistritoIpressChange() {
    this.establecimientosDisponibles = [];
    this.ipressSeleccionado = '';

    if (this.distritoIpress) {
      this.ipressRepository.obtenerPorUbigeo(this.distritoIpress)
        .subscribe(establecimientos => {
          this.establecimientosDisponibles = establecimientos;
        });
    }
  }

  agregarIpress() {
    if (!this.ipressSeleccionado) {
      return;
    }

    const ipress = this.establecimientosDisponibles.find(
      i => i.codigoUnico === this.ipressSeleccionado
    );

    if (ipress) {
      const yaAgregado = this.establecimientosAgregados.some(
        i => i.codigoUnico === ipress.codigoUnico
      );

      if (!yaAgregado) {
        this.establecimientosAgregados.push(ipress);
        this.ipressSeleccionado = '';
      } else {
        alert('Este establecimiento ya ha sido agregado');
      }
    }
  }

  eliminarIpress(index: number) {
    this.establecimientosAgregados.splice(index, 1);
  }

  guardar() {
    this.isSubmitting = true;
    
    const numeroCaso = Math.floor(Math.random() * 90000) + 10000;
    this.numeroExpediente = `${numeroCaso}-2026`;
    this.caso.numeroExpediente = this.numeroExpediente;
    
    // Agregar establecimientos involucrados
    this.caso.establecimientosInvolucrados = this.establecimientosAgregados.map(ipress => ({
      codigoUnico: ipress.codigoUnico,
      nombre: ipress.nombre,
      clasificacion: ipress.clasificacion,
      tipo: ipress.tipo,
      institucion: ipress.institucion,
      departamento: ipress.departamento,
      provincia: ipress.provincia,
      distrito: ipress.distrito,
      ubigeo: ipress.ubigeo,
      direccion: ipress.direccion,
      categoria: ipress.categoria,
      telefono: ipress.telefono
    }));
    
    this.casoRepository.crear(this.caso).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.mostrarMensajeExito = true;
      },
      error: (error) => {
        console.error('Error al registrar caso:', error);
        alert('Ocurrió un error al registrar el caso. Por favor, intente nuevamente.');
        this.isSubmitting = false;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/login']);
  }

  volverLogin() {
    this.router.navigate(['/login']);
  }
}
