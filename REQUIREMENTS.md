# REQUIREMENTS - SUSALUD BPM

## 📋 Información del Documento

**Proyecto**: SUSALUD BPM - Sistema de Gestión de Consultas y Denuncias  
**Cliente**: SUSALUD (Superintendencia Nacional de Salud - Perú)  
**Versión**: 1.1.0  
**Fecha**: Abril 2026  
**Estado**: Documento Vigente

---

## 🎯 Objetivo del Sistema

Desarrollar un sistema web moderno para la gestión integral de consultas y denuncias ciudadanas relacionadas con el sector salud en Perú, permitiendo el registro, seguimiento, análisis y resolución de casos de manera eficiente y transparente.

---

## 📊 Alcance del Proyecto

### Incluye
- Sistema frontend con Angular 17
- Gestión completa de casos (consultas y denuncias)
- Gestión de especialistas médicos
- Visualización geográfica de casos y establecimientos
- Reportería y análisis con gráficos interactivos
- Workflow configurable
- Integración con Sistema de Gestión Documental (SGD)
- Asistente virtual con IA
- Registro público de casos sin autenticación

### No Incluye
- Backend real (se usa datos mock)
- Base de datos persistente
- Integración real con SGD
- Implementación real de IA
- Notificaciones por email/SMS
- Firma digital
- Generación de documentos oficiales

---

## 🔐 Requerimientos Funcionales

### RF-001: Autenticación y Seguridad

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RF-001.1: Inicio de Sesión
- El sistema debe permitir el inicio de sesión con usuario y contraseña
- El sistema debe validar las credenciales ingresadas
- El sistema debe mostrar mensajes de error claros en caso de credenciales incorrectas
- El sistema debe almacenar el token de sesión en localStorage
- El sistema debe redirigir al dashboard después de un login exitoso

#### RF-001.2: Gestión de Sesión
- El sistema debe mantener la sesión activa mientras el token sea válido
- El sistema debe permitir cerrar sesión desde cualquier página
- El sistema debe limpiar el token al cerrar sesión
- El sistema debe redirigir al login al cerrar sesión

#### RF-001.3: Protección de Rutas
- El sistema debe proteger las rutas privadas con un guard de autenticación
- El sistema debe redirigir al login si se intenta acceder sin autenticación
- El sistema debe permitir acceso público solo a login y registro público

**Criterios de Aceptación**:
- Usuario puede iniciar sesión con credenciales válidas
- Usuario no puede acceder a rutas protegidas sin autenticación
- Usuario puede cerrar sesión correctamente

---

### RF-002: Dashboard y Visualización

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RF-002.1: Indicadores Principales
- El sistema debe mostrar el total de casos registrados
- El sistema debe mostrar el total de casos resueltos
- El sistema debe mostrar el total de casos en proceso
- El sistema debe mostrar el total de casos con alerta de vencimiento
- Los indicadores deben actualizarse en tiempo real

#### RF-002.2: Gráficos Estadísticos
- El sistema debe mostrar un gráfico de casos por severidad (Leve, Moderado, Severo)
- El sistema debe mostrar un gráfico de casos por estado
- Los gráficos deben ser interactivos (tooltips, zoom)
- Los gráficos deben usar colores diferenciados

#### RF-002.3: Tabla de Casos Recientes
- El sistema debe mostrar los últimos 10 casos registrados
- La tabla debe incluir: expediente, solicitante, tipo, severidad, estado, fecha
- La tabla debe permitir clic para ver detalle del caso
- La tabla debe mostrar badges de estado con colores

**Criterios de Aceptación**:
- Dashboard muestra todos los indicadores correctamente
- Gráficos son interactivos y visuales
- Tabla de casos recientes es navegable

---

### RF-003: Gestión de Casos

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RF-003.1: Registro de Casos (Usuarios Autenticados)
- El sistema debe permitir registrar nuevos casos (consultas o denuncias)
- El sistema debe solicitar canal de ingreso
- El sistema debe solicitar tipo de solicitud (Consulta/Denuncia)
- El sistema debe solicitar severidad (Leve/Moderado/Severo)
- El sistema debe solicitar descripción detallada del caso
- El sistema debe generar número de expediente automáticamente (formato: XXXXX-2026)

