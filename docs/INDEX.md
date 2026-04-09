# Índice de Documentación - SUSALUD BPM

## 📚 Documentación Principal

### [README.md](../README.md)
Documentación principal del proyecto con información general, instalación, características y tecnologías utilizadas.

### [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)
Resumen ejecutivo completo del proyecto con métricas, arquitectura y características destacadas.

---

## 🔐 Autenticación y Seguridad

### [AUTENTICACION.md](AUTENTICACION.md)
- Sistema de login
- Gestión de tokens
- Guards de autenticación
- Flujo de autenticación

---

## 📍 Datos Geográficos

### [UBIGEO.md](UBIGEO.md)
- Sistema de UBIGEO del INEI
- 1,861 distritos del Perú
- Selectores en cascada
- Códigos oficiales de 6 dígitos

---

## 🏥 Establecimientos de Salud

### [IPRESS_MAPA.md](IPRESS_MAPA.md)
- Módulo de mapa de establecimientos
- 35,408 establecimientos del RENIPRESS
- Mapa interactivo con Highcharts Maps
- Filtros en cascada por ubicación
- Búsqueda y visualización

**Características**:
- Mapa del Perú con 25 departamentos
- Clic en departamento filtra automáticamente
- Lista con información detallada
- Colores según cantidad de establecimientos

---

## 📊 Reportería y Análisis

### [REPORTES_MAPA.md](REPORTES_MAPA.md)
- Módulo de reportería con mapas y gráficos
- Mapa de casos por departamento
- Gráfico de evolución mensual por severidad
- Filtros en cascada por ubicación del solicitante

**Secciones**:
1. **Mapa Interactivo**: Casos agrupados por departamento
2. **Evolución Mensual**: Gráfico de líneas con tres series (Leve, Moderado, Severo)

---

## 📋 Casos y Datos de Prueba

### [CASOS_MOCK.md](CASOS_MOCK.md)
- 14 casos mock completos
- Distribución por fecha, estado, severidad
- Casos de enero, febrero y mayo 2026
- Información detallada de cada caso
- Establecimientos involucrados

**Distribución**:
- 5 casos Leve
- 5 casos Moderado
- 4 casos Severo
- 4 Consultas, 10 Denuncias

---

## 🗺️ Mapas Interactivos

### Tecnología Utilizada
- **Highcharts Maps**: Visualización de mapas
- **@highcharts/map-collection**: Datos geográficos oficiales del Perú
- **Highcharts**: Gráficos de evolución

### Módulos con Mapas

1. **IPRESS** ([IPRESS_MAPA.md](IPRESS_MAPA.md))
   - Mapa de establecimientos de salud
   - 35,408 establecimientos
   - Filtros por ubicación

2. **Reportería** ([REPORTES_MAPA.md](REPORTES_MAPA.md))
   - Mapa de casos por departamento
   - Gráfico de evolución temporal
   - Análisis por severidad

---

## 🏗️ Arquitectura y Estructura

### Arquitectura Hexagonal
```
domain/          # Modelos y puertos (interfaces)
infrastructure/  # Implementaciones (mock, guards, services)
presentation/    # Componentes Angular standalone
```

### Principios Aplicados
- Dependency Inversion
- Separation of Concerns
- Single Responsibility
- Standalone Components

---

## 📦 Datos Mock Disponibles

| Tipo | Cantidad | Descripción |
|------|----------|-------------|
| UBIGEO | 1,861 | Departamentos, Provincias, Distritos |
| IPRESS | 35,408 | Establecimientos de salud |
| Casos | 14 | Casos completos con datos |

---

## 🚀 Inicio Rápido

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm start
```

### Build Producción
```bash
npm run build
```

### Credenciales
- **Usuario**: admin
- **Contraseña**: admin123

---

## 📈 Métricas del Proyecto

### Build
- Tamaño inicial: 17.38 MB (1.62 MB comprimido)
- 15 chunks con lazy loading
- Sin errores

### Datos
- 1,861 distritos del Perú
- 35,408 establecimientos de salud
- 14 casos mock completos
- 22 establecimientos únicos en casos

### Cobertura Geográfica
- 25 departamentos
- 196 provincias
- Todo el territorio peruano

---

## 🔗 Enlaces Rápidos

- [Instalación y Configuración](../README.md#instalación)
- [Rutas del Sistema](../README.md#-rutas-principales)
- [Tecnologías Utilizadas](../README.md#-tecnologías)
- [Arquitectura](../README.md#arquitectura)
- [Próximos Pasos](../README.md#-próximos-pasos)

---

## 📝 Notas Importantes

### Mapeo de Códigos UBIGEO
Los primeros 2 dígitos del código UBIGEO identifican el departamento:
- 01: Amazonas
- 07: Callao
- 08: Cusco
- 10: Huánuco
- 15: Lima
- 18: Moquegua
- ... (25 departamentos)

### Ubicación de Casos
La ubicación está basada en el **departamento, provincia y distrito del solicitante**, no del establecimiento involucrado.

### Filtrado de Datos
- **Distrito**: UBIGEO exacto (6 dígitos)
- **Provincia**: Primeros 4 dígitos del UBIGEO
- **Departamento**: Primeros 2 dígitos del UBIGEO

---

## 🆘 Soporte

Para más información, consultar:
1. README principal
2. Documentación específica de cada módulo
3. Código fuente con comentarios

---

**Última actualización**: Abril 2026  
**Versión**: 1.0.0
