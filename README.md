# SUSALUD BPM - Sistema de Gestión de Consultas y Denuncias

Aplicación frontend moderna desarrollada con Angular 17 y arquitectura hexagonal para la gestión de consultas y denuncias ciudadanas en el sector salud del Perú.

## 🚀 Estado del Proyecto

✅ **Completado y Funcional** - Build exitoso sin errores

## Características Principales

### Módulos Implementados

1. **Autenticación**: Sistema de login con validación de credenciales y gestión de tokens
2. **Dashboard**: Monitoreo en tiempo real con indicadores POI/PEI
3. **Gestión de Casos**: Registro, búsqueda y seguimiento de expedientes
   - Selectores dependientes de UBIGEO (Departamento → Provincia → Distrito)
   - Basado en datos oficiales del INEI (1,861 distritos)
   - Gestión de establecimientos involucrados (IPRESS)
   - Base de datos de 35,408 establecimientos de salud del RENIPRESS
   - 14 casos mock con datos completos (incluyendo casos de enero, febrero y mayo 2026)
   - **Asignación de especialistas a casos**
   - Visualización de especialista asignado en detalle y listados
4. **Gestión de Especialistas**: Módulo completo para administrar médicos especialistas
   - Lista de especialistas con filtros y búsqueda
   - Registro de nuevos especialistas
   - Detalle completo de especialista
   - 12 especialistas mock con diferentes especialidades
   - Asignación de casos a especialistas
   - Estadísticas de casos asignados
5. **Mis Pendientes**: Vista para revisores con acciones de aprobación/rechazo
6. **IPRESS - Mapa de Establecimientos**: 
   - **Mapa interactivo del Perú con Highcharts Maps**
   - Filtros en cascada por Departamento → Provincia → Distrito
   - Lista de establecimientos con información detallada
   - Clic en departamento filtra automáticamente la lista
   - 35,408 establecimientos de salud del RENIPRESS
7. **Reportería y Análisis**: 
   - **Mapa interactivo de casos por departamento (Highcharts Maps)**
   - Filtros en cascada por ubicación del solicitante
   - Lista detallada de casos con información completa
   - **Gráfico de evolución mensual por severidad**
   - Tres líneas de tendencia (Leve, Moderado, Severo)
   - Análisis del año en curso (2026)
8. **Workflow Configurable**: Procesos M2.P03, M2.P06 y M2.P07
9. **IA Aplicada**: Clasificación inteligente y chatbot
10. **Integración SGD**: Sincronización bidireccional

## 🗺️ Mapas Interactivos

El sistema incluye dos módulos con mapas del Perú implementados con **Highcharts Maps**:

### Módulo IPRESS (Establecimientos de Salud)
- Visualización de 35,408 establecimientos por departamento
- Filtros en cascada: Departamento → Provincia → Distrito
- Clic en departamento del mapa filtra automáticamente
- Lista con información detallada de cada establecimiento
- Colores según cantidad de establecimientos

### Módulo Reportería (Casos)
- Mapa de casos agrupados por departamento del solicitante
- Filtros en cascada por ubicación
- Lista de casos con información completa del denunciante
- Gráfico de evolución mensual con tres líneas de severidad
- Análisis temporal del año en curso

**Tecnología**: Highcharts Maps con @highcharts/map-collection (mapa oficial del Perú)

## Instalación

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## 🔐 Acceso al Sistema

Credenciales de prueba:
- **Usuario**: admin
- **Contraseña**: admin123

El sistema redirigirá automáticamente a la página de login. Todas las rutas están protegidas por el guard de autenticación.

## 📊 Datos Mock Disponibles

- **UBIGEO**: 1,861 registros (Departamentos, Provincias, Distritos del INEI)
- **IPRESS**: 35,408 establecimientos de salud (RENIPRESS)
- **Especialistas**: 12 médicos especialistas con diferentes especialidades
  - Medicina General, Cardiología, Pediatría, Ginecología
  - Traumatología, Neurología, Dermatología, Oftalmología
  - Psiquiatría, Oncología, Cirugía General, Medicina Interna
- **Casos**: 14 casos completos con ubicación y establecimientos involucrados
  - 2 casos de enero 2026 (Leve, Moderado)
  - 2 casos de febrero 2026 (Severo, Leve)
  - 2 casos de mayo 2026 (Moderado, Severo)
  - 8 casos de marzo-abril 2026
  - 6 casos con especialistas asignados

## Arquitectura

Arquitectura hexagonal (puertos y adaptadores):