#### RF-003.2: Datos del Solicitante
- El sistema debe solicitar tipo de documento (DNI, CE, Pasaporte)
- El sistema debe solicitar número de documento
- El sistema debe solicitar nombres completos (nombres, apellido paterno, apellido materno)
- El sistema debe solicitar correo electrónico (opcional)
- El sistema debe solicitar teléfono (opcional)
- El sistema debe solicitar dirección (opcional)
- El sistema debe solicitar ubicación con selectores en cascada (Departamento → Provincia → Distrito)

#### RF-003.3: Datos del Afectado (Obligatorio)
- El sistema debe solicitar tipo de documento del afectado
- El sistema debe solicitar número de documento del afectado
- El sistema debe solicitar nombres completos del afectado
- El sistema debe solicitar fecha de nacimiento del afectado
- El sistema debe solicitar género del afectado (Masculino/Femenino)
- El sistema debe solicitar número de historia clínica (opcional)
- El sistema debe solicitar tipo de seguro (ESSALUD/EPS/OTRO)
- El sistema debe solicitar correo electrónico del afectado (opcional)
- El sistema debe solicitar teléfono del afectado (opcional)
- El sistema debe solicitar dirección del afectado
- El sistema debe solicitar ubicación del afectado con selectores en cascada

#### RF-003.4: Establecimientos Involucrados
- El sistema debe permitir buscar establecimientos por ubicación (Departamento → Provincia → Distrito)
- El sistema debe mostrar lista de establecimientos disponibles en el distrito seleccionado
- El sistema debe permitir agregar múltiples establecimientos al caso
- El sistema debe mostrar información completa del establecimiento (código, nombre, tipo, clasificación, categoría, ubicación, dirección, teléfono)
- El sistema debe permitir eliminar establecimientos agregados

#### RF-003.5: Asignación de Especialista
- El sistema debe permitir asignar un especialista médico al caso (opcional)
- El sistema debe mostrar lista de especialistas activos
- El sistema debe mostrar información del especialista (nombres, especialidad)
- El sistema debe permitir dejar el caso sin asignar

#### RF-003.6: Lista de Casos
- El sistema debe mostrar lista paginada de todos los casos
- El sistema debe permitir filtrar por estado (Todos, Registrado, En Proceso, Resuelto)
- El sistema debe permitir filtrar por severidad (Todos, Leve, Moderado, Severo)
- El sistema debe permitir filtrar por tipo (Todos, Consulta, Denuncia)
- El sistema debe permitir buscar por número de expediente o nombre del solicitante
- El sistema debe mostrar columnas: expediente, solicitante, tipo, severidad, estado, especialista, fecha, días transcurridos
- El sistema debe usar badges de colores para estados y severidades
- El sistema debe mostrar alertas visuales para casos próximos a vencer

#### RF-003.7: Detalle de Caso
- El sistema debe mostrar toda la información del caso
- El sistema debe mostrar datos del solicitante
- El sistema debe mostrar datos del afectado
- El sistema debe mostrar establecimientos involucrados
- El sistema debe mostrar especialista asignado (si existe)
- El sistema debe mostrar historial de gestiones
- El sistema debe calcular días transcurridos y días restantes
- El sistema debe mostrar alerta si el caso está próximo a vencer

**Criterios de Aceptación**:
- Usuario puede registrar casos completos con todos los datos requeridos
- Usuario puede buscar y filtrar casos eficientemente
- Usuario puede ver detalle completo de cualquier caso
- Sistema valida todos los campos obligatorios
- Sistema genera expediente automáticamente

---

### RF-004: Gestión de Especialistas

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RF-004.1: Registro de Especialistas
- El sistema debe permitir registrar nuevos especialistas médicos
- El sistema debe solicitar tipo de documento (DNI, CE, Pasaporte)
- El sistema debe solicitar número de documento
- El sistema debe solicitar nombres completos (nombres, apellido paterno, apellido materno)
- El sistema debe solicitar especialidad médica
- El sistema debe solicitar fecha de ingreso
- El sistema debe solicitar correo electrónico
- El sistema debe solicitar teléfono
- El sistema debe establecer estado activo por defecto

#### RF-004.2: Especialidades Disponibles
El sistema debe soportar las siguientes especialidades:
- Medicina General
- Cardiología
- Pediatría
- Ginecología
- Traumatología
- Neurología
- Dermatología
- Oftalmología
- Psiquiatría
- Oncología
- Cirugía General
- Medicina Interna

