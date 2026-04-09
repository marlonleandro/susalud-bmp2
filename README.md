# SUSALUD BPM - Sistema de Gestión de Consultas y Denuncias

Aplicación frontend moderna desarrollada con Angular 17 y arquitectura hexagonal para la gestión de consultas y denuncias ciudadanas en el sector salud del Perú.

## Características Principales

### Módulos Implementados

1. **Dashboard**: Monitoreo en tiempo real con indicadores POI/PEI
2. **Gestión de Casos**: Registro, búsqueda y seguimiento de expedientes
3. **Workflow Configurable**: Procesos M2.P03, M2.P06 y M2.P07
4. **Reportería**: Análisis y exportación de datos
5. **IA Aplicada**: Clasificación inteligente y chatbot
6. **Integración SGD**: Sincronización bidireccional

## Instalación

```bash
npm install
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Arquitectura

- **Domain**: Modelos y puertos (interfaces)
- **Application**: Casos de uso
- **Infrastructure**: Implementaciones mock
- **Presentation**: Componentes Angular standalone

## Tecnologías

- Angular 17
- TypeScript
- RxJS
- CSS moderno con diseño responsive
