import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UbigeoRepository } from '@domain/ports/ubigeo.repository';
import { Departamento, Provincia, Distrito } from '@domain/models/ubigeo.model';
import { UBIGEO_DATA } from './ubigeo-data';

@Injectable({
  providedIn: 'root'
})
export class UbigeoMockRepository extends UbigeoRepository {
  
  obtenerDepartamentos(): Observable<Departamento[]> {
    const departamentosMap = new Map<string, Departamento>();
    
    UBIGEO_DATA.forEach(item => {
      // Código de departamento: 2 dígitos
      const codigoDept = item.codigoUbigeo.substring(0, 2);
      
      if (!departamentosMap.has(codigoDept)) {
        departamentosMap.set(codigoDept, {
          codigo: codigoDept,
          nombre: item.nombreDepartamento
        });
      }
    });
    
    const departamentos = Array.from(departamentosMap.values())
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    return of(departamentos);
  }

  obtenerProvinciasPorDepartamento(codigoDepartamento: string): Observable<Provincia[]> {
    const provinciasMap = new Map<string, Provincia>();
    
    UBIGEO_DATA
      .filter(item => item.codigoUbigeo.substring(0, 2) === codigoDepartamento)
      .forEach(item => {
        // Código referencial de provincia: 4 dígitos (2 dept + 2 prov)
        const codigoProv = item.codigoUbigeo.substring(0, 4);
        
        if (!provinciasMap.has(codigoProv)) {
          provinciasMap.set(codigoProv, {
            codigo: codigoProv,
            nombre: item.nombreProvincia,
            codigoDepartamento: codigoDepartamento
          });
        }
      });
    
    const provincias = Array.from(provinciasMap.values())
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    return of(provincias);
  }

  obtenerDistritosPorProvincia(codigoDepartamento: string, codigoProvincia: string): Observable<Distrito[]> {
    // codigoProvincia ya viene con 4 dígitos (2 dept + 2 prov)
    const distritos = UBIGEO_DATA
      .filter(item => item.codigoUbigeo.substring(0, 4) === codigoProvincia)
      .map(item => ({
        codigo: item.codigoUbigeo, // 6 dígitos completos
        nombre: item.nombreDistrito,
        codigoProvincia: codigoProvincia,
        codigoDepartamento: codigoDepartamento,
        codigoUbigeo: item.codigoUbigeo
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    return of(distritos);
  }
}