#### RF-004.3: Lista de Especialistas
- El sistema debe mostrar lista de todos los especialistas
- El sistema debe permitir filtrar por especialidad
- El sistema debe permitir buscar por nombre
- El sistema debe mostrar: documento, nombres, especialidad, fecha ingreso, años de servicio, casos asignados, estado
- El sistema debe calcular años de servicio automáticamente
- El sistema debe mostrar badge de estado (Activo/Inactivo)

#### RF-004.4: Detalle de Especialista
- El sistema debe mostrar información completa del especialista
- El sistema debe mostrar estadísticas de casos asignados
- El sistema debe mostrar años de servicio
- El sistema debe mostrar información de contacto
- El sistema debe permitir editar información (futuro)
- El sistema debe permitir activar/desactivar especialista (futuro)

**Criterios de Aceptación**:
- Usuario puede registrar especialistas con todos los datos requeridos
- Usuario puede buscar y filtrar especialistas
- Usuario puede ver detalle completo de cualquier especialista
- Sistema calcula años de servicio correctamente
- Sistema valida todos los campos obligatorios

---

### RF-005: Registro Público de Casos

**Prioridad**: Media  
**Estado**: ✅ Implementado

#### RF-005.1: Acceso Público
- El sistema debe permitir acceso sin autenticación a la página de registro público
- El sistema debe mostrar enlace en la página de login
- El sistema debe mostrar formulario simplificado

#### RF-005.2: Información del Caso (Simplificado)
- El sistema debe solicitar solo tipo de solicitud (Consulta/Denuncia)
- El sistema debe solicitar descripción del caso
- El sistema debe establecer canal de ingreso como "Página web" automáticamente
- El sistema NO debe solicitar severidad (será asignada por especialista)
- El sistema NO debe permitir asignar especialista (será asignado por admin)

#### RF-005.3: Datos del Solicitante y Afectado
- El sistema debe solicitar los mismos datos que el registro autenticado
- El sistema debe validar todos los campos obligatorios
- El sistema debe incluir selectores UBIGEO en cascada
- El sistema debe permitir agregar establecimientos involucrados

#### RF-005.4: Confirmación de Registro
- El sistema debe mostrar mensaje de éxito: "Gracias por registrar su caso. Estaremos comunicándonos con usted cuando tengamos novedades sobre su caso."
- El sistema debe mostrar el número de expediente generado
- El sistema debe redirigir al login después de 5 segundos
- El sistema debe permitir volver al login manualmente

**Criterios de Aceptación**:
- Usuario no autenticado puede registrar casos
- Formulario es intuitivo y fácil de usar
- Sistema muestra confirmación clara
- Sistema redirige correctamente al login

---

### RF-006: Mapa de Establecimientos (IPRESS)

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RF-006.1: Visualización de Mapa
- El sistema debe mostrar mapa interactivo del Perú
- El sistema debe colorear departamentos según cantidad de establecimientos
- El sistema debe permitir hacer clic en departamentos para filtrar
- El sistema debe mostrar tooltips con información al pasar el mouse
- El sistema debe permitir zoom y navegación en el mapa

#### RF-006.2: Filtros de Búsqueda
- El sistema debe permitir filtrar por departamento
- El sistema debe permitir filtrar por provincia (dependiente de departamento)
- El sistema debe permitir filtrar por distrito (dependiente de provincia)
- Los filtros deben ser selectores en cascada
- El sistema debe actualizar el contador de establecimientos al filtrar

#### RF-006.3: Lista de Establecimientos
- El sistema debe mostrar lista de establecimientos filtrados
- El sistema debe limitar la visualización a 100 establecimientos
- El sistema debe mostrar: nombre, tipo, categoría, ubicación completa
- El sistema debe usar tarjetas con diseño visual atractivo
- El sistema debe permitir scroll en la lista

#### RF-006.4: Datos de Establecimientos
El sistema debe manejar 35,408 establecimientos con:
- Institución
- Código único
- Nombre del establecimiento
- Clasificación
- Tipo
- Departamento, Provincia, Distrito
- Código UBIGEO
- Dirección
- Categoría
- Teléfono
- Estado (Activo/Inactivo)
- Coordenadas (Norte, Este)
- RUC

