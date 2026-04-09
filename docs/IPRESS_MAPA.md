# Módulo IPRESS - Mapa de Establecimientos de Salud

## Descripción
Módulo completo para visualizar y explorar los 35,408 establecimientos de salud (IPRESS) del Perú en un mapa interactivo usando Highcharts.

## Características Implementadas

### 1. Mapa Interactivo del Perú
- **Tecnología**: Highcharts Maps
- **Fuente de datos**: @highcharts/map-collection
- **Mapa**: Perú con todos los departamentos
- **Interactividad**: 
  - Clic en departamento para filtrar
  - Hover para resaltar
  - Navegación con zoom y pan
  - Colores según cantidad de establecimientos

### 2. Panel de Filtros
- **Selectores en Cascada**:
  - Departamento (24 opciones)
  - Provincia (depende de departamento)
  - Distrito (depende de provincia)
- **Búsqueda por texto**: Filtrar por nombre de establecimiento
- **Contador**: Muestra cantidad de establecimientos encontrados

### 3. Lista de Establecimientos
- **Información mostrada**:
  - Nombre del establecimiento
  - Código único
  - Tipo de establecimiento
  - Categoría
  - Ubicación completa (Distrito, Provincia, Departamento)
  - Institución
- **Interactividad**:
  - Scroll infinito
  - Selección de establecimiento
  - Resaltado al hover
  - Búsqueda en tiempo real

### 4. Layout Responsive
- **Desktop**: Mapa a la derecha (flex), Lista a la izquierda (450px)
- **Tablet/Mobile**: Layout en columna, mapa arriba, lista abajo

## Ubicación en el Sistema

### Menú Principal
- **Posición**: Debajo de "Mis Pendientes"
- **Icono**: 🏥
- **Nombre**: IPRESS
- **Ruta**: `/ipress`

## Datos Utilizados

### Fuente
- **RENIPRESS**: Registro Nacional de Instituciones Prestadoras de Servicios de Salud
- **Total**: 35,408 establecimientos activos
- **Archivo**: `src/app/infrastructure/mock/ipress-data.ts`

### Estructura de Datos
```typescript
interface Ipress {
  codigoUnico: string;
  nombre: string;
  clasificacion: string;
  tipo: string;
  institucion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  ubigeo: string;
  direccion: string;
  categoria: string;
  telefono: string;
  latitud?: number;
  longitud?: number;
}
```

## Tecnologías

### Highcharts Maps
- **Versión**: 11.4.0
- **Módulos**: 
  - `highcharts` (core)
  - `highcharts/modules/map` (módulo de mapas)
  - `@highcharts/map-collection` (mapas topográficos)

### Integración
```typescript
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';

// Inicializar módulo de mapas
MapModule(Highcharts);

// Cargar mapa de Perú
import('@highcharts/map-collection/countries/pe/pe-all.geo.json')
```

## Funcionalidades

### 1. Filtrado por Departamento desde el Mapa
**Flujo**:
1. Usuario hace clic en un departamento del mapa
2. Sistema captura el evento con `hc-key` del departamento
3. Convierte `hc-key` a código de departamento (01-25)
4. Actualiza el selector de departamento
5. Carga provincias del departamento
6. Filtra lista de IPRESS

**Mapeo hc-key a código**:
```typescript
'pe-li': '15' // Lima
'pe-ar': '04' // Arequipa
'pe-cu': '08' // Cusco
// ... etc
```

### 2. Filtrado por Selectores UBIGEO
**Cascada**:
1. Seleccionar Departamento → Habilita Provincia
2. Seleccionar Provincia → Habilita Distrito
3. Seleccionar Distrito → Filtra por UBIGEO exacto

**Lógica de filtrado**:
- Departamento: Filtra por nombre de departamento
- Provincia: Filtra por nombre de provincia
- Distrito: Filtra por código UBIGEO (6 dígitos)

### 3. Búsqueda por Texto
- Búsqueda en tiempo real
- Filtra por nombre de establecimiento
- Case-insensitive
- Se combina con filtros UBIGEO

