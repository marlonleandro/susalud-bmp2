# Casos Mock - Datos de Prueba

## Resumen General

El sistema cuenta con **14 casos mock** completos con toda la información necesaria para pruebas y demostración.

## Distribución de Casos

### Por Fecha de Registro

| Mes | Cantidad | IDs |
|-----|----------|-----|
| Enero 2026 | 2 | 101, 102 |
| Febrero 2026 | 2 | 103, 104 |
| Marzo 2026 | 2 | 3, 7 |
| Abril 2026 | 6 | 1, 2, 4, 5, 6, 8 |
| Mayo 2026 | 2 | 105, 106 |
| **Total** | **14** | |

### Por Estado

| Estado | Cantidad | IDs |
|--------|----------|-----|
| REGISTRADO | 4 | 2, 4, 105 |
| EN_PROCESO | 4 | 1, 6, 8, 106 |
| PENDIENTE_INFORME | 2 | 3, 5 |
| RESUELTO | 4 | 7, 101, 102, 103, 104 |
| **Total** | **14** | |

### Por Severidad

| Severidad | Cantidad | IDs |
|-----------|----------|-----|
| LEVE | 5 | 2, 4, 7, 101, 104 |
| MODERADO | 5 | 1, 6, 102, 105 |
| SEVERO | 4 | 3, 5, 8, 103, 106 |

### Por Tipo de Solicitud

| Tipo | Cantidad | IDs |
|------|----------|-----|
| CONSULTA | 4 | 2, 4, 7, 104 |
| DENUNCIA | 10 | 1, 3, 5, 6, 8, 101, 102, 103, 105, 106 |

### Por Macro Región

| Macro Región | Cantidad | Departamentos |
|--------------|----------|---------------|
| Lima | 4 | Lima (4 casos) |
| Sur | 4 | Arequipa (2), Cusco (2) |
| Norte | 4 | La Libertad, Piura (2), Lambayeque |
| Centro | 2 | Junín (2) |

## Casos para Gráfico de Evolución Mensual

Los siguientes casos están distribuidos estratégicamente para visualizar el gráfico de evolución:

### Enero 2026
1. **Caso 101** - 15/01/2026 - LEVE - Lima
2. **Caso 102** - 22/01/2026 - MODERADO - Cusco

### Febrero 2026
3. **Caso 103** - 10/02/2026 - SEVERO - Arequipa
4. **Caso 104** - 25/02/2026 - LEVE - Piura

### Mayo 2026
5. **Caso 105** - 08/05/2026 - MODERADO - Lima
6. **Caso 106** - 20/05/2026 - SEVERO - Junín

## Detalle de Casos Nuevos (Enero, Febrero, Mayo)

### Caso 101: 00123-2026 (Enero)
- **Fecha**: 15 de enero 2026
- **Estado**: RESUELTO
- **Tipo**: DENUNCIA
- **Severidad**: LEVE
- **Solicitante**: ROSA MENDOZA QUISPE
- **Ubicación**: San Juan de Lurigancho, Lima
- **Descripción**: Solicitud de información sobre cobertura de medicamentos
- **Establecimientos**: 1 (CENTRO DE SALUD SAN JUAN)

### Caso 102: 00456-2026 (Enero)
- **Fecha**: 22 de enero 2026
- **Estado**: RESUELTO
- **Tipo**: DENUNCIA
- **Severidad**: MODERADO
- **Solicitante**: MIGUEL CHAVEZ ROJAS
- **Ubicación**: Wanchaq, Cusco
- **Descripción**: Denuncia por demora en programación de cirugía
- **Establecimientos**: 1 (HOSPITAL ANTONIO LORENA)

### Caso 103: 03789-2026 (Febrero)
- **Fecha**: 10 de febrero 2026
- **Estado**: RESUELTO
- **Tipo**: DENUNCIA
- **Severidad**: SEVERO
- **Solicitante**: CARMEN FLORES DIAZ
- **Ubicación**: Cayma, Arequipa
- **Descripción**: Denuncia por negativa de atención en emergencia por falta de cama UCI
- **Establecimientos**: 2 (HOSPITAL GOYENECHE, CLINICA AREQUIPA)