**Criterios de Aceptación**:
- Mapa muestra todos los departamentos correctamente
- Filtros funcionan en cascada
- Lista muestra establecimientos filtrados
- Clic en mapa filtra automáticamente
- Datos de 35,408 establecimientos disponibles

---

### RF-007: Reportería y Análisis

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RF-007.1: Mapa de Casos
- El sistema debe mostrar mapa del Perú con casos por departamento
- El sistema debe colorear departamentos según cantidad de casos
- El sistema debe permitir hacer clic en departamentos para filtrar
- El sistema debe permitir filtros en cascada (Departamento → Provincia → Distrito)
- El sistema debe filtrar por ubicación del solicitante

#### RF-007.2: Lista de Casos en Mapa
- El sistema debe mostrar lista de casos filtrados
- El sistema debe limitar la visualización a 100 casos
- El sistema debe mostrar: solicitante, tipo, fecha, expediente, ubicación, establecimientos
- El sistema debe usar badges de colores para tipos (Consulta/Denuncia)
- El sistema debe permitir scroll en la lista

#### RF-007.3: Gráfico de Evolución Mensual
- El sistema debe mostrar gráfico de líneas de casos por mes
- El sistema debe mostrar tres series: Leve, Moderado, Severo
- El sistema debe analizar el año en curso (2026)
- El sistema debe usar colores diferenciados por severidad
- El sistema debe mostrar tooltips interactivos
- El sistema debe mostrar leyenda con las tres severidades

**Criterios de Aceptación**:
- Mapa de casos muestra distribución geográfica correctamente
- Filtros funcionan en cascada
- Gráfico de evolución muestra tendencias mensuales
- Colores son consistentes con el resto del sistema

---

### RF-008: Mis Pendientes

**Prioridad**: Media  
**Estado**: ✅ Implementado

#### RF-008.1: Lista de Pendientes
- El sistema debe mostrar casos pendientes de revisión
- El sistema debe permitir filtrar por estado
- El sistema debe permitir filtrar por severidad
- El sistema debe mostrar información resumida del caso
- El sistema debe indicar días transcurridos

#### RF-008.2: Detalle de Pendiente
- El sistema debe mostrar información completa del caso
- El sistema debe permitir aprobar el caso
- El sistema debe permitir rechazar el caso
- El sistema debe permitir agregar comentarios
- El sistema debe registrar historial de acciones

**Criterios de Aceptación**:
- Usuario puede ver sus casos pendientes
- Usuario puede aprobar/rechazar casos
- Sistema registra todas las acciones

---

### RF-009: Workflow Configurable

**Prioridad**: Media  
**Estado**: ✅ Implementado

#### RF-009.1: Gestión de Procesos
- El sistema debe soportar proceso M2.P03 (Consultas)
- El sistema debe soportar proceso M2.P06 (Denuncias)
- El sistema debe soportar proceso M2.P07 (Delegados)
- El sistema debe permitir configurar estados
- El sistema debe permitir configurar transiciones

#### RF-009.2: Reglas de Negocio
- El sistema debe permitir definir reglas dinámicas
- El sistema debe permitir configurar SLA por tipo de caso
- El sistema debe permitir configurar alertas automáticas
- El sistema debe permitir configurar escalamiento

**Criterios de Aceptación**:
- Procesos están configurados correctamente
- Reglas de negocio son aplicables
- SLA se calcula automáticamente

---

### RF-010: Integración SGD

**Prioridad**: Baja  
**Estado**: ✅ Implementado (Mock)

#### RF-010.1: Envío a SGD
- El sistema debe permitir enviar casos al SGD
- El sistema debe generar ID de SGD
- El sistema debe mostrar estado de integración
- El sistema debe registrar fecha de envío

#### RF-010.2: Consulta de Estado
- El sistema debe permitir consultar estado en SGD
- El sistema debe mostrar información de sincronización
- El sistema debe manejar errores de integración

**Criterios de Aceptación**:
- Casos pueden ser enviados al SGD (simulado)
- Estado de integración es visible
- Errores son manejados correctamente

---

### RF-011: Asistente Virtual con IA

**Prioridad**: Baja  
**Estado**: ✅ Implementado (Mock)

