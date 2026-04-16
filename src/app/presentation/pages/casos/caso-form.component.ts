import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CasoRepository } from '@domain/ports/caso.repository';
import { UbigeoRepository } from '@domain/ports/ubigeo.repository';
import { IpressRepository } from '@domain/ports/ipress.repository';
import { EspecialistaRepository } from '@domain/ports/especialista.repository';
import { Caso, TipoSolicitud, Severidad, EstadoCaso } from '@domain/models/caso.model';
import { Departamento, Provincia, Distrito } from '@domain/models/ubigeo.model';
import { Ipress } from '@domain/models/ipress.model';
import { Especialista } from '@domain/models/especialista.model';

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
              <small *ngIf="!departamentoSeleccionado" class="help-text">
                Primero seleccione un departamento
              </small>
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
              <small *ngIf="!provinciaSeleccionada" class="help-text">
                Primero seleccione una provincia
              </small>
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
              <small *ngIf="!departamentoAfectado" class="help-text">
                Primero seleccione un departamento
              </small>
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
              <small *ngIf="!provinciaAfectado" class="help-text">
                Primero seleccione una provincia
              </small>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Asignación de Especialista</h3>
          
          <div class="form-row">
            <div class="form-group full-width">
              <label>Especialista Asignado</label>
              <select [(ngModel)]="especialistaSeleccionado" name="especialistaAsignado">
                <option value="">Sin asignar</option>
                <option *ngFor="let esp of especialistas" [value]="esp.id">
                  {{esp.nombres}} {{esp.apellidoPaterno}} {{esp.apellidoMaterno}} - {{esp.especialidad}}
                </option>
              </select>
              <small class="help-text">
                Seleccione un especialista para asignar este caso (opcional)
              </small>
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
              <small *ngIf="!departamentoIpress" class="help-text">
                Primero seleccione un departamento
              </small>
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
              <small *ngIf="!provinciaIpress" class="help-text">
                Primero seleccione una provincia
              </small>
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
              <small *ngIf="establecimientosDisponibles.length" class="help-text">
                {{establecimientosDisponibles.length}} establecimiento(s) disponible(s)
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
                  <span class="detail-label">Código:</span>
                  <span>{{ipress.codigoUnico}}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Clasificación:</span>
                  <span>{{ipress.clasificacion}}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Categoría:</span>
                  <span>{{ipress.categoria}}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Ubicación:</span>
                  <span>{{ipress.distrito}}, {{ipress.provincia}}, {{ipress.departamento}}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Dirección:</span>
                  <span>{{ipress.direccion}}</span>
                </div>
                <div class="detail-item" *ngIf="ipress.telefono">
                  <span class="detail-label">Teléfono:</span>
                  <span>{{ipress.telefono}}</span>
                </div>
              </div>
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

    .full-width {
      grid-column: 1 / -1;
    }

    .form-actions-inline {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }

    .btn-add {
      padding: 10px 20px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-add:hover {
      background: #059669;
    }

    .text-warning {
      color: #f59e0b;
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

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .ipress-details {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CasoFormComponent implements OnInit {
  private casoRepository = inject(CasoRepository);
  private ubigeoRepository = inject(UbigeoRepository);
  private ipressRepository = inject(IpressRepository);
  private especialistaRepository = inject(EspecialistaRepository);
  private router = inject(Router);

  // Listas de especialistas
  especialistas: Especialista[] = [];
  especialistaSeleccionado = '';

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
    this.cargarEspecialistas();
  }

  cargarDepartamentos() {
    this.ubigeoRepository.obtenerDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    });
  }

  cargarEspecialistas() {
    this.especialistaRepository.obtenerActivos().subscribe(especialistas => {
      this.especialistas = especialistas;
    });
  }

  onDepartamentoChange() {
    // Limpiar selecciones dependientes
    this.provinciaSeleccionada = '';
    this.distritoSeleccionado = '';
    this.provincias = [];
    this.distritos = [];
    this.caso.solicitante.provincia = '';
    this.caso.solicitante.distrito = '';

    if (this.departamentoSeleccionado) {
      // Actualizar el nombre del departamento en el caso
      const dept = this.departamentos.find(d => d.codigo === this.departamentoSeleccionado);
      if (dept) {
        this.caso.solicitante.departamento = dept.nombre;
      }

      // Cargar provincias del departamento seleccionado
      this.ubigeoRepository.obtenerProvinciasPorDepartamento(this.departamentoSeleccionado)
        .subscribe(provincias => {
          this.provincias = provincias;
        });
    } else {
      this.caso.solicitante.departamento = '';
    }
  }

  onProvinciaChange() {
    // Limpiar selección de distrito
    this.distritoSeleccionado = '';
    this.distritos = [];
    this.caso.solicitante.distrito = '';

    if (this.provinciaSeleccionada) {
      // Actualizar el nombre de la provincia en el caso
      const prov = this.provincias.find(p => p.codigo === this.provinciaSeleccionada);
      if (prov) {
        this.caso.solicitante.provincia = prov.nombre;
      }

      // Cargar distritos de la provincia seleccionada
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
      // Actualizar el nombre del distrito en el caso
      const dist = this.distritos.find(d => d.codigo === this.distritoSeleccionado);
      if (dist) {
        this.caso.solicitante.distrito = dist.nombre;
      }
    } else {
      this.caso.solicitante.distrito = '';
    }
  }

  guardar() {
    const numeroCaso = Math.floor(Math.random() * 90000) + 10000;
    this.caso.numeroExpediente = `${numeroCaso}-2026`;
    
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

    // Agregar especialista asignado si fue seleccionado
    if (this.especialistaSeleccionado) {
      const especialista = this.especialistas.find(e => e.id === this.especialistaSeleccionado);
      if (especialista) {
        this.caso.especialistaAsignado = {
          id: especialista.id,
          nombres: especialista.nombres,
          apellidoPaterno: especialista.apellidoPaterno,
          apellidoMaterno: especialista.apellidoMaterno,
          especialidad: especialista.especialidad
        };
      }
    }
    
    this.casoRepository.crear(this.caso).subscribe(() => {
      alert('Caso registrado exitosamente');
      this.router.navigate(['/casos']);
    });
  }

  cancelar() {
    this.router.navigate(['/casos']);
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
      // Verificar que no esté ya agregado
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
}
