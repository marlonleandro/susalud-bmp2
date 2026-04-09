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
   - 8 casos mock con datos completos
4. **Mis Pendientes**: Vista para revisores con acciones de aprobación/rechazo
5. **Reportería y Análisis**: 
   - Estadísticas generales y gráficos
   - **Mapa interactivo del Perú con ArcGIS JavaScript API 4.30**
   - Marcadores por departamento con tamaño variable
   - Popups informativos y etiquetas
6. **Workflow Configurable**: Procesos M2.P03, M2.P06 y M2.P07
7. **IA Aplicada**: Clasificación inteligente y chatbot
8. **Integración SGD**: Sincronización bidireccional

## 🗺️ Mapa Interactivo

El sistema incluye un mapa del Perú implementado con **ArcGIS JavaScript API 4.30** que muestra:

- Ubicación de casos por departamento del solicitante
- Marcadores con tamaño variable según cantidad de casos
- Etiquetas numéricas sobre los marcadores
- Popups con información detallada al hacer clic
- Basemap vectorial de navegación profesional

**Tecnología**: ArcGIS desde CDN (sin dependencias npm para evitar conflictos con webpack)

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
- **Casos**: 8 casos completos con ubicación y establecimientos involucrados

## Arquitectura

Arquitectura hexagonal (puertos y adaptadores):

- **Domain**: Modelos de negocio y puertos (interfaces)
  - `models/`: Entidades del dominio (Caso, Workflow, Auth, Ubigeo, Ipress)
  - `ports/`: Interfaces de repositorios
- **Infrastructure**: Implementaciones concretas
  - `mock/`: Repositorios mock para desarrollo
    - Datos UBIGEO del INEI (1,861 distritos)
    - Datos IPRESS del RENIPRESS (35,408 establecimientos)
  - `guards/`: Guards de autenticación
  - `services/`: Servicios de aplicación
- **Presentation**: Componentes Angular standalone
  - `pages/`: Páginas de la aplicación (Login, Dashboard, Casos, Pendientes, Reportes, etc.)

## 🎯 Rutas Principales

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/login` | Inicio de sesión | No |
| `/` | Dashboard principal | Sí |
| `/casos` | Lista de casos | Sí |
| `/casos/nuevo` | Formulario de nuevo caso | Sí |
| `/casos/:id` | Detalle de caso | Sí |
| `/pendientes` | Mis pendientes (revisores) | Sí |
| `/pendientes/:id` | Detalle de pendiente | Sí |
| `/reportes` | Reportería y mapa interactivo | Sí |
| `/workflow` | Gestión de workflow | Sí |
| `/sgd` | Integración SGD | Sí |
| `/ia` | Asistente IA | Sí |

## 📚 Documentación Adicional

- [Sistema de Autenticación](docs/AUTENTICACION.md)
- [Sistema de UBIGEO](docs/UBIGEO.md)
- [Casos Mock de Prueba](docs/CASOS_MOCK.md)
- [Módulo de Reportería y Mapa](docs/REPORTES.md)

## 🛠️ Tecnologías

- **Angular 17** (Standalone Components)
- **TypeScript 5.2**
- **ArcGIS JavaScript API 4.30** (Mapas interactivos)
- **RxJS** (Manejo de estado reactivo)
- **CSS moderno** con diseño responsive

## 🏗️ Build

```bash
# Build de producción
npm run build

# Los archivos se generarán en dist/
```

Build exitoso:
- Tamaño inicial: 17.37 MB (1.62 MB comprimido)
- 12 chunks lazy loading
- Sin errores ni warnings críticos

## 🚧 Próximos Pasos

- Conectar con API real de backend
- Implementar exportación de reportes (PDF/Excel)
- Agregar filtros por fecha en reportes
- Implementar notificaciones en tiempo real
- Integrar con sistema SGD real
- Agregar mapa de calor (heatmap)
- Implementar clustering de marcadores

## 📝 Notas Técnicas

### Configuración de ArcGIS
El proyecto usa ArcGIS JavaScript API desde CDN para evitar conflictos con webpack y calcite-components:

```html
<!-- index.html -->
<link rel="stylesheet" href="https://js.arcgis.com/4.30/esri/themes/light/main.css">
<script src="https://js.arcgis.com/4.30/"></script>
```

Los módulos se cargan dinámicamente usando `(window as any).require` para evitar que webpack intente resolverlos como módulos de Node.js.

Ver [docs/REPORTES.md](docs/REPORTES.md) para más detalles sobre la implementación del mapa.

---

**Desarrollado con Angular 17 y ArcGIS JavaScript API**