#### RF-011.1: Clasificación Automática
- El sistema debe sugerir clasificación de casos
- El sistema debe analizar descripción del caso
- El sistema debe sugerir severidad
- El sistema debe sugerir especialista

#### RF-011.2: Chatbot de Ayuda
- El sistema debe proporcionar asistente virtual
- El sistema debe responder preguntas frecuentes
- El sistema debe guiar en el registro de casos
- El sistema debe proporcionar información de procesos

**Criterios de Aceptación**:
- IA sugiere clasificaciones (simulado)
- Chatbot responde preguntas básicas
- Interfaz es intuitiva

---

## 🎨 Requerimientos No Funcionales

### RNF-001: Usabilidad

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RNF-001.1: Interfaz de Usuario
- El sistema debe tener una interfaz moderna y atractiva
- El sistema debe usar colores consistentes con la identidad de SUSALUD
- El sistema debe usar iconos intuitivos
- El sistema debe mostrar mensajes claros y comprensibles
- El sistema debe usar badges de colores para estados y severidades

#### RNF-001.2: Navegación
- El sistema debe tener menú lateral con todas las opciones
- El sistema debe permitir colapsar el menú lateral
- El sistema debe mantener el menú colapsado en pantallas pequeñas
- El sistema debe resaltar la opción activa en el menú
- El sistema debe mostrar breadcrumbs cuando sea necesario

#### RNF-001.3: Formularios
- Los formularios deben tener validación en tiempo real
- Los formularios deben mostrar mensajes de error claros
- Los formularios deben deshabilitar campos dependientes hasta que se complete el campo padre
- Los formularios deben mostrar ayuda contextual
- Los formularios deben tener botones de acción claros (Guardar, Cancelar)

**Criterios de Aceptación**:
- Interfaz es intuitiva y fácil de usar
- Navegación es fluida
- Formularios son claros y validados

---

### RNF-002: Rendimiento

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RNF-002.1: Tiempos de Respuesta
- Las páginas deben cargar en menos de 2 segundos
- Los filtros deben aplicarse en menos de 500ms
- Las búsquedas deben responder en menos de 1 segundo
- Los gráficos deben renderizar en menos de 1 segundo

#### RNF-002.2: Optimización
- El sistema debe usar lazy loading para rutas
- El sistema debe usar standalone components
- El sistema debe minimizar las llamadas a repositorios
- El sistema debe cachear datos cuando sea posible

**Criterios de Aceptación**:
- Tiempos de carga son aceptables
- Sistema es fluido y responsivo
- No hay bloqueos en la interfaz

---

### RNF-003: Responsive Design

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RNF-003.1: Adaptabilidad
- El sistema debe funcionar en desktop (1920x1080 y superiores)
- El sistema debe funcionar en tablets (768px - 1024px)
- El sistema debe funcionar en móviles (320px - 767px)
- El sistema debe adaptar el layout según el tamaño de pantalla

#### RNF-003.2: Comportamiento en Móviles
- En pantallas menores de 800px, el menú lateral debe mantenerse colapsado
- En pantallas menores de 800px, el botón hamburguesa no debe mostrarse
- En pantallas menores de 800px, los mapas deben mostrarse debajo de las listas
- En pantallas menores de 800px, las tablas deben ser scrollables horizontalmente

**Criterios de Aceptación**:
- Sistema funciona correctamente en todos los tamaños de pantalla
- Layout se adapta automáticamente
- Experiencia de usuario es óptima en móviles

---

### RNF-004: Seguridad

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RNF-004.1: Autenticación
- El sistema debe validar credenciales antes de permitir acceso
- El sistema debe almacenar tokens de forma segura en localStorage
- El sistema debe proteger todas las rutas privadas con guards
- El sistema debe cerrar sesión automáticamente si el token es inválido

#### RNF-004.2: Autorización
- El sistema debe verificar permisos antes de mostrar opciones
- El sistema debe restringir acceso a funcionalidades según rol (futuro)
- El sistema debe registrar todas las acciones de usuario (futuro)

#### RNF-004.3: Datos Sensibles
- El sistema debe manejar datos personales con cuidado
- El sistema debe validar todos los inputs para prevenir inyecciones
- El sistema debe sanitizar datos antes de mostrarlos

**Criterios de Aceptación**:
- Sistema es seguro contra accesos no autorizados
- Datos personales están protegidos
- Validaciones previenen ataques comunes

