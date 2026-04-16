# Resumen del Proyecto SUSALUD BPM

## Información General

**Nombre**: SUSALUD BPM - Sistema de Gestión de Consultas y Denuncias  
**Framework**: Angular 17 (Standalone Components)  
**Arquitectura**: Hexagonal (Puertos y Adaptadores)  
**Estado**: ✅ Completado y Funcional

## Módulos Implementados

### 1. Autenticación y Seguridad
- Sistema de login con validación
- Guard de autenticación en todas las rutas
- Gestión de tokens y sesión
- Redirección automática

### 2. Dashboard
- Indicadores POI/PEI en tiempo real
- Estadísticas generales de casos
- Gráficos de distribución
- Alertas de vencimiento

### 3. Gestión de Casos
- Formulario completo de registro
- Selectores UBIGEO en cascada (1,861 distritos)
- Búsqueda de establecimientos IPRESS (35,408)
- Lista con filtros avanzados
- Detalle completo de casos
- 14 casos mock con datos completos
- **Asignación de especialistas a casos**
- Columna de especialista en listados
- Visualización de especialista asignado en detalle

### 3.1. Gestión de Especialistas
**Características**:
- Lista de especialistas con filtros
- Registro de nuevos especialistas
- Detalle completo de especialista
- 12 especialistas mock con diferentes especialidades
- Asignación de casos durante el registro
- Estadísticas de casos asignados por especialista
- Activación/desactivación de especialistas

**Especialidades disponibles**:
- Medicina General, Cardiología, Pediatría
- Ginecología, Traumatología, Neurología
- Dermatología, Oftalmología, Psiquiatría
- Oncología, Cirugía General, Medicina Interna

### 4. Mis Pendientes
- Bandeja de revisión para aprobadores
- Acciones de aprobación/rechazo
- Filtros por estado y severidad
- Vista detallada de pendientes

### 5. IPRESS - Mapa de Establecimientos
**Características**:
- Mapa interactivo del Perú (Highcharts Maps)
- 35,408 establecimientos de salud del RENIPRESS
- Filtros en cascada: Departamento → Provincia → Distrito
- Clic en departamento filtra automáticamente
- Lista con información detallada
- Colores según cantidad de establecimientos

**Tecnología**: Highcharts Maps + @highcharts/map-collection

### 6. Reportería y Análisis
**Sección 1: Mapa de Casos**
- Mapa interactivo del Perú (Highcharts Maps)
- Casos agrupados por departamento del solicitante
- Filtros en cascada por ubicación
- Lista detallada de casos
- Clic en departamento filtra automáticamente

**Sección 2: Evolución Mensual**
- Gráfico de líneas múltiples
- Tres series por severidad (Leve, Moderado, Severo)
- Análisis del año en curso (2026)
- Datos de enero, febrero y mayo

**Tecnología**: Highcharts + Highcharts Maps

### 7. Workflow Configurable
- Procesos M2.P03, M2.P06, M2.P07
- Historial de gestiones
- Estados configurables

### 8. IA Aplicada
- Clasificación inteligente de casos
- Chatbot de asistencia

### 9. Integración SGD
- Sincronización bidireccional
- Gestión de documentos

## Datos Mock Disponibles

### UBIGEO (INEI)
- **Total**: 1,861 registros
- 25 Departamentos
- 196 Provincias
- 1,861 Distritos
- Códigos oficiales de 6 dígitos

### IPRESS (RENIPRESS)
- **Total**: 35,408 establecimientos
- Hospitales, Clínicas, Centros de Salud
- Consultorios, Policlínicos
- Datos completos: código, nombre, tipo, ubicación, categoría

### Casos
- **Total**: 14 casos completos
- Distribuidos en enero, febrero, marzo, abril y mayo 2026
- 5 Leve, 5 Moderado, 4 Severo
- 4 Consultas, 10 Denuncias
- 1-3 establecimientos por caso
- Ubicaciones en todo el Perú
- **6 casos con especialistas asignados**

### Especialistas
- **Total**: 12 especialistas médicos
- 12 especialidades diferentes
- Todos activos
- Datos completos: documento, nombres, especialidad, fecha de ingreso
- Información de contacto (email, teléfono)
- Contador de casos asignados

## Arquitectura Técnica

### Estructura de Carpetas
```
src/app/
├── domain/
│   ├── models/          # Entidades del negocio
│   └── ports/           # Interfaces de repositorios
├── infrastructure/
│   ├── mock/            # Repositorios mock
│   ├── guards/          # Guards de autenticación
│   └── services/        # Servicios de aplicación
└── presentation/
    └── pages/           # Componentes standalone
```

### Principios Aplicados
- **Hexagonal Architecture**: Separación de capas
- **Dependency Inversion**: Interfaces en domain
- **Standalone Components**: Sin módulos NgModule
- **Lazy Loading**: Carga diferida de rutas
- **Reactive Programming**: RxJS para estado