- **Domain**: Modelos de negocio y puertos (interfaces)
  - `models/`: Entidades del dominio (Caso, Workflow, Auth, Ubigeo, Ipress)
  - `ports/`: Interfaces de repositorios
- **Infrastructure**: Implementaciones concretas
  - `mock/`: Repositorios mock para desarrollo
    - Datos UBIGEO del INEI (1,861 distritos)
    - Datos IPRESS del RENIPRESS (35,408 establecimientos)
    - 14 casos mock con datos completos
  - `guards/`: Guards de autenticación
  - `services/`: Servicios de aplicación
- **Presentation**: Componentes Angular standalone
  - `pages/`: Páginas de la aplicación (Login, Dashboard, Casos, Pendientes, Reportes, IPRESS, etc.)

## 🎯 Rutas Principales

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/login` | Inicio de sesión | No |
| `/` | Dashboard principal | Sí |
| `/casos` | Lista de casos | Sí |
| `/casos/nuevo` | Formulario de nuevo caso | Sí |
| `/casos/:id` | Detalle de caso | Sí |
| `/especialistas` | Lista de especialistas | Sí |
| `/especialistas/nuevo` | Registro de especialista | Sí |
| `/especialistas/:id` | Detalle de especialista | Sí |
| `/pendientes` | Mis pendientes (revisores) | Sí |
| `/pendientes/:id` | Detalle de pendiente | Sí |
| `/ipress` | Mapa de establecimientos de salud | Sí |
| `/reportes` | Reportería con mapa y gráficos | Sí |
| `/workflow` | Gestión de workflow | Sí |
| `/sgd` | Integración SGD | Sí |
| `/ia` | Asistente IA | Sí |

## 📚 Documentación Adicional

- [Sistema de UBIGEO](docs/UBIGEO.md)
- [Casos Mock de Prueba](docs/CASOS_MOCK.md)
- [Resumen del Proyecto](docs/RESUMEN_PROYECTO.md)
- [Planning y Roadmap](PLANNING.md)

## 🛠️ Tecnologías

- **Angular 17** (Standalone Components)
- **TypeScript 5.2**
- **Highcharts 11.4.0** (Gráficos y mapas interactivos)
- **Highcharts Maps** (Mapas del Perú)
- **@highcharts/map-collection 1.2.0** (Datos geográficos oficiales)
- **RxJS** (Manejo de estado reactivo)
- **CSS moderno** con diseño responsive

## 🏗️ Build

```bash
# Build de producción
npm run build

# Los archivos se generarán en dist/
```

Build exitoso:
- Tamaño inicial: 17.38 MB (1.62 MB comprimido)
- 15 chunks lazy loading
- Chunk IPRESS: 354.71 kB (110.48 kB comprimido)
- Chunk Reportes: 11.17 kB (3.30 kB comprimido)
- Chunk Mapa GeoJSON: 34.70 kB (7.14 kB comprimido)
- Sin errores, solo warnings de CommonJS (normales con Highcharts)

## 🚧 Próximos Pasos

- Conectar con API real de backend
- Implementar exportación de reportes (PDF/Excel)
- Agregar más filtros en reportes (fecha, tipo, estado)
- Implementar notificaciones en tiempo real
- Integrar con sistema SGD real
- Agregar tooltips con información detallada en mapas
- Implementar clustering de marcadores para grandes volúmenes
- Agregar gráficos adicionales (por tipo, por estado, por región)

## 📝 Notas Técnicas

### Configuración de Highcharts Maps
El proyecto usa Highcharts Maps para visualización geográfica:

```typescript
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import '@highcharts/map-collection/countries/pe/pe-all.geo.json';

MapModule(Highcharts);
```

### Mapeo de Códigos UBIGEO
El sistema utiliza los primeros 2 dígitos del código UBIGEO para identificar departamentos y mapearlos a las claves `hc-key` del mapa de Highcharts:

- 01: Amazonas (pe-am)
- 07: Callao (pe-cl)
- 08: Cusco (pe-cs)
- 10: Huánuco (pe-hc)
- 15: Lima (pe-lr)
- 18: Moquegua (pe-mq)
- ... (25 departamentos en total)


### Estructura de Casos Mock
Los casos incluyen información completa:
- Datos del solicitante (nombre, documento, ubicación)
- Tipo de solicitud (Consulta/Denuncia)
- Severidad (Leve/Moderado/Severo)
- Estado del caso
- Establecimientos involucrados (1-3 por caso)
- Fechas distribuidas en enero, febrero y mayo 2026

---

**Desarrollado con Angular 17 y Highcharts Maps**