---

### RNF-005: Mantenibilidad

**Prioridad**: Alta  
**Estado**: ✅ Implementado

#### RNF-005.1: Arquitectura
- El sistema debe seguir arquitectura hexagonal
- El sistema debe separar claramente las capas (Domain, Infrastructure, Presentation)
- El sistema debe usar interfaces (puertos) para abstraer implementaciones
- El sistema debe permitir cambiar implementaciones sin afectar el dominio

#### RNF-005.2: Código
- El código debe seguir las convenciones de Angular
- El código debe usar TypeScript con tipado estricto
- El código debe estar comentado cuando sea necesario
- El código debe ser legible y autodocumentado

#### RNF-005.3: Componentes
- Los componentes deben ser standalone
- Los componentes deben ser reutilizables cuando sea posible
- Los componentes deben tener responsabilidad única
- Los componentes deben usar imports explícitos

**Criterios de Aceptación**:
- Arquitectura es clara y mantenible
- Código es legible y bien estructurado
- Componentes son modulares y reutilizables

---

### RNF-006: Escalabilidad

**Prioridad**: Media  
**Estado**: ✅ Implementado

#### RNF-006.1: Datos
- El sistema debe manejar 35,408 establecimientos de salud
- El sistema debe manejar miles de casos sin degradación
- El sistema debe paginar listas largas
- El sistema debe limitar resultados mostrados (100 por defecto)

#### RNF-006.2: Crecimiento
- El sistema debe permitir agregar nuevos módulos fácilmente
- El sistema debe permitir agregar nuevas funcionalidades sin refactorizar
- El sistema debe usar lazy loading para optimizar carga inicial

**Criterios de Aceptación**:
- Sistema maneja grandes volúmenes de datos
- Rendimiento no se degrada con más datos
- Nuevas funcionalidades son fáciles de agregar

---

### RNF-007: Compatibilidad

**Prioridad**: Media  
**Estado**: ✅ Implementado

#### RNF-007.1: Navegadores
El sistema debe funcionar correctamente en:
- Google Chrome (últimas 2 versiones)
- Mozilla Firefox (últimas 2 versiones)
- Microsoft Edge (últimas 2 versiones)
- Safari (últimas 2 versiones)

#### RNF-007.2: Dispositivos
El sistema debe funcionar en:
- Computadoras de escritorio (Windows, macOS, Linux)
- Tablets (iOS, Android)
- Smartphones (iOS, Android)

**Criterios de Aceptación**:
- Sistema funciona en todos los navegadores soportados
- Sistema funciona en todos los dispositivos soportados
- Experiencia es consistente entre plataformas

---

### RNF-008: Accesibilidad

**Prioridad**: Media  
**Estado**: ⚠️ Parcialmente Implementado

#### RNF-008.1: Estándares
- El sistema debe seguir pautas WCAG 2.1 nivel AA (objetivo)
- El sistema debe usar etiquetas semánticas HTML5
- El sistema debe proporcionar textos alternativos para imágenes
- El sistema debe usar contraste adecuado de colores

#### RNF-008.2: Navegación por Teclado
- El sistema debe permitir navegación completa por teclado
- El sistema debe mostrar indicadores de foco claros
- El sistema debe seguir orden lógico de tabulación

#### RNF-008.3: Lectores de Pantalla
- El sistema debe ser compatible con lectores de pantalla
- El sistema debe usar atributos ARIA cuando sea necesario
- El sistema debe proporcionar descripciones claras de elementos

**Criterios de Aceptación**:
- Sistema es navegable por teclado
- Contraste de colores es adecuado
- Elementos tienen descripciones apropiadas

---

### RNF-009: Documentación

**Prioridad**: Media  
**Estado**: ✅ Implementado

#### RNF-009.1: Documentación Técnica
- El proyecto debe tener README.md con instrucciones de instalación
- El proyecto debe tener PLANNING.md con información del proyecto
- El proyecto debe tener REQUIREMENTS.md con requerimientos funcionales y no funcionales
- El proyecto debe tener RESUMEN_PROYECTO.md con resumen ejecutivo

#### RNF-009.2: Documentación de Código
- Las interfaces deben estar documentadas
- Los modelos deben estar documentados
- Los métodos complejos deben tener comentarios explicativos

