# Casos Mock - Datos de Prueba

## Resumen General

El sistema cuenta con **8 casos mock** completos con toda la información necesaria para pruebas y demostración.

## Distribución de Casos

### Por Estado

| Estado | Cantidad | IDs |
|--------|----------|-----|
| REGISTRADO | 2 | 2, 4 |
| EN_PROCESO | 3 | 1, 6, 8 |
| PENDIENTE_INFORME | 2 | 3, 5 |
| RESUELTO | 1 | 7 |
| **Total** | **8** | |

### Por Severidad

| Severidad | Cantidad | IDs |
|-----------|----------|-----|
| LEVE | 3 | 2, 4, 7 |
| MODERADO | 3 | 1, 6, (otro) |
| SEVERO | 2 | 3, 5, 8 |

### Por Tipo de Solicitud

| Tipo | Cantidad | IDs |
|------|----------|-----|
| CONSULTA | 3 | 2, 4, 7 |
| DENUNCIA | 5 | 1, 3, 5, 6, 8 |

### Por Macro Región

| Macro Región | Cantidad | Departamentos |
|--------------|----------|---------------|
| Lima | 2 | Lima |
| Sur | 2 | Arequipa, Cusco |
| Norte | 3 | La Libertad, Piura, Lambayeque |
| Centro | 1 | Junín |

## Detalle de Casos

### Caso 1: 29736-2026
- **Estado**: EN_PROCESO
- **Tipo**: DENUNCIA
- **Severidad**: MODERADO
- **Solicitante**: YANETH SOLANO NUÑEZ
- **Ubicación**: Villa María del Triunfo, Lima
- **Descripción**: Solicitud de intermediación por atención médica
- **Establecimientos**: 2 (TRAVESÍA MENTAL, BIOSMED)
- **SLA**: 6 días transcurridos, 19 restantes

### Caso 2: 29735-2026
- **Estado**: REGISTRADO
- **Tipo**: CONSULTA
- **Severidad**: LEVE
- **Solicitante**: MADELEINE ULLOA JIMENEZ
- **Ubicación**: San Miguel, Lima
- **Descripción**: Consulta sobre cobertura de seguro
- **Establecimientos**: 1 (CENTRO DE SALUD SAN MIGUEL)
- **SLA**: 7 días transcurridos, 18 restantes

### Caso 3: 29734-2026
- **Estado**: PENDIENTE_INFORME
- **Tipo**: DENUNCIA
- **Severidad**: SEVERO
- **Solicitante**: JUAN PEREZ GARCIA
- **Ubicación**: Cercado, Arequipa
- **Descripción**: Denuncia por negligencia médica
- **Establecimientos**: 3 (CENTRO OPTICO, Consultorio Dental, HOSPITAL REGIONAL)
- **SLA**: 25 días transcurridos, 0 restantes ⚠️ VENCIDO

### Caso 4: 29733-2026
- **Estado**: REGISTRADO
- **Tipo**: CONSULTA
- **Severidad**: LEVE
- **Solicitante**: CARLOS RODRIGUEZ MARTINEZ
- **Ubicación**: Cusco, Cusco
- **Descripción**: Consulta sobre procedimiento de atención en emergencia
- **Establecimientos**: 1 (HOSPITAL REGIONAL CUSCO)
- **SLA**: 4 días transcurridos, 21 restantes

### Caso 5: 29732-2026
- **Estado**: PENDIENTE_INFORME
- **Tipo**: DENUNCIA
- **Severidad**: SEVERO
- **Solicitante**: MARIA GONZALES LOPEZ
- **Ubicación**: Trujillo, La Libertad
- **Descripción**: Denuncia por negativa de atención en servicio de emergencia
- **Establecimientos**: 2 (HOSPITAL REGIONAL DOCENTE DE TRUJILLO, CENTRO DE SALUD WICHANZAO)
- **SLA**: 8 días transcurridos, 17 restantes

### Caso 6: 29731-2026
- **Estado**: EN_PROCESO
- **Tipo**: DENUNCIA
- **Severidad**: MODERADO
- **Solicitante**: LUIS FERNANDEZ CASTRO
- **Ubicación**: Piura, Piura
- **Descripción**: Denuncia por demora en entrega de resultados de laboratorio
- **Establecimientos**: 1 (HOSPITAL CAYETANO HEREDIA)
- **SLA**: 3 días transcurridos, 22 restantes

