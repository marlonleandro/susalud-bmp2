import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasoRepository } from '@domain/ports/caso.repository';
import { UbigeoRepository } from '@domain/ports/ubigeo.repository';
import { Caso, TipoSolicitud, Severidad, EstadoCaso } from '@domain/models/caso.model';
import { Departamento, Provincia, Distrito } from '@domain/models/ubigeo.model';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';

MapModule(Highcharts);

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Reportería - Mapa de Casos</h2>
      
      <!-- Sección de Mapa -->
      <div class="content">
        <h3 class="section-title">Mapa Interactivo por Departamento</h3>
        <div class="filters">
          <div class="filter-group">
            <label>Departamento</label>
            <select [(ngModel)]="selectedDept" (change)="onDeptChange()">
              <option value="">Todos los departamentos</option>
              <option *ngFor="let d of departamentos" [value]="d.codigo">{{d.nombre}}</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Provincia</label>
            <select [(ngModel)]="selectedProv" (change)="onProvChange()" [disabled]="!selectedDept">
              <option value="">Todas las provincias</option>
              <option *ngFor="let p of provincias" [value]="p.codigo">{{p.nombre}}</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Distrito</label>
            <select [(ngModel)]="selectedDist" (change)="onDistChange()" [disabled]="!selectedProv">
              <option value="">Todos los distritos</option>
              <option *ngFor="let d of distritos" [value]="d.codigoUbigeo">{{d.nombre}}</option>
            </select>
          </div>
          <div class="stats">{{casosFiltered.length}} casos</div>
        </div>
        <div class="layout">
          <div class="list">
            <div *ngIf="casosFiltered.length === 0" class="empty">No se encontraron casos</div>
            <div *ngFor="let c of casosFiltered.slice(0, 100)" class="card">
              <div class="card-header">
                <h4>{{c.solicitante.nombres}} {{c.solicitante.apellidoPaterno}} {{c.solicitante.apellidoMaterno}}</h4>
                <span class="badge" [class.consulta]="c.tipoSolicitud === 'CONSULTA'" [class.denuncia]="c.tipoSolicitud === 'DENUNCIA'">
                  {{c.tipoSolicitud}}
                </span>
              </div>
              <p><strong>Fecha:</strong> {{c.fechaRegistro | date:'dd/MM/yyyy'}}</p>
              <p><strong>Expediente:</strong> {{c.numeroExpediente}}</p>
              <p><strong>Ubicación:</strong> {{c.solicitante.distrito}}, {{c.solicitante.provincia}}, {{c.solicitante.departamento}}</p>
              <div *ngIf="c.establecimientosInvolucrados && c.establecimientosInvolucrados.length > 0" class="establecimientos">
                <strong>Establecimientos:</strong>
                <ul>
                  <li *ngFor="let est of c.establecimientosInvolucrados">{{est.nombre}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="map">
            <div id="mapContainer" style="height: 600px;"></div>
          </div>
        </div>
      </div>

      <!-- Sección de Evolución Mensual -->
      <div class="content chart-section">
        <h3 class="section-title">Evolución de Casos por Mes ({{currentYear}})</h3>
        <div id="evolutionChart" style="height: 400px;"></div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    h2 { color: #1e3a8a; margin-bottom: 1.5rem; }
    .content { background: white; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; }
    .section-title { color: #1e3a8a; font-size: 1.1rem; margin: 0 0 1rem 0; font-weight: 600; }
    .chart-section { padding: 2rem; }
    .filters { margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap; }
    .filter-group { display: flex; flex-direction: column; }
    .filter-group label { font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 0.25rem; }
    select { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px; min-width: 180px; }
    select:disabled { background: #f3f4f6; cursor: not-allowed; }
    select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
    .stats { padding: 0.5rem 1rem; background: #dbeafe; color: #1e40af; border-radius: 6px; font-weight: 600; }
    .layout { display: flex; gap: 1.5rem; }
    .list { width: 400px; max-height: 600px; overflow-y: auto; }
    .empty { padding: 2rem; text-align: center; color: #9ca3af; }
    .card { padding: 1rem; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.75rem; transition: all 0.2s; }
    .card:hover { border-color: #3b82f6; background: #eff6ff; transform: translateX(4px); }
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; gap: 0.5rem; }
    .card h4 { margin: 0; color: #1e3a8a; font-size: 0.95rem; }
    .badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; }
    .badge.consulta { background: #dbeafe; color: #1e40af; }
    .badge.denuncia { background: #fee2e2; color: #991b1b; }
    .card p { margin: 0.25rem 0; font-size: 0.85rem; color: #6b7280; }
    .card p strong { color: #374151; }
    .establecimientos { margin-top: 0.5rem; font-size: 0.85rem; }
    .establecimientos strong { color: #374151; }
    .establecimientos ul { margin: 0.25rem 0 0 0; padding-left: 1.5rem; color: #6b7280; }
    .establecimientos li { margin: 0.125rem 0; }
    .map { flex: 1; }
  `]
})
export class ReportesComponent implements OnInit, AfterViewInit {
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  selectedDept: string = '';
  selectedProv: string = '';
  selectedDist: string = '';
  casosList: Caso[] = [];
  casosFiltered: Caso[] = [];
  currentYear: number = new Date().getFullYear();

  // Mapeo de código UBIGEO (2 dígitos) a clave hc-key del mapa
  private deptCodeToHcKey: any = {
    '01':'pe-am', '02':'pe-an', '03':'pe-ap', '04':'pe-ar', '05':'pe-ay',
    '06':'pe-cj', '07':'pe-cl', '08':'pe-cs', '09':'pe-hv', '10':'pe-hc',
    '11':'pe-ic', '12':'pe-ju', '13':'pe-ll', '14':'pe-lb', '15':'pe-lp',
    '16':'pe-lo', '17':'pe-md', '18':'pe-mq', '19':'pe-pa', '20':'pe-pi',
    '21':'pe-pu', '22':'pe-sm', '23':'pe-ta', '24':'pe-tu', '25':'pe-uc'
  };

  // Mapeo inverso: de hc-key a código UBIGEO
  private hcKeyToDeptCode: any = {
    'pe-am':'01', 'pe-an':'02', 'pe-ap':'03', 'pe-ar':'04', 'pe-ay':'05',
    'pe-cj':'06', 'pe-cl':'07', 'pe-cs':'08', 'pe-hv':'09', 'pe-hc':'10',
    'pe-ic':'11', 'pe-ju':'12', 'pe-ll':'13', 'pe-lb':'14', 'pe-lp':'15',
    'pe-lo':'16', 'pe-md':'17', 'pe-mq':'18', 'pe-pa':'19', 'pe-pi':'20',
    'pe-pu':'21', 'pe-sm':'22', 'pe-ta':'23', 'pe-tu':'24', 'pe-uc':'25'
  };

  constructor(
    private casoRepository: CasoRepository,
    private ubigeoRepository: UbigeoRepository
  ) {}

  ngOnInit(): void {
    this.ubigeoRepository.obtenerDepartamentos().subscribe(d => this.departamentos = d);
    this.casoRepository.obtenerTodos().subscribe(c => {
      this.casosList = c;
      this.casosFiltered = c;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
      this.initEvolutionChart();
    }, 1000);
  }

  onDeptChange(): void {
    this.selectedProv = '';
    this.selectedDist = '';
    this.provincias = [];
    this.distritos = [];
    
    if (this.selectedDept) {
      this.ubigeoRepository.obtenerProvinciasPorDepartamento(this.selectedDept).subscribe(p => {
        this.provincias = p;
      });
    }
    
    this.filterCasos();
  }

  onProvChange(): void {
    this.selectedDist = '';
    this.distritos = [];
    
    if (this.selectedProv) {
      this.ubigeoRepository.obtenerDistritosPorProvincia(this.selectedDept, this.selectedProv).subscribe(d => {
        this.distritos = d;
      });
    }
    
    this.filterCasos();
  }

  onDistChange(): void {
    this.filterCasos();
  }

  private filterCasos(): void {
    let filtered = this.casosList;
    
    // Filtrar por distrito (más específico primero)
    if (this.selectedDist) {
      filtered = filtered.filter(c => {
        // Buscar en solicitante
        const solicitanteMatch = c.solicitante.distrito && 
          this.distritos.some(d => d.nombre.toUpperCase() === c.solicitante.distrito.toUpperCase() && d.codigoUbigeo === this.selectedDist);
        return solicitanteMatch;
      });
    }
    // Filtrar por provincia (si no hay distrito seleccionado)
    else if (this.selectedProv && this.provincias.length > 0) {
      const prov = this.provincias.find(p => p.codigo === this.selectedProv);
      if (prov) {
        filtered = filtered.filter(c => 
          c.solicitante.provincia && c.solicitante.provincia.toUpperCase().includes(prov.nombre.toUpperCase())
        );
      }
    }
    // Filtrar por departamento (si no hay provincia ni distrito seleccionado)
    else if (this.selectedDept) {
      const dept = this.departamentos.find(d => d.codigo === this.selectedDept);
      if (dept) {
        filtered = filtered.filter(c => 
          c.solicitante.departamento && c.solicitante.departamento.toUpperCase() === dept.nombre.toUpperCase()
        );
      }
    }
    
    this.casosFiltered = filtered;
  }

  private initMap(): void {
    import('@highcharts/map-collection/countries/pe/pe-all.geo.json').then((t: any) => {
      Highcharts.mapChart('mapContainer', {
        chart: { map: t.default || t },
        title: { text: 'Perú - Casos por Departamento' },
        mapNavigation: { enabled: true },
        colorAxis: { min: 0 },
        series: [{
          type: 'map',
          name: 'Casos',
          data: this.getMapData(),
          states: {
            hover: {
              color: '#0EA6F1'
            }
          },
          dataLabels: { 
            enabled: true, 
            format: '{point.name}'
          },
          point: {
            events: {
              click: (e: any) => {
                const hcKey = e.point['hc-key'];
                this.selectedDept = this.hcKeyToDeptCode[hcKey] || '';
                this.onDeptChange();
              }
            }
          }
        }] as any
      });
    });
  }

  private getMapData(): any[] {
    // Contar casos por código de departamento del solicitante
    const countByDeptCode = new Map<string, number>();
    
    this.casosList.forEach(c => {
      // Buscar el código de departamento por nombre
      const dept = this.departamentos.find(d => 
        d.nombre.toUpperCase() === c.solicitante.departamento.toUpperCase()
      );
      
      if (dept) {
        countByDeptCode.set(dept.codigo, (countByDeptCode.get(dept.codigo) || 0) + 1);
      }
    });
    
    // Convertir a formato de datos para Highcharts usando hc-key
    const data: any[] = [];
    countByDeptCode.forEach((count, deptCode) => {
      const hcKey = this.deptCodeToHcKey[deptCode];
      if (hcKey) {
        data.push([hcKey, count]);
      }
    });
    
    return data;
  }

  private initEvolutionChart(): void {
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    // Filtrar casos del año actual
    const casosDelAnio = this.casosList.filter(c => {
      const year = new Date(c.fechaRegistro).getFullYear();
      return year === this.currentYear;
    });

    // Inicializar contadores por mes y severidad
    const dataLeve: number[] = new Array(12).fill(0);
    const dataModerado: number[] = new Array(12).fill(0);
    const dataSevero: number[] = new Array(12).fill(0);

    // Contar casos por mes y severidad
    casosDelAnio.forEach(c => {
      const month = new Date(c.fechaRegistro).getMonth();
      
      switch (c.severidad) {
        case Severidad.LEVE:
          dataLeve[month]++;
          break;
        case Severidad.MODERADO:
          dataModerado[month]++;
          break;
        case Severidad.SEVERO:
          dataSevero[month]++;
          break;
      }
    });

    Highcharts.chart('evolutionChart', {
      chart: {
        type: 'line'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: monthNames,
        title: {
          text: 'Mes'
        }
      },
      yAxis: {
        title: {
          text: 'Cantidad de Casos'
        },
        min: 0
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true,
          marker: {
            radius: 4
          }
        }
      },
      series: [{
        type: 'line',
        name: 'Leve',
        data: dataLeve,
        color: '#2ecc71',
        lineWidth: 3
      }, {
        type: 'line',
        name: 'Moderado',
        data: dataModerado,
        color: '#f39c12',
        lineWidth: 3
      }, {
        type: 'line',
        name: 'Severo',
        data: dataSevero,
        color: '#e74c3c',
        lineWidth: 3
      }],
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal'
      },
      credits: {
        enabled: false
      }
    } as any);
  }
}