**Criterios de Aceptación**:
- Documentación está completa y actualizada
- Nuevos desarrolladores pueden entender el proyecto
- Código crítico está comentado

---

### RNF-010: Testing

**Prioridad**: Baja  
**Estado**: ❌ No Implementado

#### RNF-010.1: Pruebas Unitarias
- Los servicios deben tener pruebas unitarias (futuro)
- Los componentes deben tener pruebas unitarias (futuro)
- La cobertura debe ser al menos 70% (futuro)

#### RNF-010.2: Pruebas de Integración
- Los flujos principales deben tener pruebas E2E (futuro)
- Las integraciones deben ser probadas (futuro)

**Criterios de Aceptación**:
- Pruebas unitarias cubren funcionalidad crítica
- Pruebas E2E validan flujos principales

---

## 📊 Datos del Sistema

### Datos Mock Implementados

| Entidad | Cantidad | Fuente |
|---------|----------|--------|
| Casos | 34 | Mock generado |
| Especialistas | 12 | Mock generado |
| Establecimientos (IPRESS) | 35,408 | RENIPRESS (CSV convertido a JSON) |
| Departamentos | 25 | UBIGEO oficial |
| Provincias | 196 | UBIGEO oficial |
| Distritos | 1,874 | UBIGEO oficial |
| Usuarios | 1 | Mock (admin/admin123) |

**Total de Registros**: 37,550

---

## 🔄 Integraciones

### Integraciones Actuales (Mock)

1. **Sistema de Gestión Documental (SGD)**
   - Estado: Mock
   - Funcionalidad: Envío de casos, consulta de estado
   - Implementación real: Pendiente

2. **Inteligencia Artificial**
   - Estado: Mock
   - Funcionalidad: Clasificación automática, chatbot
   - Implementación real: Pendiente

### Integraciones Futuras

1. **Backend Real**
   - API RESTful con Node.js/NestJS o .NET
   - Base de datos PostgreSQL o SQL Server
   - Autenticación JWT

2. **Notificaciones**
   - Email (SMTP)
   - SMS (Twilio o similar)
   - Push notifications

3. **Firma Digital**
   - Integración con RENIEC
   - Certificados digitales

4. **Generación de Documentos**
   - PDFs oficiales
   - Reportes personalizados

---

## 🎯 Criterios de Éxito

### Criterios Técnicos
- ✅ Sistema funciona sin errores críticos
- ✅ Todos los módulos están implementados
- ✅ Arquitectura hexagonal está correctamente aplicada
- ✅ Código sigue estándares de Angular
- ✅ Sistema es responsive en todos los dispositivos

### Criterios de Negocio
- ✅ Usuarios pueden registrar casos completos
- ✅ Usuarios pueden buscar y filtrar casos eficientemente
- ✅ Usuarios pueden visualizar estadísticas y reportes
- ✅ Usuarios pueden gestionar especialistas
- ✅ Sistema muestra información geográfica de casos y establecimientos

### Criterios de Usuario
- ✅ Interfaz es intuitiva y fácil de usar
- ✅ Navegación es fluida
- ✅ Formularios son claros y validados
- ✅ Mensajes de error son comprensibles
- ✅ Sistema responde rápidamente

---

## 📝 Notas Adicionales

### Limitaciones Conocidas
1. **Datos Mock**: El sistema usa datos simulados, no hay persistencia real
2. **Integraciones**: SGD e IA son simuladas
3. **Testing**: No hay pruebas unitarias ni E2E implementadas
4. **Accesibilidad**: Cumplimiento parcial de WCAG 2.1
5. **Notificaciones**: No implementadas

### Mejoras Futuras
1. Implementar backend real con API RESTful
2. Agregar base de datos persistente
3. Implementar autenticación con JWT
4. Agregar roles y permisos
5. Implementar notificaciones por email/SMS
6. Agregar firma digital
7. Implementar generación de documentos oficiales
8. Agregar pruebas unitarias y E2E
9. Mejorar accesibilidad (WCAG 2.1 AA completo)
10. Implementar PWA para uso offline

---

## 📞 Contacto

Para consultas sobre estos requerimientos, contactar al equipo de desarrollo.

**Última actualización**: Abril 2026  
**Versión del documento**: 1.0