### Caso 104: 04123-2026 (Febrero)
- **Fecha**: 25 de febrero 2026
- **Estado**: RESUELTO
- **Tipo**: CONSULTA
- **Severidad**: LEVE
- **Solicitante**: JORGE SANCHEZ VEGA
- **Ubicación**: Castilla, Piura
- **Descripción**: Consulta sobre proceso de reembolso de gastos médicos
- **Establecimientos**: 1 (CENTRO DE SALUD CASTILLA)

### Caso 105: 15678-2026 (Mayo)
- **Fecha**: 8 de mayo 2026
- **Estado**: REGISTRADO
- **Tipo**: DENUNCIA
- **Severidad**: MODERADO
- **Solicitante**: PATRICIA RAMOS GUTIERREZ
- **Ubicación**: Los Olivos, Lima
- **Descripción**: Denuncia por cobro indebido de servicios médicos
- **Establecimientos**: 2 (POLICLINICO LOS OLIVOS, CENTRO MEDICO SANTA ROSA)

### Caso 106: 16234-2026 (Mayo)
- **Fecha**: 20 de mayo 2026
- **Estado**: EN_PROCESO
- **Tipo**: DENUNCIA
- **Severidad**: SEVERO
- **Solicitante**: ROBERTO CASTILLO MORALES
- **Ubicación**: El Tambo, Junín
- **Descripción**: Denuncia por complicaciones post-operatorias no atendidas adecuadamente
- **Establecimientos**: 3 (CLINICA ORTEGA, CENTRO QUIRURGICO, LABORATORIO CLINICO)

## Detalle de Casos Existentes (Marzo-Abril)

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

Los siguientes **6 casos** aparecen en la bandeja de "Mis Pendientes" (estados EN_PROCESO, PENDIENTE_INFORME y REGISTRADO):

1. **29736-2026** - EN_PROCESO - MODERADO - Lima
2. **29734-2026** - PENDIENTE_INFORME - SEVERO - Arequipa ⚠️
3. **29732-2026** - PENDIENTE_INFORME - SEVERO - La Libertad
4. **29731-2026** - EN_PROCESO - MODERADO - Piura
5. **29729-2026** - EN_PROCESO - SEVERO - Junín
6. **15678-2026** - REGISTRADO - MODERADO - Lima (Mayo)
7. **16234-2026** - EN_PROCESO - SEVERO - Junín (Mayo)

## Establecimientos Involucrados

Total de establecimientos únicos: **22**

### Por Tipo de Institución
- MINISTERIO DE SALUD: 13 establecimientos
- PRIVADO: 9 establecimientos

### Por Tipo de Establecimiento
- Hospitales: 10
- Centros de Salud: 4
- Consultorios: 2
- Clínicas: 3
- Centros Médicos: 2
- Policlínicos: 1

### Por Categoría
- III-1: 5 establecimientos
- II-2: 6 establecimientos
- I-4: 4 establecimientos
- I-3: 4 establecimientos
- I-2: 2 establecimientos
- I-1: 1 establecimiento

## Canales de Ingreso

| Canal | Cantidad |
|-------|----------|
| Página web | 5 |
| Correo Electrónico | 3 |
| Presencial | 4 |
| Telefónico | 2 |

## Alertas y Prioridades

### Casos con Alerta de Vencimiento
- **Caso 3 (29734-2026)**: 0 días restantes ⚠️

### Casos Próximos a Vencer (< 5 días)
- Ninguno actualmente

### Casos Críticos (SEVERO)
- **Caso 3**: PENDIENTE_INFORME - Arequipa (Marzo)
- **Caso 5**: PENDIENTE_INFORME - La Libertad (Abril)
- **Caso 8**: EN_PROCESO - Junín (Abril)
- **Caso 103**: RESUELTO - Arequipa (Febrero)
- **Caso 106**: EN_PROCESO - Junín (Mayo)

## Uso en el Sistema

Estos casos mock se utilizan en:

1. **Dashboard**: Estadísticas generales, gráficos por severidad y estado
2. **Gestión de Casos**: Lista completa de 14 casos con filtros
3. **Mis Pendientes**: 7 casos pendientes de revisión
4. **Detalle de Caso**: Información completa con establecimientos
5. **Reportes - Mapa**: Visualización geográfica por departamento del solicitante
6. **Reportes - Gráfico de Evolución**: Análisis mensual por severidad (enero, febrero, mayo)
7. **Workflow**: Historial de gestiones

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
- **Casos distribuidos en enero, febrero y mayo 2026 para visualizar evolución temporal**
- **Cada mes tiene casos de diferentes severidades para el gráfico de líneas**
