import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CasoRepository } from '@domain/ports/caso.repository';
import { Caso, TipoSolicitud, Severidad, EstadoCaso } from '@domain/models/caso.model';

@Injectable({
  providedIn: 'root'
})
export class CasoMockRepository extends CasoRepository {
  private casos: Caso[] = [
    // Casos de Enero 2026
    {
      id: '101',
      numeroExpediente: '00123-2026',
      fechaRegistro: new Date('2026-01-15'),
      fechaRecepcion: new Date('2026-01-15'),
      canalIngreso: 'Página web',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.DENUNCIA,
      tipoDenuncia: 'Intermediación',
      competenciaSUSALUD: true,
      competenciaPROTT: false,
      huboSolicitud: true,
      severidad: Severidad.LEVE,
      estado: EstadoCaso.RESUELTO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '71234567',
        nombres: 'ROSA',
        apellidoPaterno: 'MENDOZA',
        apellidoMaterno: 'QUISPE',
        fechaNacimiento: new Date('1985-03-20'),
        genero: 'Femenino',
        direccion: 'Jr. Los Jazmines 123',
        departamento: 'Lima',
        provincia: 'Lima',
        distrito: 'San Juan de Lurigancho',
        telefono: '987123456',
        correoElectronico: 'rosa.mendoza@email.com'
      },
      descripcion: 'Solicitud de información sobre cobertura de medicamentos',
      macroRegion: 'Macro Regional Lima',
      idSGD: 'SGD-2026-000015',
      diasTranscurridos: 84,
      diasRestantes: 0,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00015001',
          nombre: 'CENTRO DE SALUD SAN JUAN',
          clasificacion: 'CENTROS DE SALUD',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'LIMA',
          provincia: 'LIMA',
          distrito: 'SAN JUAN DE LURIGANCHO',
          ubigeo: '150132',
          direccion: 'AV. PRÓCERES DE LA INDEPENDENCIA 1234 SAN JUAN DE LURIGANCHO',
          categoria: 'I-4',
          telefono: '014567123'
        }
      ]
    },
    {
      id: '102',
      numeroExpediente: '00456-2026',
      fechaRegistro: new Date('2026-01-22'),
      fechaRecepcion: new Date('2026-01-22'),
      canalIngreso: 'Presencial',
      areaActual: 'Revisar informe de intervención',
      tipoSolicitud: TipoSolicitud.DENUNCIA,
      tipoDenuncia: 'Intermediación',
      competenciaSUSALUD: true,
      competenciaPROTT: true,
      huboSolicitud: true,
      severidad: Severidad.MODERADO,
      estado: EstadoCaso.RESUELTO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '82345678',
        nombres: 'MIGUEL',
        apellidoPaterno: 'CHAVEZ',
        apellidoMaterno: 'ROJAS',
        fechaNacimiento: new Date('1978-07-14'),
        genero: 'Masculino',
        direccion: 'Av. Los Incas 567',
        departamento: 'Cusco',
        provincia: 'Cusco',
        distrito: 'Wanchaq',
        telefono: '984234567',
        correoElectronico: 'miguel.chavez@email.com'
      },
      descripcion: 'Denuncia por demora en programación de cirugía',
      macroRegion: 'Macro Regional Sur',
      idSGD: 'SGD-2026-000022',
      diasTranscurridos: 77,
      diasRestantes: 0,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00020002',
          nombre: 'HOSPITAL ANTONIO LORENA',
          clasificacion: 'HOSPITALES',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'CUSCO',
          provincia: 'CUSCO',
          distrito: 'CUSCO',
          ubigeo: '080101',
          direccion: 'PLAZA TUPAC AMARU S/N CUSCO',
          categoria: 'II-2',
          telefono: '084226511'
        }
      ]
    },
    // Casos de Febrero 2026
    {
      id: '103',
      numeroExpediente: '03789-2026',
      fechaRegistro: new Date('2026-02-10'),
      fechaRecepcion: new Date('2026-02-10'),
      canalIngreso: 'Correo Electrónico',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.DENUNCIA,
      tipoDenuncia: 'Intermediación',
      competenciaSUSALUD: true,
      competenciaPROTT: false,
      huboSolicitud: true,
      severidad: Severidad.SEVERO,
      estado: EstadoCaso.RESUELTO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '93456789',
        nombres: 'CARMEN',
        apellidoPaterno: 'FLORES',
        apellidoMaterno: 'DIAZ',
        fechaNacimiento: new Date('1965-11-08'),
        genero: 'Femenino',
        direccion: 'Calle Las Magnolias 890',
        departamento: 'Arequipa',
        provincia: 'Arequipa',
        distrito: 'Cayma',
        telefono: '959345678',
        correoElectronico: 'carmen.flores@email.com'
      },
      descripcion: 'Denuncia por negativa de atención en emergencia por falta de cama UCI',
      macroRegion: 'Macro Regional Sur',
      idSGD: 'SGD-2026-000045',
      diasTranscurridos: 58,
      diasRestantes: 0,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00010002',
          nombre: 'HOSPITAL GOYENECHE',
          clasificacion: 'HOSPITALES',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'AREQUIPA',
          provincia: 'AREQUIPA',
          distrito: 'AREQUIPA',
          ubigeo: '040101',
          direccion: 'AV. GOYENECHE S/N AREQUIPA',
          categoria: 'III-1',
          telefono: '054231313'
        },
        {
          codigoUnico: '00010003',
          nombre: 'CLINICA AREQUIPA',
          clasificacion: 'CLINICAS',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'AREQUIPA',
          provincia: 'AREQUIPA',
          distrito: 'AREQUIPA',
          ubigeo: '040101',
          direccion: 'AV. BOLOGNESI 201 AREQUIPA',
          categoria: 'III-1',
          telefono: '054259999'
        }
      ]
    },
    {
      id: '104',
      numeroExpediente: '04123-2026',
      fechaRegistro: new Date('2026-02-25'),
      fechaRecepcion: new Date('2026-02-25'),
      canalIngreso: 'Telefónico',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.CONSULTA,
      competenciaSUSALUD: true,
      competenciaPROTT: false,
      huboSolicitud: false,
      severidad: Severidad.LEVE,
      estado: EstadoCaso.RESUELTO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '04567890',
        nombres: 'JORGE',
        apellidoPaterno: 'SANCHEZ',
        apellidoMaterno: 'VEGA',
        fechaNacimiento: new Date('1990-04-30'),
        genero: 'Masculino',
        direccion: 'Jr. Libertad 234',
        departamento: 'Piura',
        provincia: 'Piura',
        distrito: 'Castilla',
        telefono: '973567890',
        correoElectronico: 'jorge.sanchez@email.com'
      },
      descripcion: 'Consulta sobre proceso de reembolso de gastos médicos',
      macroRegion: 'Macro Regional Norte',
      idSGD: 'SGD-2026-000058',
      diasTranscurridos: 43,
      diasRestantes: 0,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00040002',
          nombre: 'CENTRO DE SALUD CASTILLA',
          clasificacion: 'CENTROS DE SALUD',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'PIURA',
          provincia: 'PIURA',
          distrito: 'CASTILLA',
          ubigeo: '200104',
          direccion: 'AV. GRAU 456 CASTILLA',
          categoria: 'I-4',
          telefono: '073345678'
        }
      ]
    },
    // Casos de Mayo 2026
    {
      id: '105',
      numeroExpediente: '15678-2026',
      fechaRegistro: new Date('2026-05-08'),
      fechaRecepcion: new Date('2026-05-08'),
      canalIngreso: 'Página web',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.DENUNCIA,
      tipoDenuncia: 'Intermediación',
      competenciaSUSALUD: true,
      competenciaPROTT: true,
      huboSolicitud: true,
      severidad: Severidad.MODERADO,
      estado: EstadoCaso.REGISTRADO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '15678901',
        nombres: 'PATRICIA',
        apellidoPaterno: 'RAMOS',
        apellidoMaterno: 'GUTIERREZ',
        fechaNacimiento: new Date('1982-09-17'),
        genero: 'Femenino',
        direccion: 'Av. Universitaria 789',
        departamento: 'Lima',
        provincia: 'Lima',
        distrito: 'Los Olivos',
        telefono: '991234567',
        correoElectronico: 'patricia.ramos@email.com'
      },
      descripcion: 'Denuncia por cobro indebido de servicios médicos',
      macroRegion: 'Macro Regional Lima',
      idSGD: 'SGD-2026-000156',
      diasTranscurridos: 1,
      diasRestantes: 24,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00015002',
          nombre: 'POLICLINICO LOS OLIVOS',
          clasificacion: 'POLICLINICOS',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'LIMA',
          provincia: 'LIMA',
          distrito: 'LOS OLIVOS',
          ubigeo: '150117',
          direccion: 'AV. ALFREDO MENDIOLA 3456 LOS OLIVOS',
          categoria: 'I-3',
          telefono: '015678901'
        },
        {
          codigoUnico: '00015003',
          nombre: 'CENTRO MEDICO SANTA ROSA',
          clasificacion: 'CENTROS MEDICOS ESPECIALIZADOS',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'LIMA',
          provincia: 'LIMA',
          distrito: 'LOS OLIVOS',
          ubigeo: '150117',
          direccion: 'AV. CARLOS IZAGUIRRE 567 LOS OLIVOS',
          categoria: 'I-3',
          telefono: '016789012'
        }
      ]
    },
    {
      id: '106',
      numeroExpediente: '16234-2026',
      fechaRegistro: new Date('2026-05-20'),
      fechaRecepcion: new Date('2026-05-20'),
      canalIngreso: 'Presencial',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.DENUNCIA,
      tipoDenuncia: 'Intermediación',
      competenciaSUSALUD: true,
      competenciaPROTT: false,
      huboSolicitud: true,
      severidad: Severidad.SEVERO,
      estado: EstadoCaso.EN_PROCESO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '26789012',
        nombres: 'ROBERTO',
        apellidoPaterno: 'CASTILLO',
        apellidoMaterno: 'MORALES',
        fechaNacimiento: new Date('1973-12-05'),
        genero: 'Masculino',
        direccion: 'Jr. Ayacucho 345',
        departamento: 'Junín',
        provincia: 'Huancayo',
        distrito: 'El Tambo',
        telefono: '964890123',
        correoElectronico: 'roberto.castillo@email.com'
      },
      descripcion: 'Denuncia por complicaciones post-operatorias no atendidas adecuadamente',
      macroRegion: 'Macro Regional Centro',
      idSGD: 'SGD-2026-000168',
      diasTranscurridos: 1,
      diasRestantes: 24,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00060004',
          nombre: 'CLINICA ORTEGA',
          clasificacion: 'CLINICAS',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'JUNIN',
          provincia: 'HUANCAYO',
          distrito: 'HUANCAYO',
          ubigeo: '120101',
          direccion: 'AV. FERROCARRIL 890 HUANCAYO',
          categoria: 'II-2',
          telefono: '064256789'
        },
        {
          codigoUnico: '00060005',
          nombre: 'CENTRO QUIRURGICO ESPECIALIZADO',
          clasificacion: 'CENTROS MEDICOS ESPECIALIZADOS',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'JUNIN',
          provincia: 'HUANCAYO',
          distrito: 'EL TAMBO',
          ubigeo: '120104',
          direccion: 'JR. REAL 678 EL TAMBO',
          categoria: 'I-3',
          telefono: '064267890'
        },
        {
          codigoUnico: '00060006',
          nombre: 'LABORATORIO CLINICO CENTRAL',
          clasificacion: 'PATOLOGIA CLINICA',
          tipo: 'SERVICIO MÉDICO DE APOYO',
          institucion: 'PRIVADO',
          departamento: 'JUNIN',
          provincia: 'HUANCAYO',
          distrito: 'EL TAMBO',
          ubigeo: '120104',
          direccion: 'AV. HUANCAVELICA 123 EL TAMBO',
          categoria: 'Sin Categoría',
          telefono: '064278901'
        }
      ]
    },
    // Casos existentes
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
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00036693',
          nombre: 'TRAVESÍA MENTAL',
          clasificacion: 'CONSULTORIOS MEDICOS Y DE OTROS PROFESIONALES DE LA SALUD',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'LIMA',
          provincia: 'LIMA',
          distrito: 'VILLA MARIA DEL TRIUNFO',
          ubigeo: '150141',
          direccion: 'AVENIDA SALVADOR ALLENDE NUMERO 1099 PISO 2 DISTRITO VILLA MARIA DEL TRIUNFO PROVINCIA LIMA DEPARTAMENTO LIMA',
          categoria: 'I-1',
          telefono: '987654321'
        },
        {
          codigoUnico: '00035064',
          nombre: 'BIOSMED',
          clasificacion: 'CONSULTORIOS MEDICOS Y DE OTROS PROFESIONALES DE LA SALUD',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'LIMA',
          provincia: 'LIMA',
          distrito: 'VILLA MARIA DEL TRIUNFO',
          ubigeo: '150141',
          direccion: 'AVENIDA PACHACUTEC NUMERO 1099 DISTRITO VILLA MARIA DEL TRIUNFO PROVINCIA LIMA DEPARTAMENTO LIMA',
          categoria: 'I-3',
          telefono: '954123789'
        }
      ]
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
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00012345',
          nombre: 'CENTRO DE SALUD SAN MIGUEL',
          clasificacion: 'CENTROS DE SALUD',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'LIMA',
          provincia: 'LIMA',
          distrito: 'SAN MIGUEL',
          ubigeo: '150131',
          direccion: 'AV. UNIVERSITARIA 1801 SAN MIGUEL LIMA',
          categoria: 'I-4',
          telefono: '014567890'
        }
      ]
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
      alertaVencimiento: true,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00036545',
          nombre: 'CENTRO OPTICO FERNANDO OVIEDO',
          clasificacion: 'CENTROS OPTICOS',
          tipo: 'SERVICIO MÉDICO DE APOYO',
          institucion: 'PRIVADO',
          departamento: 'AREQUIPA',
          provincia: 'AREQUIPA',
          distrito: 'AREQUIPA',
          ubigeo: '040101',
          direccion: 'CALLE Mercaderes 224 C.C Panorámico NUMERO 24 PISO 0 DISTRITO AREQUIPA PROVINCIA AREQUIPA DEPARTAMENTO AREQUIPA',
          categoria: 'Sin Categoría',
          telefono: '949360707'
        },
        {
          codigoUnico: '00036496',
          nombre: 'Consultorio Dental Niño Doctorcito',
          clasificacion: 'CONSULTORIOS MEDICOS Y DE OTROS PROFESIONALES DE LA SALUD',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'AREQUIPA',
          provincia: 'AREQUIPA',
          distrito: 'AREQUIPA',
          ubigeo: '040101',
          direccion: 'CALLE Cruz Verde NÚMERO 222 A B PISO 1 DISTRITO AREQUIPA PROVINCIA AREQUIPA DEPARTAMENTO AREQUIPA',
          categoria: 'I-1',
          telefono: '(51)959000819'
        },
        {
          codigoUnico: '00010001',
          nombre: 'HOSPITAL REGIONAL HONORIO DELGADO',
          clasificacion: 'HOSPITALES',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'AREQUIPA',
          provincia: 'AREQUIPA',
          distrito: 'AREQUIPA',
          ubigeo: '040101',
          direccion: 'AV. ALCIDES CARRION S/N AREQUIPA',
          categoria: 'III-1',
          telefono: '054231818'
        }
      ]
    },
    {
      id: '4',
      numeroExpediente: '29733-2026',
      fechaRegistro: new Date('2026-04-05'),
      fechaRecepcion: new Date('2026-04-05'),
      canalIngreso: 'Telefónico',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.CONSULTA,
      competenciaSUSALUD: true,
      competenciaPROTT: false,
      huboSolicitud: false,
      severidad: Severidad.LEVE,
      estado: EstadoCaso.REGISTRADO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '45678901',
        nombres: 'CARLOS',
        apellidoPaterno: 'RODRIGUEZ',
        apellidoMaterno: 'MARTINEZ',
        fechaNacimiento: new Date('1980-08-20'),
        genero: 'Masculino',
        direccion: 'Jr. Las Flores 567',
        departamento: 'Cusco',
        provincia: 'Cusco',
        distrito: 'Cusco',
        telefono: '984567890',
        correoElectronico: 'carlos.rodriguez@email.com'
      },
      descripcion: 'Consulta sobre procedimiento de atención en emergencia',
      macroRegion: 'Macro Regional Sur',
      diasTranscurridos: 4,
      diasRestantes: 21,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00020001',
          nombre: 'HOSPITAL REGIONAL CUSCO',
          clasificacion: 'HOSPITALES',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'CUSCO',
          provincia: 'CUSCO',
          distrito: 'CUSCO',
          ubigeo: '080101',
          direccion: 'AV. DE LA CULTURA S/N CUSCO',
          categoria: 'II-2',
          telefono: '084223691'
        }
      ]
    },
    {
      id: '5',
      numeroExpediente: '29732-2026',
      fechaRegistro: new Date('2026-04-01'),
      fechaRecepcion: new Date('2026-04-01'),
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
        numeroDocumento: '23456789',
        nombres: 'MARIA',
        apellidoPaterno: 'GONZALES',
        apellidoMaterno: 'LOPEZ',
        fechaNacimiento: new Date('1975-03-12'),
        genero: 'Femenino',
        direccion: 'Av. Los Pinos 890',
        departamento: 'La Libertad',
        provincia: 'Trujillo',
        distrito: 'Trujillo',
        telefono: '944567123',
        correoElectronico: 'maria.gonzales@email.com'
      },
      descripcion: 'Denuncia por negativa de atención en servicio de emergencia',
      macroRegion: 'Macro Regional Norte',
      idSGD: 'SGD-2026-000175',
      diasTranscurridos: 8,
      diasRestantes: 17,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00030001',
          nombre: 'HOSPITAL REGIONAL DOCENTE DE TRUJILLO',
          clasificacion: 'HOSPITALES',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'LA LIBERTAD',
          provincia: 'TRUJILLO',
          distrito: 'TRUJILLO',
          ubigeo: '130101',
          direccion: 'AV. MANSICHE 795 TRUJILLO',
          categoria: 'III-1',
          telefono: '044245281'
        },
        {
          codigoUnico: '00030002',
          nombre: 'CENTRO DE SALUD WICHANZAO',
          clasificacion: 'CENTROS DE SALUD',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'LA LIBERTAD',
          provincia: 'TRUJILLO',
          distrito: 'LA ESPERANZA',
          ubigeo: '130102',
          direccion: 'AV. INDUSTRIAL S/N LA ESPERANZA',
          categoria: 'I-4',
          telefono: '044287654'
        }
      ]
    },
    {
      id: '6',
      numeroExpediente: '29731-2026',
      fechaRegistro: new Date('2026-04-06'),
      fechaRecepcion: new Date('2026-04-06'),
      canalIngreso: 'Correo Electrónico',
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
        numeroDocumento: '34567890',
        nombres: 'LUIS',
        apellidoPaterno: 'FERNANDEZ',
        apellidoMaterno: 'CASTRO',
        fechaNacimiento: new Date('1988-11-05'),
        genero: 'Masculino',
        direccion: 'Calle Los Alamos 234',
        departamento: 'Piura',
        provincia: 'Piura',
        distrito: 'Piura',
        telefono: '973456789',
        correoElectronico: 'luis.fernandez@email.com'
      },
      descripcion: 'Denuncia por demora en entrega de resultados de laboratorio',
      macroRegion: 'Macro Regional Norte',
      idSGD: 'SGD-2026-000190',
      diasTranscurridos: 3,
      diasRestantes: 22,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00040001',
          nombre: 'HOSPITAL CAYETANO HEREDIA',
          clasificacion: 'HOSPITALES',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'PIURA',
          provincia: 'PIURA',
          distrito: 'PIURA',
          ubigeo: '200101',
          direccion: 'AV. INDEPENDENCIA S/N PIURA',
          categoria: 'II-2',
          telefono: '073343025'
        }
      ]
    },
    {
      id: '7',
      numeroExpediente: '29730-2026',
      fechaRegistro: new Date('2026-03-28'),
      fechaRecepcion: new Date('2026-03-28'),
      canalIngreso: 'Página web',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.CONSULTA,
      competenciaSUSALUD: true,
      competenciaPROTT: false,
      huboSolicitud: false,
      severidad: Severidad.LEVE,
      estado: EstadoCaso.RESUELTO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '56789012',
        nombres: 'ANA',
        apellidoPaterno: 'TORRES',
        apellidoMaterno: 'RAMIREZ',
        fechaNacimiento: new Date('1992-06-18'),
        genero: 'Femenino',
        direccion: 'Jr. San Martin 456',
        departamento: 'Lambayeque',
        provincia: 'Chiclayo',
        distrito: 'Chiclayo',
        telefono: '956789012',
        correoElectronico: 'ana.torres@email.com'
      },
      descripcion: 'Consulta sobre cobertura de tratamiento oncológico',
      macroRegion: 'Macro Regional Norte',
      idSGD: 'SGD-2026-000165',
      diasTranscurridos: 12,
      diasRestantes: 13,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00050001',
          nombre: 'HOSPITAL LAS MERCEDES',
          clasificacion: 'HOSPITALES',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'LAMBAYEQUE',
          provincia: 'CHICLAYO',
          distrito: 'CHICLAYO',
          ubigeo: '140101',
          direccion: 'AV. LUIS GONZALES 635 CHICLAYO',
          categoria: 'II-2',
          telefono: '074237021'
        }
      ]
    },
    {
      id: '8',
      numeroExpediente: '29729-2026',
      fechaRegistro: new Date('2026-04-04'),
      fechaRecepcion: new Date('2026-04-04'),
      canalIngreso: 'Presencial',
      areaActual: 'Equipo de Intermediación',
      tipoSolicitud: TipoSolicitud.DENUNCIA,
      tipoDenuncia: 'Intermediación',
      competenciaSUSALUD: true,
      competenciaPROTT: true,
      huboSolicitud: true,
      severidad: Severidad.SEVERO,
      estado: EstadoCaso.EN_PROCESO,
      solicitante: {
        tipoDocumento: 'DNI',
        numeroDocumento: '67890123',
        nombres: 'PEDRO',
        apellidoPaterno: 'VARGAS',
        apellidoMaterno: 'SILVA',
        fechaNacimiento: new Date('1970-09-25'),
        genero: 'Masculino',
        direccion: 'Av. Grau 789',
        departamento: 'Junín',
        provincia: 'Huancayo',
        distrito: 'Huancayo',
        telefono: '964789012',
        correoElectronico: 'pedro.vargas@email.com'
      },
      descripcion: 'Denuncia por mala praxis médica en cirugía programada',
      macroRegion: 'Macro Regional Centro',
      idSGD: 'SGD-2026-000188',
      diasTranscurridos: 5,
      diasRestantes: 20,
      alertaVencimiento: false,
      establecimientosInvolucrados: [
        {
          codigoUnico: '00060001',
          nombre: 'HOSPITAL REGIONAL DOCENTE CLINICO QUIRURGICO DANIEL ALCIDES CARRION',
          clasificacion: 'HOSPITALES',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'MINISTERIO DE SALUD',
          departamento: 'JUNIN',
          provincia: 'HUANCAYO',
          distrito: 'HUANCAYO',
          ubigeo: '120101',
          direccion: 'AV. DANIEL ALCIDES CARRION 1090 HUANCAYO',
          categoria: 'III-1',
          telefono: '064231313'
        },
        {
          codigoUnico: '00060002',
          nombre: 'CLINICA SAN JUAN DE DIOS',
          clasificacion: 'CLINICAS',
          tipo: 'ESTABLECIMIENTO DE SALUD CON INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'JUNIN',
          provincia: 'HUANCAYO',
          distrito: 'HUANCAYO',
          ubigeo: '120101',
          direccion: 'JR. PUNO 545 HUANCAYO',
          categoria: 'II-2',
          telefono: '064234567'
        },
        {
          codigoUnico: '00060003',
          nombre: 'CENTRO MEDICO ESPECIALIZADO',
          clasificacion: 'CENTROS MEDICOS ESPECIALIZADOS',
          tipo: 'ESTABLECIMIENTO DE SALUD SIN INTERNAMIENTO',
          institucion: 'PRIVADO',
          departamento: 'JUNIN',
          provincia: 'HUANCAYO',
          distrito: 'EL TAMBO',
          ubigeo: '120104',
          direccion: 'AV. HUANCAVELICA 234 EL TAMBO',
          categoria: 'I-3',
          telefono: '064245678'
        }
      ]
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