### 4. Visualización en el Mapa
**Colores**:
- Escala de azules según cantidad de establecimientos
- Mínimo: #EFEFFF (pocos establecimientos)
- Máximo: #313695 (muchos establecimientos)

**Etiquetas**:
- Nombre del departamento
- Cantidad de establecimientos al hover

## Archivos del Módulo

### Componente Principal
```
src/app/presentation/pages/ipress/ipress-mapa.component.ts
```

### Modelos y Repositorios
```
src/app/domain/models/ipress.model.ts
src/app/domain/ports/ipress.repository.ts
src/app/infrastructure/mock/ipress-mock.repository.ts
src/app/infrastructure/mock/ipress-data.ts (35,408 registros)
```

### Configuración
```
src/app/app.routes.ts (ruta /ipress)
src/app/app.component.ts (enlace en menú)
```

## Configuración de Highcharts

### package.json
```json
{
  "dependencies": {
    "highcharts": "^11.4.0",
    "@highcharts/map-collection": "^1.2.0"
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

## Uso

### Navegación
1. Iniciar sesión en el sistema
2. Hacer clic en "IPRESS" en el menú lateral
3. Esperar carga del mapa (1-2 segundos)

### Filtrar por Mapa
1. Hacer clic en cualquier departamento del mapa
2. La lista se filtra automáticamente
3. Los selectores se actualizan

### Filtrar por Selectores
1. Seleccionar Departamento
2. Opcionalmente seleccionar Provincia
3. Opcionalmente seleccionar Distrito
4. Ver resultados en la lista

### Buscar por Nombre
1. Escribir en el campo de búsqueda
2. Los resultados se filtran en tiempo real
3. Se mantienen los filtros UBIGEO activos

### Ver Detalle
1. Hacer clic en cualquier tarjeta de la lista
2. La tarjeta se resalta
3. Se muestra información completa

## Estadísticas

### Distribución por Departamento
Los departamentos con más establecimientos:
1. Lima: ~15,000 establecimientos
2. Piura: ~2,500 establecimientos
3. Cajamarca: ~2,000 establecimientos
4. La Libertad: ~1,800 establecimientos
5. Cusco: ~1,500 establecimientos

### Tipos de Establecimientos
- Establecimientos sin internamiento
- Establecimientos con internamiento
- Servicios médicos de apoyo
- Centros de salud
- Hospitales
- Clínicas
- Consultorios

## Ventajas de Highcharts

1. **Rendimiento**: Maneja 35,408 registros sin problemas
2. **Mapas profesionales**: Topografía precisa del Perú
3. **Interactividad**: Zoom, pan, hover, click
4. **Responsive**: Se adapta a diferentes tamaños
5. **Personalizable**: Colores, etiquetas, tooltips
6. **Documentación**: Amplia documentación y ejemplos

## Próximas Mejoras

1. Agregar coordenadas GPS a los establecimientos
2. Mostrar marcadores individuales en el mapa
3. Implementar clustering para muchos marcadores
4. Agregar filtros adicionales (tipo, categoría, institución)
5. Exportar lista filtrada a Excel/PDF
6. Agregar gráficos de distribución
7. Implementar vista de detalle completo
8. Agregar búsqueda por código único
9. Implementar favoritos
10. Agregar comparación de establecimientos

## Troubleshooting

### Mapa no se carga
- Verificar que @highcharts/map-collection está instalado
- Verificar que resolveJsonModule está en tsconfig.json
- Revisar consola del navegador para errores

### Filtros no funcionan
- Verificar que UbigeoRepository tiene los métodos correctos
- Verificar que los datos UBIGEO están cargados
- Revisar mapeo de códigos de departamento

### Lista vacía
- Verificar que IPRESS_DATA tiene registros
- Verificar que el filtro no es demasiado restrictivo
- Revisar estado de los establecimientos (solo ACTIVO)

## Recursos

- [Highcharts Maps Documentation](https://www.highcharts.com/docs/maps/getting-started)
- [Map Collection](https://code.highcharts.com/mapdata/)
- [Peru Map Example](https://jsfiddle.net/gh/get/library/pure/highslide-software/highcharts.com/tree/master/samples/mapdata/countries/pe/pe-all)

---

**Implementado**: 9 de Abril, 2026
