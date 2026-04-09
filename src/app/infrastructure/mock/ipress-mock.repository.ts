import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IpressRepository } from '@domain/ports/ipress.repository';
import { Ipress } from '@domain/models/ipress.model';
import { IPRESS_DATA } from './ipress-data';

@Injectable({
  providedIn: 'root'
})
export class IpressMockRepository extends IpressRepository {
  
  obtenerTodos(): Observable<Ipress[]> {
    const establecimientos = IPRESS_DATA
      .filter(item => item.estado === 'ACTIVO')
      .map(item => this.mapToIpress(item))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    return of(establecimientos);
  }

  obtenerPorUbigeo(ubigeo: string): Observable<Ipress[]> {
    const establecimientos = IPRESS_DATA
      .filter(item => item.ubigeo === ubigeo && item.estado === 'ACTIVO')
      .map(item => this.mapToIpress(item))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    return of(establecimientos);
  }

  buscarPorNombre(nombre: string, ubigeo?: string): Observable<Ipress[]> {
    const nombreLower = nombre.toLowerCase();
    
    let filtered = IPRESS_DATA.filter(item => 
      item.nombreEstablecimiento.toLowerCase().includes(nombreLower) &&
      item.estado === 'ACTIVO'
    );

    if (ubigeo) {
      filtered = filtered.filter(item => item.ubigeo === ubigeo);
    }

    const establecimientos = filtered
      .map(item => this.mapToIpress(item))
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .slice(0, 50); // Limitar a 50 resultados
    
    return of(establecimientos);
  }

  private mapToIpress(data: any): Ipress {
    return {
      codigoUnico: data.codigoUnico,
      nombre: data.nombreEstablecimiento,
      clasificacion: data.clasificacion,
      tipo: data.tipo,
      institucion: data.institucion,
      departamento: data.departamento,
      provincia: data.provincia,
      distrito: data.distrito,
      ubigeo: data.ubigeo,
      direccion: data.direccion,
      categoria: data.categoria,
      telefono: data.telefono,
      estado: data.estado,
      norte: data.norte,
      este: data.este,
      ruc: data.ruc
    };
  }
}