## Tecnologías y Librerías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Angular | 17.3.17 | Framework principal |
| TypeScript | 5.2 | Lenguaje |
| Highcharts | 11.4.0 | Gráficos |
| Highcharts Maps | - | Mapas interactivos |
| @highcharts/map-collection | 1.2.0 | Datos geográficos |
| RxJS | 7.8 | Programación reactiva |

## Rutas del Sistema

| Ruta | Módulo | Protegida |
|------|--------|-----------|
| `/login` | Autenticación | No |
| `/` | Dashboard | Sí |
| `/casos` | Lista de casos | Sí |
| `/casos/nuevo` | Nuevo caso | Sí |
| `/casos/:id` | Detalle caso | Sí |
| `/especialistas` | Lista de especialistas | Sí |
| `/especialistas/nuevo` | Nuevo especialista | Sí |
| `/especialistas/:id` | Detalle especialista | Sí |
| `/pendientes` | Mis pendientes | Sí |
| `/pendientes/:id` | Detalle pendiente | Sí |
| `/ipress` | Mapa IPRESS | Sí |
| `/reportes` | Reportería | Sí |
| `/workflow` | Workflow | Sí |
| `/sgd` | Integración SGD | Sí |
| `/ia` | Asistente IA | Sí |

## Métricas del Build

### Build de Producción
```bash
npm run build
```

**Resultados**:
- Tamaño inicial: 17.38 MB (1.62 MB comprimido)
- 15 chunks con lazy loading
- Chunk IPRESS: 354.71 kB (110.48 kB comprimido)
- Chunk Reportes: 11.17 kB (3.30 kB comprimido)
- Chunk Mapa GeoJSON: 34.70 kB (7.14 kB comprimido)
- Sin errores
- Warnings: Solo CommonJS de Highcharts (normales)

### Tiempo de Build
- Desarrollo: ~50-70 segundos
- Producción: ~100-120 segundos

## Credenciales de Acceso

**Usuario**: admin  
**Contraseña**: admin123

## Comandos Principales

```bash
# Instalación
npm install

# Desarrollo
npm start
# o
ng serve

# Build producción
npm run build

# Tests (si están configurados)
npm test
```

## Documentación Disponible

1. [README.md](../README.md) - Documentación principal
2. [AUTENTICACION.md](AUTENTICACION.md) - Sistema de autenticación
3. [UBIGEO.md](UBIGEO.md) - Sistema de UBIGEO
4. [CASOS_MOCK.md](CASOS_MOCK.md) - Casos de prueba
5. [IPRESS_MAPA.md](IPRESS_MAPA.md) - Módulo IPRESS
6. [REPORTES_MAPA.md](REPORTES_MAPA.md) - Módulo Reportería
7. [PLANNING.md](../PLANNING.md) - Planning y roadmap del proyecto

## Características Destacadas

### Mapas Interactivos
- Dos módulos con mapas del Perú
- Tecnología Highcharts Maps
- Filtros en cascada
- Interacción con clic
- Visualización de datos geográficos

### Filtros UBIGEO
- Selectores dependientes
- Datos oficiales del INEI
- Cascada: Departamento → Provincia → Distrito
- Validación de códigos

### Base de Datos IPRESS
- 35,408 establecimientos
- Búsqueda por nombre
- Filtro por UBIGEO
- Información completa

### Gráficos y Análisis
- Evolución temporal
- Distribución por severidad
- Análisis geográfico
- Indicadores POI/PEI

## Próximos Pasos Sugeridos

1. Conectar con API real de backend
2. Implementar exportación de reportes (PDF/Excel)
3. Agregar más filtros en reportes
4. Implementar notificaciones en tiempo real
5. Integrar con sistema SGD real
6. Agregar tooltips detallados en mapas
7. Implementar clustering de marcadores
8. Agregar gráficos adicionales

## Notas Técnicas Importantes

### Mapeo de Códigos UBIGEO a hc-key
El sistema usa los primeros 2 dígitos del código UBIGEO para mapear a las claves del mapa de Highcharts:

- 01: Amazonas (pe-am)
- 07: Callao (pe-cl)
- 08: Cusco (pe-cs)
- 10: Huánuco (pe-hc)
- 15: Lima (pe-lp)
- 18: Moquegua (pe-mq)
- ... (25 departamentos)

### Ubicación de Casos
La ubicación de los casos está basada en el **departamento, provincia y distrito del solicitante**, no del establecimiento involucrado.

### Inicialización de Mapas
Los mapas se inicializan 1 segundo después del renderizado para asegurar que los contenedores DOM estén disponibles.

### Filtrado de Datos
- Por distrito: UBIGEO exacto (6 dígitos)
- Por provincia: Primeros 4 dígitos del UBIGEO
- Por departamento: Primeros 2 dígitos del UBIGEO

## Contacto y Soporte

Para más información sobre el proyecto, consultar la documentación en la carpeta `docs/` o el archivo `README.md` principal.

---

**Última actualización**: Abril 2026  
**Versión**: 1.1.0  
**Estado**: Producción
