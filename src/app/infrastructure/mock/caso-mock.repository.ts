import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CasoRepository } from '@domain/ports/caso.repository';
import { Caso, TipoSolicitud, Severidad, EstadoCaso } from '@domain/models/caso.model';

@Injectable({
  providedIn: 'root'
})
export class CasoMockRepository extends CasoRepository {
  private casos: Caso[] = [
    {
      id: '1',
      numeroExpediente: '29736-2026',
      fechaRegistro: new Date('2026-04-03'),
      fechaRecepcion: new Date('2026-04-03'),
      canalIngreso: 'Página web',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.DENUNCIA,
      tipoDenuncia: 'Intermediación',
      competenciaSUSALUD: true,
      competenciaPROTT: false,
      huboSolicitud: true,
      severidad: Severidad.MODERADO,
      estado: EstadoCaso.EN_PROCESO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '43678624',
        nombres: 'YANETH',
        apellidoPaterno: 'SOLANO',
        apellidoMaterno: 'NUÑEZ',
        fechaNacimiento: new Date('1993-05-03'),
        genero: 'Femenino',
        direccion: 'AV SAN MARTIN 447 TABLADA DE LURIN 1ER ST',
        departamento: 'Lima',
        provincia: 'Lima',
        distrito: 'Villa María del Triunfo',
        telefono: '',
        correoElectronico: 'mosenelena1948@gmail.com'
      },
      descripcion: 'Solicitud de intermediación por atención médica',
      macroRegion: 'Macro Regional Lima',
      idSGD: 'SGD-2026-000186',
      diasTranscurridos: 6,
      diasRestantes: 19,
      alertaVencimiento: false
    },
    {
      id: '2',
      numeroExpediente: '29735-2026',
      fechaRegistro: new Date('2026-04-02'),
      fechaRecepcion: new Date('2026-04-02'),
      canalIngreso: 'Correo Electrónico',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.CONSULTA,
      competenciaSUSALUD: true,
      competenciaPROTT: false,
      huboSolicitud: false,
      severidad: Severidad.LEVE,
      estado: EstadoCaso.REGISTRADO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '09703229',
        nombres: 'MADELEINE',
        apellidoPaterno: 'ULLOA',
        apellidoMaterno: 'JIMENEZ',
        fechaNacimiento: new Date('1968-10-10'),
        genero: 'Femenino',
        direccion: 'Av. Universitaria 1801',
        departamento: 'Lima',
        provincia: 'Lima',
        distrito: 'San Miguel',
        telefono: '987654321',
        correoElectronico: 'madeleine.ulloa@gmail.com'
      },
      descripcion: 'Consulta sobre cobertura de seguro',
      macroRegion: 'Macro Regional Lima',
      diasTranscurridos: 7,
      diasRestantes: 18,
      alertaVencimiento: false
    },
    {
      id: '3',
      numeroExpediente: '29734-2026',
      fechaRegistro: new Date('2026-03-15'),
      fechaRecepcion: new Date('2026-03-15'),
      canalIngreso: 'Presencial',
      areaActual: 'Revisar informe de intervención',
      tipoSolicitud: TipoSolicitud.DENUNCIA,
      tipoDenuncia: 'Intermediación',
      competenciaSUSALUD: true,
      competenciaPROTT: true,
      huboSolicitud: true,
      severidad: Severidad.SEVERO,
      estado: EstadoCaso.PENDIENTE_INFORME,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '12345678',
        nombres: 'JUAN',
        apellidoPaterno: 'PEREZ',
        apellidoMaterno: 'GARCIA',
        fechaNacimiento: new Date('1985-06-15'),
        genero: 'Masculino',
        direccion: 'Jr. Los Olivos 234',
        departamento: 'Arequipa',
        provincia: 'Arequipa',
        distrito: 'Cercado',
        telefono: '954123456',
        correoElectronico: 'juan.perez@email.com'
      },
      descripcion: 'Denuncia por negligencia médica',
      macroRegion: 'Macro Regional Sur',
      idSGD: 'SGD-2026-000150',
      diasTranscurridos: 25,
      diasRestantes: 0,
      alertaVencimiento: true
    }
  ];

  obtenerTodos(): Observable<Caso[]> {
    return of(this.casos).pipe(delay(500));
  }

  obtenerPorId(id: string): Observable<Caso> {
    const caso = this.casos.find(c => c.id === id);
    return of(caso!).pipe(delay(300));
  }

  crear(caso: Caso): Observable<Caso> {
    const nuevoCaso = { ...caso, id: (this.casos.length + 1).toString() };
    this.casos.push(nuevoCaso);
    return of(nuevoCaso).pipe(delay(500));
  }

  actualizar(id: string, caso: Partial<Caso>): Observable<Caso> {
    const index = this.casos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.casos[index] = { ...this.casos[index], ...caso };
      return of(this.casos[index]).pipe(delay(500));
    }
    throw new Error('Caso no encontrado');
  }

  eliminar(id: string): Observable<void> {
    this.casos = this.casos.filter(c => c.id !== id);
    return of(void 0).pipe(delay(300));
  }

  buscar(filtros: any): Observable<Caso[]> {
    let resultado = [...this.casos];
    
    if (filtros.estado) {
      resultado = resultado.filter(c => c.estado === filtros.estado);
    }
    if (filtros.severidad) {
      resultado = resultado.filter(c => c.severidad === filtros.severidad);
    }
    if (filtros.tipoSolicitud) {
      resultado = resultado.filter(c => c.tipoSolicitud === filtros.tipoSolicitud);
    }
    
    return of(resultado).pipe(delay(400));
  }
}