### Caso 7: 29730-2026
- **Estado**: RESUELTO
- **Tipo**: CONSULTA
- **Severidad**: LEVE
- **Solicitante**: ANA TORRES RAMIREZ
- **Ubicación**: Chiclayo, Lambayeque
- **Descripción**: Consulta sobre cobertura de tratamiento oncológico
- **Establecimientos**: 1 (HOSPITAL LAS MERCEDES)
- **SLA**: 12 días transcurridos, 13 restantes

### Caso 8: 29729-2026
- **Estado**: EN_PROCESO
- **Tipo**: DENUNCIA
- **Severidad**: SEVERO
- **Solicitante**: PEDRO VARGAS SILVA
- **Ubicación**: Huancayo, Junín
- **Descripción**: Denuncia por mala praxis médica en cirugía programada
- **Establecimientos**: 3 (HOSPITAL REGIONAL, CLINICA SAN JUAN DE DIOS, CENTRO MEDICO ESPECIALIZADO)
- **SLA**: 5 días transcurridos, 20 restantes

## Casos en "Mis Pendientes"

Los siguientes **5 casos** aparecen en la bandeja de "Mis Pendientes" (estados EN_PROCESO y PENDIENTE_INFORME):

1. **29736-2026** - EN_PROCESO - MODERADO - Lima
2. **29734-2026** - PENDIENTE_INFORME - SEVERO - Arequipa ⚠️
3. **29732-2026** - PENDIENTE_INFORME - SEVERO - La Libertad
4. **29731-2026** - EN_PROCESO - MODERADO - Piura
5. **29729-2026** - EN_PROCESO - SEVERO - Junín

## Establecimientos Involucrados

Total de establecimientos únicos: **13**

### Por Tipo de Institución
- MINISTERIO DE SALUD: 8 establecimientos
- PRIVADO: 5 establecimientos

### Por Tipo de Establecimiento
- Hospitales: 7
- Centros de Salud: 2
- Consultorios: 2
- Clínicas: 1
- Centros Médicos: 1

### Por Categoría
- III-1: 3 establecimientos
- II-2: 4 establecimientos
- I-4: 2 establecimientos
- I-3: 2 establecimientos
- I-2: 1 establecimiento
- I-1: 1 establecimiento

## Canales de Ingreso

| Canal | Cantidad |
|-------|----------|
| Página web | 3 |
| Correo Electrónico | 2 |
| Presencial | 2 |
| Telefónico | 1 |

## Alertas y Prioridades

### Casos con Alerta de Vencimiento
- **Caso 3 (29734-2026)**: 0 días restantes ⚠️

### Casos Próximos a Vencer (< 5 días)
- Ninguno actualmente

### Casos Críticos (SEVERO)
- **Caso 3**: PENDIENTE_INFORME - Arequipa
- **Caso 5**: PENDIENTE_INFORME - La Libertad
- **Caso 8**: EN_PROCESO - Junín

## Uso en el Sistema

Estos casos mock se utilizan en:

1. **Dashboard**: Estadísticas generales, gráficos por severidad y estado
2. **Gestión de Casos**: Lista completa de 8 casos con filtros
3. **Mis Pendientes**: 5 casos pendientes de revisión
4. **Detalle de Caso**: Información completa con establecimientos
5. **Reportes**: Análisis por región, tipo, severidad
6. **Workflow**: Historial de gestiones

## Datos Completos

Cada caso incluye:
- ✓ Información general (expediente, fechas, canal, área)
- ✓ Datos del solicitante (documento, nombres, contacto, ubicación)
- ✓ Descripción detallada del caso
- ✓ Clasificación (tipo, severidad, estado)
- ✓ Competencias (SUSALUD, PROTT)
- ✓ Macro región
- ✓ ID SGD (cuando aplica)
- ✓ SLA (días transcurridos y restantes)
- ✓ Establecimientos involucrados (1-3 por caso)
- ✓ Datos completos de cada establecimiento (código, nombre, tipo, ubicación, contacto)

## Notas para Desarrollo

- Los casos están distribuidos geográficamente por todo el Perú
- Incluyen diferentes tipos de problemas de salud
- Representan diversos niveles de complejidad
- Permiten probar todos los filtros y búsquedas
- Cubren todos los estados del workflow
- Incluyen casos con y sin alerta de vencimiento
- Tienen establecimientos de diferentes tipos e instituciones
