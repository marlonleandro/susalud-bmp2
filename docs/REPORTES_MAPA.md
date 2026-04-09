# Reportería - Mapa de Casos

## Descripción
Módulo de reportería que muestra un mapa interactivo del Perú con la distribución de casos por departamento y un gráfico de evolución mensual. Permite filtrar casos por ubicación geográfica (departamento, provincia, distrito) y visualizar la información detallada de cada caso.

## Características

### Sección 1: Mapa Interactivo
- **Librería**: Highcharts Maps con mapa del Perú
- **Datos**: Casos agrupados por departamento del solicitante
- **Interacción**: Clic en departamento filtra automáticamente la lista de casos
- **Visualización**: Colores según cantidad de casos por departamento

#### Filtros en Cascada
- **Departamento**: Selector principal
- **Provincia**: Se habilita al seleccionar departamento
- **Distrito**: Se habilita al seleccionar provincia
- Los filtros se resetean automáticamente al cambiar la selección superior

#### Lista de Casos
Muestra hasta 100 casos con la siguiente información:
- Nombre completo del denunciante/solicitante
- Fecha de la denuncia
- Número de expediente
- Tipo de solicitud (Consulta/Denuncia)
- Ubicación (Departamento, Provincia, Distrito)
- Establecimientos involucrados (si aplica)

### Sección 2: Evolución de Casos por Mes
- **Tipo de gráfico**: Líneas múltiples
- **Período**: Año en curso (2026)
- **Series**: Tres líneas, una por cada nivel de severidad
  - **Leve**: Línea verde (#2ecc71)
  - **Moderado**: Línea naranja (#f39c12)
  - **Severo**: Línea roja (#e74c3c)
- **Eje X**: Meses del año (Ene-Dic)
- **Eje Y**: Cantidad de casos
- **Tooltip**: Compartido entre las tres series

## Ubicación de Datos
La ubicación de los casos está basada en el **departamento, provincia y distrito del solicitante**, no del establecimiento involucrado.

## Tecnologías Utilizadas
- **Highcharts**: Gráfico de líneas para evolución mensual
- **Highcharts Maps**: Visualización del mapa del Perú
- **@highcharts/map-collection**: Datos geográficos del Perú
- **Angular Reactive Forms**: Manejo de filtros
- **RxJS**: Gestión de datos asíncronos

## Mapeo de Códigos UBIGEO
El sistema utiliza los primeros 2 dígitos del código UBIGEO para identificar departamentos:
- 01: Amazonas (pe-am)
- 02: Áncash (pe-an)
- 03: Apurímac (pe-ap)
- 04: Arequipa (pe-ar)
- 05: Ayacucho (pe-ay)
- 06: Cajamarca (pe-cj)
- 07: Callao (pe-cl)
- 08: Cusco (pe-cs)
- 09: Huancavelica (pe-hv)
- 10: Huánuco (pe-hc)
- 11: Ica (pe-ic)
- 12: Junín (pe-ju)
- 13: La Libertad (pe-ll)
- 14: Lambayeque (pe-lb)
- 15: Lima (pe-lp)
- 16: Loreto (pe-lo)
- 17: Madre de Dios (pe-md)
- 18: Moquegua (pe-mq)
- 19: Pasco (pe-pa)
- 20: Piura (pe-pi)
- 21: Puno (pe-pu)
- 22: San Martín (pe-sm)
- 23: Tacna (pe-ta)
- 24: Tumbes (pe-tu)
- 25: Ucayali (pe-uc)

## Cambios Realizados
- **Eliminada**: Librería ArcGIS JavaScript API
- **Reemplazada**: Por Highcharts Maps (más ligero y consistente con IPRESS)
- **Mejorada**: Interfaz de usuario con diseño similar a módulo IPRESS
- **Agregada**: Funcionalidad de filtros en cascada
- **Agregada**: Gráfico de evolución mensual por severidad

## Archivos Modificados
- `src/app/presentation/pages/reportes/reportes.component.ts`: Componente completamente reescrito
- `src/index.html`: Eliminadas referencias a ArcGIS
- `docs/REPORTES_MAPA.md`: Documentación actualizada

## Notas de Implementación
- El mapa y el gráfico se inicializan 1 segundo después del renderizado para asegurar que los contenedores estén disponibles
- Los filtros usan los mismos repositorios de UBIGEO que el módulo de creación de casos
- La lista muestra máximo 100 casos por rendimiento
- El gráfico de evolución filtra automáticamente los casos del año actual
- El componente es standalone y no requiere módulos adicionales
