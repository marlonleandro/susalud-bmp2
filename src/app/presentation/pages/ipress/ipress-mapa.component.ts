import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IpressRepository } from '@domain/ports/ipress.repository';
import { UbigeoRepository } from '@domain/ports/ubigeo.repository';
import { Ipress } from '@domain/models/ipress.model';
import { Departamento, Provincia, Distrito } from '@domain/models/ubigeo.model';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';

MapModule(Highcharts);

@Component({
  selector: 'app-ipress-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Mapa de Establecimientos de Salud (IPRESS)</h2>
      <div class="content">
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
          <div class="stats">{{ipressFiltered.length}} establecimientos</div>
        </div>
        <div class="layout">
          <div class="list">
            <div *ngIf="ipressFiltered.length === 0" class="empty">No se encontraron establecimientos</div>
            <div *ngFor="let i of ipressFiltered.slice(0, 100)" class="card">
              <h4>{{i.nombre}}</h4>
              <p><strong>Tipo:</strong> {{i.tipo}}</p>
              <p><strong>Categoría:</strong> {{i.categoria}}</p>
              <p><strong>Ubicación:</strong> {{i.distrito}}, {{i.provincia}}, {{i.departamento}}</p>
            </div>
          </div>
          <div class="map">
            <div id="mapContainer" style="height: 600px;"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    h2 { color: #1e3a8a; margin-bottom: 1.5rem; }
    .content { background: white; border-radius: 8px; padding: 1.5rem; }
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
    .card { padding: 1rem; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.75rem; cursor: pointer; transition: all 0.2s; }
    .card:hover { border-color: #3b82f6; background: #eff6ff; transform: translateX(4px); }
    .card h4 { margin: 0 0 0.5rem 0; color: #1e3a8a; font-size: 0.95rem; }
    .card p { margin: 0.25rem 0; font-size: 0.85rem; color: #6b7280; }
    .card p strong { color: #374151; }
    .map { flex: 1; }
  `]
})
export class IpressMapaComponent implements OnInit, AfterViewInit {
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  selectedDept: string = '';
  selectedProv: string = '';
  selectedDist: string = '';
  ipressList: Ipress[] = [];
  ipressFiltered: Ipress[] = [];

  // Mapeo de código UBIGEO (2 dígitos) a clave hc-key del mapa
  private deptCodeToHcKey: any = {
    '01':'pe-am', '02':'pe-an', '03':'pe-ap', '04':'pe-ar', '05':'pe-ay',
    '06':'pe-cj', '07':'pe-cl', '08':'pe-cs', '09':'pe-hv', '10':'pe-hc',
    '11':'pe-ic', '12':'pe-ju', '13':'pe-ll', '14':'pe-lb', '15':'pe-lr',
    '16':'pe-lo', '17':'pe-md', '18':'pe-mq', '19':'pe-pa', '20':'pe-pi',
    '21':'pe-pu', '22':'pe-sm', '23':'pe-ta', '24':'pe-tu', '25':'pe-uc'
  };

  // Mapeo inverso: de hc-key a código UBIGEO
  private hcKeyToDeptCode: any = {
    'pe-am':'01', 'pe-an':'02', 'pe-ap':'03', 'pe-ar':'04', 'pe-ay':'05',
    'pe-cj':'06', 'pe-cl':'07', 'pe-cs':'08', 'pe-hv':'09', 'pe-hc':'10',
    'pe-ic':'11', 'pe-ju':'12', 'pe-ll':'13', 'pe-lb':'14', 'pe-lr':'15',
    'pe-lo':'16', 'pe-md':'17', 'pe-mq':'18', 'pe-pa':'19', 'pe-pi':'20',
    'pe-pu':'21', 'pe-sm':'22', 'pe-ta':'23', 'pe-tu':'24', 'pe-uc':'25'
  };

  constructor(
    private ipressRepository: IpressRepository,
    private ubigeoRepository: UbigeoRepository
  ) {}

  ngOnInit(): void {
    this.ubigeoRepository.obtenerDepartamentos().subscribe(d => this.departamentos = d);
    this.ipressRepository.obtenerTodos().subscribe(i => {
      this.ipressList = i;
      this.ipressFiltered = i;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 1000);
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
    
    this.filterIpress();
  }

  onProvChange(): void {
    this.selectedDist = '';
    this.distritos = [];
    
    if (this.selectedProv) {
      this.ubigeoRepository.obtenerDistritosPorProvincia(this.selectedDept, this.selectedProv).subscribe(d => {
        this.distritos = d;
      });
    }
    
    this.filterIpress();
  }

  onDistChange(): void {
    this.filterIpress();
  }

  private filterIpress(): void {
    let filtered = this.ipressList;
    
    // Filtrar por distrito (más específico primero)
    if (this.selectedDist) {
      filtered = filtered.filter(i => i.ubigeo === this.selectedDist);
    }
    // Filtrar por provincia (si no hay distrito seleccionado)
    else if (this.selectedProv && this.provincias.length > 0) {
      const prov = this.provincias.find(p => p.codigo === this.selectedProv);
      if (prov) {
        // Filtrar por los primeros 4 dígitos del UBIGEO (departamento + provincia)
        filtered = filtered.filter(i => i.ubigeo && i.ubigeo.substring(0, 4) === this.selectedProv);
      }
    }
    // Filtrar por departamento (si no hay provincia ni distrito seleccionado)
    else if (this.selectedDept) {
      // Filtrar por los primeros 2 dígitos del UBIGEO (departamento)
      filtered = filtered.filter(i => i.ubigeo && i.ubigeo.substring(0, 2) === this.selectedDept);
    }
    
    this.ipressFiltered = filtered;
  }

  private initMap(): void {
    import('@highcharts/map-collection/countries/pe/pe-all.geo.json').then((t: any) => {
      Highcharts.mapChart('mapContainer', {
        chart: { map: t.default || t },
        title: { text: 'Perú - IPRESS por Departamento' },
        mapNavigation: { enabled: true },
        colorAxis: { min: 0 },
        series: [{
          type: 'map',
          name: 'Establecimientos',
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
    // Contar IPRESS por código de departamento (primeros 2 dígitos del UBIGEO)
    const countByDeptCode = new Map<string, number>();
    
    this.ipressList.forEach(i => {
      if (i.ubigeo && i.ubigeo.length >= 2) {
        const deptCode = i.ubigeo.substring(0, 2);
        countByDeptCode.set(deptCode, (countByDeptCode.get(deptCode) || 0) + 1);
      }
    });
    
    // Convertir a formato de datos para Highcharts usando hc-key
    const data: any[] = [];
    countByDeptCode.forEach((count, deptCode) => {
      const hcKey = this.deptCodeToHcKey[deptCode];
      if (hcKey) {
        data.push([hcKey, count]);
      } else {
        console.warn(`Código de departamento sin mapeo: "${deptCode}" (${count} establecimientos)`);
      }
    });
    
    return data;
  }
}
