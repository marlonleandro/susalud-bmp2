import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { EspecialistaRepository } from '@domain/ports/especialista.repository';
import { Especialista } from '@domain/models/especialista.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaMockRepository extends EspecialistaRepository {
  private especialistas: Especialista[] = [
    {
      id: '1',
      tipoDocumento: 'DNI',
      numeroDocumento: '40123456',
      nombres: 'MARLON',
      apellidoPaterno: 'LEANDRO',
      apellidoMaterno: 'GARCIA',
      especialidad: 'Medicina General',
      fechaIngreso: new Date('2020-03-15'),
      activo: true,
      correoElectronico: 'marlon.leandro@susalud.gob.pe',
      telefono: '987654321',
      casosAsignados: 15
    },
    {
      id: '2',
      tipoDocumento: 'DNI',
      numeroDocumento: '41234567',
      nombres: 'CARMEN',
      apellidoPaterno: 'RODRIGUEZ',
      apellidoMaterno: 'SILVA',
      especialidad: 'Cardiología',
      fechaIngreso: new Date('2019-06-20'),
      activo: true,
      correoElectronico: 'carmen.rodriguez@susalud.gob.pe',
      telefono: '987654322',
      casosAsignados: 12
    },
    {
      id: '3',
      tipoDocumento: 'DNI',
      numeroDocumento: '42345678',
      nombres: 'JOSE',
      apellidoPaterno: 'MARTINEZ',
      apellidoMaterno: 'LOPEZ',
      especialidad: 'Pediatría',
      fechaIngreso: new Date('2021-01-10'),
      activo: true,
      correoElectronico: 'jose.martinez@susalud.gob.pe',
      telefono: '987654323',
      casosAsignados: 18
    },
    {
      id: '4',
      tipoDocumento: 'DNI',
      numeroDocumento: '43456789',
      nombres: 'MARIA',
      apellidoPaterno: 'GONZALES',
      apellidoMaterno: 'TORRES',
      especialidad: 'Ginecología',
      fechaIngreso: new Date('2018-09-05'),
      activo: true,
      correoElectronico: 'maria.gonzales@susalud.gob.pe',
      telefono: '987654324',
      casosAsignados: 10
    },
    {
      id: '5',
      tipoDocumento: 'DNI',
      numeroDocumento: '44567890',
      nombres: 'ROBERTO',
      apellidoPaterno: 'FERNANDEZ',
      apellidoMaterno: 'DIAZ',
      especialidad: 'Traumatología',
      fechaIngreso: new Date('2020-11-12'),
      activo: true,
      correoElectronico: 'roberto.fernandez@susalud.gob.pe',
      telefono: '987654325',
      casosAsignados: 14
    },
    {
      id: '6',
      tipoDocumento: 'DNI',
      numeroDocumento: '45678901',
      nombres: 'PATRICIA',
      apellidoPaterno: 'RAMIREZ',
      apellidoMaterno: 'CASTRO',
      especialidad: 'Neurología',
      fechaIngreso: new Date('2019-04-18'),
      activo: true,
      correoElectronico: 'patricia.ramirez@susalud.gob.pe',
      telefono: '987654326',
      casosAsignados: 8
    },
    {
      id: '7',
      tipoDocumento: 'DNI',
      numeroDocumento: '46789012',
      nombres: 'LUIS',
      apellidoPaterno: 'VARGAS',
      apellidoMaterno: 'MENDOZA',
      especialidad: 'Dermatología',
      fechaIngreso: new Date('2022-02-01'),
      activo: true,
      correoElectronico: 'luis.vargas@susalud.gob.pe',
      telefono: '987654327',
      casosAsignados: 11
    },
    {
      id: '8',
      tipoDocumento: 'DNI',
      numeroDocumento: '47890123',
      nombres: 'ANA',
      apellidoPaterno: 'FLORES',
      apellidoMaterno: 'QUISPE',
      especialidad: 'Oftalmología',
      fechaIngreso: new Date('2020-07-22'),
      activo: true,
      correoElectronico: 'ana.flores@susalud.gob.pe',
      telefono: '987654328',
      casosAsignados: 9
    },
    {
      id: '9',
      tipoDocumento: 'DNI',
      numeroDocumento: '48901234',
      nombres: 'CARLOS',
      apellidoPaterno: 'SANCHEZ',
      apellidoMaterno: 'ROJAS',
      especialidad: 'Psiquiatría',
      fechaIngreso: new Date('2021-05-30'),
      activo: true,
      correoElectronico: 'carlos.sanchez@susalud.gob.pe',
      telefono: '987654329',
      casosAsignados: 13
    },
    {
      id: '10',
      tipoDocumento: 'DNI',
      numeroDocumento: '49012345',
      nombres: 'ROSA',
      apellidoPaterno: 'CHAVEZ',
      apellidoMaterno: 'VEGA',
      especialidad: 'Oncología',
      fechaIngreso: new Date('2019-08-14'),
      activo: true,
      correoElectronico: 'rosa.chavez@susalud.gob.pe',
      telefono: '987654330',
      casosAsignados: 7
    },
    {
      id: '11',
      tipoDocumento: 'DNI',
      numeroDocumento: '50123456',
      nombres: 'MIGUEL',
      apellidoPaterno: 'CASTILLO',
      apellidoMaterno: 'MORALES',
      especialidad: 'Cirugía General',
      fechaIngreso: new Date('2018-12-03'),
      activo: true,
      correoElectronico: 'miguel.castillo@susalud.gob.pe',
      telefono: '987654331',
      casosAsignados: 16
    },
    {
      id: '12',
      tipoDocumento: 'DNI',
      numeroDocumento: '51234567',
      nombres: 'ELENA',
      apellidoPaterno: 'PAREDES',
      apellidoMaterno: 'GUTIERREZ',
      especialidad: 'Medicina Interna',
      fechaIngreso: new Date('2021-10-25'),
      activo: true,
      correoElectronico: 'elena.paredes@susalud.gob.pe',
      telefono: '987654332',
      casosAsignados: 10
    }
  ];

  obtenerTodos(): Observable<Especialista[]> {
    return of(this.especialistas).pipe(delay(300));
  }

  obtenerPorId(id: string): Observable<Especialista> {
    const especialista = this.especialistas.find(e => e.id === id);
    return of(especialista!).pipe(delay(200));
  }

  obtenerActivos(): Observable<Especialista[]> {
    const activos = this.especialistas.filter(e => e.activo);
    return of(activos).pipe(delay(300));
  }

  crear(especialista: Especialista): Observable<Especialista> {
    const nuevoEspecialista = { 
      ...especialista, 
      id: (this.especialistas.length + 1).toString(),
      casosAsignados: 0
    };
    this.especialistas.push(nuevoEspecialista);
    return of(nuevoEspecialista).pipe(delay(400));
  }

  actualizar(id: string, especialista: Partial<Especialista>): Observable<Especialista> {
    const index = this.especialistas.findIndex(e => e.id === id);
    if (index !== -1) {
      this.especialistas[index] = { ...this.especialistas[index], ...especialista };
      return of(this.especialistas[index]).pipe(delay(400));
    }
    throw new Error('Especialista no encontrado');
  }

  eliminar(id: string): Observable<void> {
    this.especialistas = this.especialistas.filter(e => e.id !== id);
    return of(void 0).pipe(delay(300));
  }

  buscarPorEspecialidad(especialidad: string): Observable<Especialista[]> {
    const resultado = this.especialistas.filter(e => 
      e.especialidad.toLowerCase().includes(especialidad.toLowerCase()) && e.activo
    );
    return of(resultado).pipe(delay(300));
  }
}
