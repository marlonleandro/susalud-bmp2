# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.0.0] - 2026-04-09

### ✨ Nuevas Características

#### Módulo IPRESS - Mapa de Establecimientos
- Agregado mapa interactivo del Perú con Highcharts Maps
- Visualización de 35,408 establecimientos de salud del RENIPRESS
- Filtros en cascada: Departamento → Provincia → Distrito
- Clic en departamento del mapa filtra automáticamente la lista
- Lista con información detallada de cada establecimiento
- Colores según cantidad de establecimientos por departamento

#### Módulo Reportería - Mapas y Gráficos
- Reemplazado ArcGIS por Highcharts Maps para consistencia
- Agregado mapa de casos por departamento del solicitante
- Implementado gráfico de evolución mensual por severidad
- Tres líneas de tendencia: Leve (verde), Moderado (naranja), Severo (rojo)
- Filtros en cascada por ubicación del solicitante
- Lista detallada de casos con información completa

#### Casos Mock Adicionales
- Agregados 6 casos nuevos para análisis temporal
- 2 casos de enero 2026 (Leve, Moderado)
- 2 casos de febrero 2026 (Severo, Leve)
- 2 casos de mayo 2026 (Moderado, Severo)
- Total: 14 casos mock completos

### 🔄 Cambios

#### Tecnología de Mapas
- **Eliminado**: ArcGIS JavaScript API 4.30
- **Agregado**: Highcharts Maps 11.4.0
- **Agregado**: @highcharts/map-collection 1.2.0
- **Razón**: Mayor consistencia, menor tamaño, mejor integración

#### Mapeo de Departamentos
- Implementado mapeo por código UBIGEO (2 dígitos)
- Corregidos códigos hc-key para todos los departamentos:
  - Cusco: pe-cs (antes pe-cu)
  - Huánuco: pe-hc (antes pe-hu)
  - Lima: pe-lp (antes pe-li)
  - Moquegua: pe-mq (antes pe-mo)
- Ahora todos los 25 departamentos se visualizan correctamente

#### Filtrado de Datos
- Mejorado filtrado por UBIGEO exacto
- Implementado filtrado jerárquico:
  - Distrito: 6 dígitos completos
  - Provincia: 4 primeros dígitos
  - Departamento: 2 primeros dígitos

### 📚 Documentación

#### Nuevos Documentos
- `docs/IPRESS_MAPA.md`: Documentación del módulo IPRESS
- `docs/REPORTES_MAPA.md`: Documentación del módulo Reportería
- `docs/RESUMEN_PROYECTO.md`: Resumen ejecutivo del proyecto
- `docs/INDEX.md`: Índice de toda la documentación
- `CHANGELOG.md`: Historial de cambios

#### Documentos Actualizados
- `README.md`: Actualizado con nuevas características
- `docs/CASOS_MOCK.md`: Agregados 6 casos nuevos

#### Documentos Eliminados
- `docs/REPORTES.md`: Reemplazado por REPORTES_MAPA.md

### 🐛 Correcciones

#### Mapas
- Corregido problema de departamentos no visibles en el mapa
- Solucionado mapeo incorrecto de códigos hc-key
- Corregido filtrado por nombre de departamento (ahora usa código UBIGEO)

#### Componentes
- Corregido binding de distrito en selector (codigoUbigeo vs ubigeo)
- Corregido warning de CSS (align-items: start → flex-start)
- Corregido tipo de tooltip en Highcharts

### 🏗️ Build

#### Métricas
- Tamaño inicial: 17.38 MB (1.62 MB comprimido)
- 15 chunks con lazy loading
- Chunk IPRESS: 354.71 kB (110.48 kB comprimido)
- Chunk Reportes: 11.17 kB (3.30 kB comprimido)
- Chunk Mapa GeoJSON: 34.70 kB (7.14 kB comprimido)

#### Estado
- ✅ Build exitoso sin errores
- ⚠️ Warnings: Solo CommonJS de Highcharts (normales)
- ✅ Todos los diagnósticos pasados

### 📦 Dependencias

#### Agregadas
- `@highcharts/map-collection@1.2.0`: Datos geográficos del Perú

#### Actualizadas
- Ninguna

#### Eliminadas
- Referencias a ArcGIS JavaScript API (CDN)

### 🔧 Configuración

#### Archivos Modificados
- `src/index.html`: Eliminadas referencias a ArcGIS
- `tsconfig.json`: Ya tenía resolveJsonModule y esModuleInterop

### 📊 Datos

#### UBIGEO
- 1,861 distritos del Perú (sin cambios)
- Códigos oficiales del INEI

#### IPRESS
- 35,408 establecimientos de salud (sin cambios)
- Datos del RENIPRESS

#### Casos Mock
- **Antes**: 8 casos
- **Ahora**: 14 casos
- **Agregados**: 6 casos (enero, febrero, mayo 2026)

### 🎯 Rutas

#### Nuevas Rutas
- `/ipress`: Mapa de establecimientos de salud

#### Rutas Existentes
- Todas las rutas anteriores se mantienen sin cambios

### 🚀 Mejoras de Rendimiento

- Lazy loading de mapas (carga diferida)
- Inicialización con timeout para asegurar DOM
- Filtrado optimizado por código UBIGEO
- Límite de 100 casos en lista para mejor rendimiento

### 🔐 Seguridad

- Sin cambios en el sistema de autenticación
- Todas las rutas siguen protegidas por guard

---

## [0.9.0] - 2026-04-08 (Versión Anterior)

### Características Iniciales
- Sistema de autenticación
- Dashboard con indicadores
- Gestión de casos completa
- Mis pendientes
- Reportería con ArcGIS
- Workflow configurable
- IA aplicada
- Integración SGD
- 8 casos mock
- 35,408 establecimientos IPRESS
- 1,861 distritos UBIGEO

---

## Formato

Este changelog sigue el formato de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

### Tipos de Cambios
- `✨ Nuevas Características` - para nuevas funcionalidades
- `🔄 Cambios` - para cambios en funcionalidades existentes
- `🐛 Correcciones` - para corrección de bugs
- `📚 Documentación` - para cambios en documentación
- `🏗️ Build` - para cambios en el sistema de build
- `📦 Dependencias` - para cambios en dependencias
- `🔧 Configuración` - para cambios en configuración
- `📊 Datos` - para cambios en datos mock
- `🎯 Rutas` - para cambios en rutas
- `🚀 Mejoras de Rendimiento` - para mejoras de rendimiento
- `🔐 Seguridad` - para cambios relacionados con seguridad
