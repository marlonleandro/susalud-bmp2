-- =====================================================
-- SUSALUD BPM - Database Schema
-- Sistema de Gestión de Consultas y Denuncias
-- PostgreSQL 14+
-- Versión: 1.0
-- Fecha: Abril 2026
-- =====================================================

-- Eliminar base de datos si existe (solo para desarrollo)
-- DROP DATABASE IF EXISTS susalud_bpm;

-- Crear base de datos
-- CREATE DATABASE susalud_bpm
--     WITH 
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'es_PE.UTF-8'
--     LC_CTYPE = 'es_PE.UTF-8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;

-- Conectar a la base de datos
-- \c susalud_bpm;

-- =====================================================
-- EXTENSIONES
-- =====================================================

-- Extensión para generar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extensión para búsqueda de texto completo
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Extensión para funciones de fecha/hora
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- =====================================================
-- SCHEMAS
-- =====================================================

CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS catalogo;
CREATE SCHEMA IF NOT EXISTS auditoria;

COMMENT ON SCHEMA core IS 'Esquema principal con tablas de negocio';
COMMENT ON SCHEMA catalogo IS 'Esquema de catálogos y datos maestros';
COMMENT ON SCHEMA auditoria IS 'Esquema de auditoría y trazabilidad';

-- =====================================================
-- TIPOS ENUMERADOS
-- =====================================================

-- Tipo de documento
CREATE TYPE core.tipo_documento AS ENUM ('DNI', 'CE', 'PASAPORTE');

-- Género
CREATE TYPE core.genero AS ENUM ('MASCULINO', 'FEMENINO');

-- Tipo de solicitud
CREATE TYPE core.tipo_solicitud AS ENUM ('CONSULTA', 'DENUNCIA');

-- Severidad
CREATE TYPE core.severidad AS ENUM ('LEVE', 'MODERADO', 'SEVERO');

-- Estado de caso
CREATE TYPE core.estado_caso AS ENUM (
    'INGRESADO',
    'EN_PROCESO',
    'PENDIENTE_INFORME',
    'RESUELTO',
    'CERRADO'
);

-- Tipo de seguro
CREATE TYPE core.tipo_seguro AS ENUM ('ESSALUD', 'EPS', 'OTRO');

-- Canal de ingreso
CREATE TYPE core.canal_ingreso AS ENUM (
    'PAGINA_WEB',
    'CORREO_ELECTRONICO',
    'PRESENCIAL',
    'TELEFONICO',
    'MOVIL'
);

-- Estado de establecimiento
CREATE TYPE catalogo.estado_establecimiento AS ENUM (
    'ACTIVO',
    'INACTIVO',
    'BAJA_TEMPORAL',
    'BAJA_DEFINITIVA'
);

-- =====================================================
-- TABLAS DE CATÁLOGO
-- =====================================================

-- Tabla: Departamentos
CREATE TABLE catalogo.departamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(2) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE catalogo.departamentos IS 'Catálogo de departamentos del Perú';

-- Tabla: Provincias
CREATE TABLE catalogo.provincias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(4) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    departamento_id UUID NOT NULL REFERENCES catalogo.departamentos(id),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE catalogo.provincias IS 'Catálogo de provincias del Perú';

-- Tabla: Distritos
CREATE TABLE catalogo.distritos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_ubigeo VARCHAR(6) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    provincia_id UUID NOT NULL REFERENCES catalogo.provincias(id),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE catalogo.distritos IS 'Catálogo de distritos del Perú';

-- Tabla: Establecimientos de Salud (IPRESS)
CREATE TABLE catalogo.establecimientos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_unico VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(500) NOT NULL,
    institucion VARCHAR(200),
    clasificacion VARCHAR(200),
    tipo VARCHAR(200),
    categoria VARCHAR(50),
    departamento VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    ubigeo VARCHAR(6),
    direccion TEXT,
    telefono VARCHAR(50),
    estado catalogo.estado_establecimiento DEFAULT 'ACTIVO',
    coordenada_norte DECIMAL(10, 8),
    coordenada_este DECIMAL(11, 8),
    cota DECIMAL(10, 2),
    ruc VARCHAR(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE catalogo.establecimientos IS 'Catálogo de establecimientos de salud (IPRESS) - RENIPRESS';

-- Índices para búsqueda rápida
CREATE INDEX idx_establecimientos_ubigeo ON catalogo.establecimientos(ubigeo);
CREATE INDEX idx_establecimientos_nombre ON catalogo.establecimientos USING gin(nombre gin_trgm_ops);
CREATE INDEX idx_establecimientos_estado ON catalogo.establecimientos(estado);
CREATE INDEX idx_establecimientos_departamento ON catalogo.establecimientos(departamento);


-- =====================================================
-- TABLAS DE USUARIOS Y SEGURIDAD
-- =====================================================

-- Tabla: Roles
CREATE TABLE core.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.roles IS 'Roles de usuario del sistema';

-- Tabla: Usuarios
CREATE TABLE core.usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100) NOT NULL,
    tipo_documento core.tipo_documento NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso TIMESTAMP,
    intentos_fallidos INTEGER DEFAULT 0,
    bloqueado_hasta TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.usuarios IS 'Usuarios del sistema';

-- Tabla: Usuarios - Roles (relación muchos a muchos)
CREATE TABLE core.usuarios_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES core.usuarios(id) ON DELETE CASCADE,
    rol_id UUID NOT NULL REFERENCES core.roles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, rol_id)
);

COMMENT ON TABLE core.usuarios_roles IS 'Relación entre usuarios y roles';

-- Tabla: Sesiones
CREATE TABLE core.sesiones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES core.usuarios(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP NOT NULL,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.sesiones IS 'Sesiones activas de usuarios';

CREATE INDEX idx_sesiones_token ON core.sesiones(token);
CREATE INDEX idx_sesiones_usuario ON core.sesiones(usuario_id);
CREATE INDEX idx_sesiones_activa ON core.sesiones(activa);

-- =====================================================
-- TABLAS DE ESPECIALISTAS
-- =====================================================

-- Tabla: Especialistas
CREATE TABLE core.especialistas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo_documento core.tipo_documento NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    correo_electronico VARCHAR(255),
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES core.usuarios(id),
    updated_by UUID REFERENCES core.usuarios(id)
);

COMMENT ON TABLE core.especialistas IS 'Especialistas médicos que atienden casos';

CREATE INDEX idx_especialistas_activo ON core.especialistas(activo);
CREATE INDEX idx_especialistas_especialidad ON core.especialistas(especialidad);
CREATE INDEX idx_especialistas_documento ON core.especialistas(numero_documento);

-- =====================================================
-- TABLAS DE CASOS
-- =====================================================

-- Tabla: Casos
CREATE TABLE core.casos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_expediente VARCHAR(20) NOT NULL UNIQUE,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_recepcion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    canal_ingreso core.canal_ingreso NOT NULL,
    area_actual VARCHAR(100) NOT NULL,
    tipo_solicitud core.tipo_solicitud NOT NULL,
    tipo_denuncia VARCHAR(100),
    competencia_susalud BOOLEAN DEFAULT TRUE,
    competencia_prott BOOLEAN DEFAULT FALSE,
    hubo_solicitud BOOLEAN DEFAULT FALSE,
    severidad core.severidad NOT NULL,
    estado core.estado_caso NOT NULL DEFAULT 'INGRESADO',
    descripcion TEXT NOT NULL,
    macro_region VARCHAR(100),
    id_sgd VARCHAR(50),
    dias_transcurridos INTEGER DEFAULT 0,
    dias_restantes INTEGER DEFAULT 25,
    alerta_vencimiento BOOLEAN DEFAULT FALSE,
    especialista_id UUID REFERENCES core.especialistas(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES core.usuarios(id),
    updated_by UUID REFERENCES core.usuarios(id)
);

COMMENT ON TABLE core.casos IS 'Casos de consultas y denuncias';

CREATE INDEX idx_casos_expediente ON core.casos(numero_expediente);
CREATE INDEX idx_casos_estado ON core.casos(estado);
CREATE INDEX idx_casos_severidad ON core.casos(severidad);
CREATE INDEX idx_casos_tipo ON core.casos(tipo_solicitud);
CREATE INDEX idx_casos_especialista ON core.casos(especialista_id);
CREATE INDEX idx_casos_fecha_registro ON core.casos(fecha_registro);
CREATE INDEX idx_casos_alerta ON core.casos(alerta_vencimiento);

-- Tabla: Solicitantes
CREATE TABLE core.solicitantes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caso_id UUID NOT NULL REFERENCES core.casos(id) ON DELETE CASCADE,
    tipo_documento core.tipo_documento NOT NULL,
    numero_documento VARCHAR(20) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    genero core.genero,
    direccion TEXT,
    departamento VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo_electronico VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.solicitantes IS 'Datos de los solicitantes de casos';

CREATE INDEX idx_solicitantes_caso ON core.solicitantes(caso_id);
CREATE INDEX idx_solicitantes_documento ON core.solicitantes(numero_documento);

-- Tabla: Afectados
CREATE TABLE core.afectados (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caso_id UUID NOT NULL REFERENCES core.casos(id) ON DELETE CASCADE,
    tipo_documento core.tipo_documento NOT NULL,
    numero_documento VARCHAR(20) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero core.genero NOT NULL,
    numero_historia_clinica VARCHAR(50),
    tipo_seguro core.tipo_seguro NOT NULL,
    direccion TEXT NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo_electronico VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.afectados IS 'Datos de los afectados en casos';

CREATE INDEX idx_afectados_caso ON core.afectados(caso_id);
CREATE INDEX idx_afectados_documento ON core.afectados(numero_documento);

-- Tabla: Casos - Establecimientos (relación muchos a muchos)
CREATE TABLE core.casos_establecimientos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caso_id UUID NOT NULL REFERENCES core.casos(id) ON DELETE CASCADE,
    establecimiento_id UUID NOT NULL REFERENCES catalogo.establecimientos(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(caso_id, establecimiento_id)
);

COMMENT ON TABLE core.casos_establecimientos IS 'Establecimientos involucrados en casos';

CREATE INDEX idx_casos_establecimientos_caso ON core.casos_establecimientos(caso_id);
CREATE INDEX idx_casos_establecimientos_establecimiento ON core.casos_establecimientos(establecimiento_id);

-- =====================================================
-- TABLAS DE WORKFLOW
-- =====================================================

-- Tabla: Procesos de Workflow
CREATE TABLE core.procesos_workflow (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    sla_maximo_dias INTEGER NOT NULL DEFAULT 25,
    alerta_dias INTEGER NOT NULL DEFAULT 5,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.procesos_workflow IS 'Procesos de workflow configurables';

-- Tabla: Estados de Workflow
CREATE TABLE core.estados_workflow (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proceso_id UUID NOT NULL REFERENCES core.procesos_workflow(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    orden INTEGER NOT NULL,
    es_inicial BOOLEAN DEFAULT FALSE,
    es_final BOOLEAN DEFAULT FALSE,
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(proceso_id, nombre)
);

COMMENT ON TABLE core.estados_workflow IS 'Estados de los procesos de workflow';

CREATE INDEX idx_estados_proceso ON core.estados_workflow(proceso_id);

-- Tabla: Transiciones de Workflow
CREATE TABLE core.transiciones_workflow (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proceso_id UUID NOT NULL REFERENCES core.procesos_workflow(id) ON DELETE CASCADE,
    estado_origen_id UUID NOT NULL REFERENCES core.estados_workflow(id),
    estado_destino_id UUID NOT NULL REFERENCES core.estados_workflow(id),
    accion VARCHAR(100) NOT NULL,
    condiciones JSONB,
    roles_permitidos TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.transiciones_workflow IS 'Transiciones entre estados de workflow';

CREATE INDEX idx_transiciones_proceso ON core.transiciones_workflow(proceso_id);
CREATE INDEX idx_transiciones_origen ON core.transiciones_workflow(estado_origen_id);

-- Tabla: Historial de Workflow
CREATE TABLE core.historial_workflow (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caso_id UUID NOT NULL REFERENCES core.casos(id) ON DELETE CASCADE,
    estado_anterior VARCHAR(50),
    estado_nuevo VARCHAR(50) NOT NULL,
    usuario_id UUID REFERENCES core.usuarios(id),
    comentario TEXT,
    tiempo_en_estado INTEGER,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.historial_workflow IS 'Historial de cambios de estado de casos';

CREATE INDEX idx_historial_caso ON core.historial_workflow(caso_id);
CREATE INDEX idx_historial_fecha ON core.historial_workflow(fecha);


-- =====================================================
-- TABLAS DE PENDIENTES
-- =====================================================

-- Tabla: Pendientes
CREATE TABLE core.pendientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caso_id UUID NOT NULL REFERENCES core.casos(id) ON DELETE CASCADE,
    usuario_asignado_id UUID NOT NULL REFERENCES core.usuarios(id),
    tipo_pendiente VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    prioridad VARCHAR(20) DEFAULT 'MEDIA',
    fecha_resolucion TIMESTAMP,
    resuelto_por_id UUID REFERENCES core.usuarios(id),
    comentario_resolucion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.pendientes IS 'Pendientes de revisión y aprobación';

CREATE INDEX idx_pendientes_caso ON core.pendientes(caso_id);
CREATE INDEX idx_pendientes_usuario ON core.pendientes(usuario_asignado_id);
CREATE INDEX idx_pendientes_estado ON core.pendientes(estado);
CREATE INDEX idx_pendientes_fecha_vencimiento ON core.pendientes(fecha_vencimiento);

-- =====================================================
-- TABLAS DE INTEGRACIÓN
-- =====================================================

-- Tabla: Integración SGD
CREATE TABLE core.integracion_sgd (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caso_id UUID NOT NULL REFERENCES core.casos(id) ON DELETE CASCADE,
    id_sgd VARCHAR(50) NOT NULL UNIQUE,
    estado_integracion VARCHAR(50) DEFAULT 'PENDIENTE',
    fecha_envio TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    mensaje_error TEXT,
    datos_envio JSONB,
    datos_respuesta JSONB,
    intentos INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.integracion_sgd IS 'Integración con Sistema de Gestión Documental';

CREATE INDEX idx_sgd_caso ON core.integracion_sgd(caso_id);
CREATE INDEX idx_sgd_estado ON core.integracion_sgd(estado_integracion);

-- Tabla: Clasificación IA
CREATE TABLE core.clasificacion_ia (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caso_id UUID NOT NULL REFERENCES core.casos(id) ON DELETE CASCADE,
    severidad_sugerida core.severidad,
    confianza_severidad DECIMAL(5, 2),
    especialista_sugerido_id UUID REFERENCES core.especialistas(id),
    confianza_especialista DECIMAL(5, 2),
    categorias_detectadas TEXT[],
    palabras_clave TEXT[],
    fecha_analisis TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modelo_version VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.clasificacion_ia IS 'Clasificaciones automáticas por IA';

CREATE INDEX idx_ia_caso ON core.clasificacion_ia(caso_id);

-- =====================================================
-- TABLAS DE AUDITORÍA
-- =====================================================

-- Tabla: Auditoría de Acciones
CREATE TABLE auditoria.acciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES core.usuarios(id),
    accion VARCHAR(100) NOT NULL,
    tabla VARCHAR(100),
    registro_id UUID,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE auditoria.acciones IS 'Auditoría de todas las acciones del sistema';

CREATE INDEX idx_auditoria_usuario ON auditoria.acciones(usuario_id);
CREATE INDEX idx_auditoria_fecha ON auditoria.acciones(fecha);
CREATE INDEX idx_auditoria_tabla ON auditoria.acciones(tabla);
CREATE INDEX idx_auditoria_registro ON auditoria.acciones(registro_id);

-- Tabla: Logs del Sistema
CREATE TABLE auditoria.logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nivel VARCHAR(20) NOT NULL,
    mensaje TEXT NOT NULL,
    contexto JSONB,
    stack_trace TEXT,
    usuario_id UUID REFERENCES core.usuarios(id),
    ip_address VARCHAR(45),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE auditoria.logs IS 'Logs del sistema';

CREATE INDEX idx_logs_nivel ON auditoria.logs(nivel);
CREATE INDEX idx_logs_fecha ON auditoria.logs(fecha);
CREATE INDEX idx_logs_usuario ON auditoria.logs(usuario_id);

-- =====================================================
-- TABLAS DE REPORTES Y ESTADÍSTICAS
-- =====================================================

-- Tabla: Métricas Diarias
CREATE TABLE core.metricas_diarias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fecha DATE NOT NULL UNIQUE,
    total_casos INTEGER DEFAULT 0,
    casos_nuevos INTEGER DEFAULT 0,
    casos_resueltos INTEGER DEFAULT 0,
    casos_en_proceso INTEGER DEFAULT 0,
    casos_con_alerta INTEGER DEFAULT 0,
    tiempo_promedio_resolucion DECIMAL(10, 2),
    casos_por_severidad JSONB,
    casos_por_tipo JSONB,
    casos_por_departamento JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE core.metricas_diarias IS 'Métricas agregadas por día';

CREATE INDEX idx_metricas_fecha ON core.metricas_diarias(fecha);

-- =====================================================
-- VISTAS
-- =====================================================

-- Vista: Casos Completos
CREATE OR REPLACE VIEW core.v_casos_completos AS
SELECT 
    c.id,
    c.numero_expediente,
    c.fecha_registro,
    c.fecha_recepcion,
    c.canal_ingreso,
    c.tipo_solicitud,
    c.severidad,
    c.estado,
    c.descripcion,
    c.dias_transcurridos,
    c.dias_restantes,
    c.alerta_vencimiento,
    -- Solicitante
    s.nombres || ' ' || s.apellido_paterno || ' ' || s.apellido_materno AS solicitante_nombre_completo,
    s.numero_documento AS solicitante_documento,
    s.departamento AS solicitante_departamento,
    s.provincia AS solicitante_provincia,
    s.distrito AS solicitante_distrito,
    s.telefono AS solicitante_telefono,
    s.correo_electronico AS solicitante_email,
    -- Afectado
    a.nombres || ' ' || a.apellido_paterno || ' ' || a.apellido_materno AS afectado_nombre_completo,
    a.numero_documento AS afectado_documento,
    a.tipo_seguro AS afectado_tipo_seguro,
    -- Especialista
    e.id AS especialista_id,
    e.nombres || ' ' || e.apellido_paterno || ' ' || e.apellido_materno AS especialista_nombre_completo,
    e.especialidad AS especialista_especialidad,
    -- Conteo de establecimientos
    (SELECT COUNT(*) FROM core.casos_establecimientos ce WHERE ce.caso_id = c.id) AS total_establecimientos,
    c.created_at,
    c.updated_at
FROM core.casos c
LEFT JOIN core.solicitantes s ON s.caso_id = c.id
LEFT JOIN core.afectados a ON a.caso_id = c.id
LEFT JOIN core.especialistas e ON e.id = c.especialista_id;

COMMENT ON VIEW core.v_casos_completos IS 'Vista con información completa de casos';

-- Vista: Estadísticas de Especialistas
CREATE OR REPLACE VIEW core.v_estadisticas_especialistas AS
SELECT 
    e.id,
    e.nombres || ' ' || e.apellido_paterno || ' ' || e.apellido_materno AS nombre_completo,
    e.especialidad,
    e.activo,
    COUNT(c.id) AS total_casos_asignados,
    COUNT(CASE WHEN c.estado = 'RESUELTO' THEN 1 END) AS casos_resueltos,
    COUNT(CASE WHEN c.estado = 'EN_PROCESO' THEN 1 END) AS casos_en_proceso,
    COUNT(CASE WHEN c.alerta_vencimiento = TRUE THEN 1 END) AS casos_con_alerta,
    AVG(CASE WHEN c.estado = 'RESUELTO' THEN c.dias_transcurridos END) AS promedio_dias_resolucion
FROM core.especialistas e
LEFT JOIN core.casos c ON c.especialista_id = e.id
GROUP BY e.id, e.nombres, e.apellido_paterno, e.apellido_materno, e.especialidad, e.activo;

COMMENT ON VIEW core.v_estadisticas_especialistas IS 'Estadísticas de casos por especialista';

-- Vista: Dashboard Principal
CREATE OR REPLACE VIEW core.v_dashboard AS
SELECT 
    COUNT(*) AS total_casos,
    COUNT(CASE WHEN estado = 'RESUELTO' THEN 1 END) AS casos_resueltos,
    COUNT(CASE WHEN estado = 'EN_PROCESO' THEN 1 END) AS casos_en_proceso,
    COUNT(CASE WHEN alerta_vencimiento = TRUE THEN 1 END) AS casos_con_alerta,
    COUNT(CASE WHEN severidad = 'LEVE' THEN 1 END) AS casos_leves,
    COUNT(CASE WHEN severidad = 'MODERADO' THEN 1 END) AS casos_moderados,
    COUNT(CASE WHEN severidad = 'SEVERO' THEN 1 END) AS casos_severos,
    COUNT(CASE WHEN tipo_solicitud = 'CONSULTA' THEN 1 END) AS total_consultas,
    COUNT(CASE WHEN tipo_solicitud = 'DENUNCIA' THEN 1 END) AS total_denuncias,
    AVG(CASE WHEN estado = 'RESUELTO' THEN dias_transcurridos END) AS promedio_dias_resolucion
FROM core.casos;

COMMENT ON VIEW core.v_dashboard IS 'Métricas principales para el dashboard';

-- =====================================================
-- FUNCIONES
-- =====================================================

-- Función: Actualizar timestamp de updated_at
CREATE OR REPLACE FUNCTION core.actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION core.actualizar_updated_at() IS 'Actualiza automáticamente el campo updated_at';

-- Función: Calcular días transcurridos y restantes
CREATE OR REPLACE FUNCTION core.calcular_dias_caso()
RETURNS TRIGGER AS $$
BEGIN
    NEW.dias_transcurridos = EXTRACT(DAY FROM (CURRENT_TIMESTAMP - NEW.fecha_registro));
    NEW.dias_restantes = 25 - NEW.dias_transcurridos;
    NEW.alerta_vencimiento = (NEW.dias_restantes <= 5 AND NEW.estado NOT IN ('RESUELTO', 'CERRADO'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION core.calcular_dias_caso() IS 'Calcula días transcurridos, restantes y alerta de vencimiento';

-- Función: Registrar auditoría
CREATE OR REPLACE FUNCTION auditoria.registrar_accion()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO auditoria.acciones (
            usuario_id, accion, tabla, registro_id, datos_anteriores
        ) VALUES (
            NULLIF(current_setting('app.current_user_id', TRUE), '')::UUID,
            TG_OP,
            TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            OLD.id,
            row_to_json(OLD)
        );
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO auditoria.acciones (
            usuario_id, accion, tabla, registro_id, datos_anteriores, datos_nuevos
        ) VALUES (
            NULLIF(current_setting('app.current_user_id', TRUE), '')::UUID,
            TG_OP,
            TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            NEW.id,
            row_to_json(OLD),
            row_to_json(NEW)
        );
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO auditoria.acciones (
            usuario_id, accion, tabla, registro_id, datos_nuevos
        ) VALUES (
            NULLIF(current_setting('app.current_user_id', TRUE), '')::UUID,
            TG_OP,
            TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            NEW.id,
            row_to_json(NEW)
        );
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION auditoria.registrar_accion() IS 'Registra automáticamente acciones de INSERT, UPDATE, DELETE';


-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger: Actualizar updated_at en tablas principales
CREATE TRIGGER trg_usuarios_updated_at
    BEFORE UPDATE ON core.usuarios
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

CREATE TRIGGER trg_especialistas_updated_at
    BEFORE UPDATE ON core.especialistas
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

CREATE TRIGGER trg_casos_updated_at
    BEFORE UPDATE ON core.casos
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

CREATE TRIGGER trg_solicitantes_updated_at
    BEFORE UPDATE ON core.solicitantes
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

CREATE TRIGGER trg_afectados_updated_at
    BEFORE UPDATE ON core.afectados
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

CREATE TRIGGER trg_departamentos_updated_at
    BEFORE UPDATE ON catalogo.departamentos
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

CREATE TRIGGER trg_provincias_updated_at
    BEFORE UPDATE ON catalogo.provincias
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

CREATE TRIGGER trg_distritos_updated_at
    BEFORE UPDATE ON catalogo.distritos
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

CREATE TRIGGER trg_establecimientos_updated_at
    BEFORE UPDATE ON catalogo.establecimientos
    FOR EACH ROW
    EXECUTE FUNCTION core.actualizar_updated_at();

-- Trigger: Calcular días en casos
CREATE TRIGGER trg_casos_calcular_dias
    BEFORE INSERT OR UPDATE ON core.casos
    FOR EACH ROW
    EXECUTE FUNCTION core.calcular_dias_caso();

-- Trigger: Auditoría en casos
CREATE TRIGGER trg_casos_auditoria
    AFTER INSERT OR UPDATE OR DELETE ON core.casos
    FOR EACH ROW
    EXECUTE FUNCTION auditoria.registrar_accion();

-- Trigger: Auditoría en usuarios
CREATE TRIGGER trg_usuarios_auditoria
    AFTER INSERT OR UPDATE OR DELETE ON core.usuarios
    FOR EACH ROW
    EXECUTE FUNCTION auditoria.registrar_accion();

-- Trigger: Auditoría en especialistas
CREATE TRIGGER trg_especialistas_auditoria
    AFTER INSERT OR UPDATE OR DELETE ON core.especialistas
    FOR EACH ROW
    EXECUTE FUNCTION auditoria.registrar_accion();

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Insertar roles por defecto
INSERT INTO core.roles (codigo, nombre, descripcion) VALUES
    ('ADMIN', 'Administrador', 'Acceso completo al sistema'),
    ('ESPECIALISTA', 'Especialista', 'Gestión de casos asignados'),
    ('SUPERVISOR', 'Supervisor', 'Supervisión y aprobación de casos'),
    ('OPERADOR', 'Operador', 'Registro y consulta de casos'),
    ('CONSULTA', 'Consulta', 'Solo lectura de información')
ON CONFLICT (codigo) DO NOTHING;

-- Insertar usuario administrador por defecto
-- Contraseña: admin123 (debe ser hasheada en producción)
INSERT INTO core.usuarios (
    username, 
    password_hash, 
    email, 
    nombres, 
    apellido_paterno, 
    apellido_materno, 
    tipo_documento, 
    numero_documento
) VALUES (
    'admin',
    '$2b$10$rKvVJKJ5xKxKxKxKxKxKxOeKxKxKxKxKxKxKxKxKxKxKxKxKxKxKx', -- Hash de 'admin123'
    'admin@susalud.gob.pe',
    'Administrador',
    'Sistema',
    'SUSALUD',
    'DNI',
    '00000000'
)
ON CONFLICT (username) DO NOTHING;

-- Asignar rol de administrador al usuario admin
INSERT INTO core.usuarios_roles (usuario_id, rol_id)
SELECT u.id, r.id
FROM core.usuarios u, core.roles r
WHERE u.username = 'admin' AND r.codigo = 'ADMIN'
ON CONFLICT (usuario_id, rol_id) DO NOTHING;

-- Insertar procesos de workflow por defecto
INSERT INTO core.procesos_workflow (codigo, nombre, descripcion, sla_maximo_dias, alerta_dias) VALUES
    ('M2.P03', 'Proceso de Consultas', 'Proceso para gestión de consultas ciudadanas', 25, 5),
    ('M2.P06', 'Proceso de Denuncias', 'Proceso para gestión de denuncias', 25, 5),
    ('M2.P07', 'Proceso de Delegados', 'Proceso para casos delegados', 30, 7)
ON CONFLICT (codigo) DO NOTHING;

-- Insertar estados de workflow para proceso de consultas
INSERT INTO core.estados_workflow (proceso_id, nombre, descripcion, orden, es_inicial, es_final, color)
SELECT 
    p.id,
    estado.nombre,
    estado.descripcion,
    estado.orden,
    estado.es_inicial,
    estado.es_final,
    estado.color
FROM core.procesos_workflow p
CROSS JOIN (VALUES
    ('INGRESADO', 'Caso ingresado al sistema', 1, TRUE, FALSE, '#3b82f6'),
    ('EN_PROCESO', 'Caso en proceso de atención', 2, FALSE, FALSE, '#f59e0b'),
    ('PENDIENTE_INFORME', 'Pendiente de informe técnico', 3, FALSE, FALSE, '#8b5cf6'),
    ('RESUELTO', 'Caso resuelto', 4, FALSE, TRUE, '#10b981'),
    ('CERRADO', 'Caso cerrado', 5, FALSE, TRUE, '#6b7280')
) AS estado(nombre, descripcion, orden, es_inicial, es_final, color)
WHERE p.codigo = 'M2.P03'
ON CONFLICT (proceso_id, nombre) DO NOTHING;

-- =====================================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices de texto completo para búsqueda
CREATE INDEX idx_casos_descripcion_trgm ON core.casos USING gin(descripcion gin_trgm_ops);
CREATE INDEX idx_solicitantes_nombres_trgm ON core.solicitantes USING gin(
    (nombres || ' ' || apellido_paterno || ' ' || apellido_materno) gin_trgm_ops
);

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_casos_estado_fecha ON core.casos(estado, fecha_registro DESC);
CREATE INDEX idx_casos_especialista_estado ON core.casos(especialista_id, estado);
CREATE INDEX idx_casos_tipo_severidad ON core.casos(tipo_solicitud, severidad);

-- =====================================================
-- PERMISOS
-- =====================================================

-- Crear rol de aplicación
CREATE ROLE susalud_app WITH LOGIN PASSWORD 'change_this_password';

-- Otorgar permisos al rol de aplicación
GRANT USAGE ON SCHEMA core TO susalud_app;
GRANT USAGE ON SCHEMA catalogo TO susalud_app;
GRANT USAGE ON SCHEMA auditoria TO susalud_app;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA core TO susalud_app;
GRANT SELECT ON ALL TABLES IN SCHEMA catalogo TO susalud_app;
GRANT INSERT ON auditoria.acciones TO susalud_app;
GRANT INSERT ON auditoria.logs TO susalud_app;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA core TO susalud_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA catalogo TO susalud_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA auditoria TO susalud_app;

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (Row Level Security)
-- =====================================================

-- Habilitar RLS en tablas sensibles
ALTER TABLE core.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE core.casos ENABLE ROW LEVEL SECURITY;
ALTER TABLE core.pendientes ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propios datos
CREATE POLICY usuarios_self_access ON core.usuarios
    FOR ALL
    USING (id = NULLIF(current_setting('app.current_user_id', TRUE), '')::UUID);

-- Política: Los especialistas solo pueden ver sus casos asignados
CREATE POLICY casos_especialista_access ON core.casos
    FOR SELECT
    USING (
        especialista_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::UUID
        OR
        NULLIF(current_setting('app.current_user_role', TRUE), '') = 'ADMIN'
    );

-- Política: Los usuarios solo pueden ver sus pendientes
CREATE POLICY pendientes_usuario_access ON core.pendientes
    FOR SELECT
    USING (
        usuario_asignado_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::UUID
        OR
        NULLIF(current_setting('app.current_user_role', TRUE), '') = 'ADMIN'
    );

-- =====================================================
-- COMENTARIOS FINALES
-- =====================================================

COMMENT ON DATABASE susalud_bpm IS 'Base de datos del Sistema de Gestión de Consultas y Denuncias - SUSALUD';

-- =====================================================
-- ESTADÍSTICAS Y MANTENIMIENTO
-- =====================================================

-- Actualizar estadísticas
ANALYZE;

-- Crear extensión para mantenimiento automático
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- =====================================================
-- SCRIPT COMPLETADO
-- =====================================================

-- Verificar la creación de objetos
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname IN ('core', 'catalogo', 'auditoria')
ORDER BY schemaname, tablename;

-- Mostrar resumen de tablas creadas
SELECT 
    schemaname AS schema,
    COUNT(*) AS total_tables
FROM pg_tables
WHERE schemaname IN ('core', 'catalogo', 'auditoria')
GROUP BY schemaname
ORDER BY schemaname;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================

/*
NOTAS DE IMPLEMENTACIÓN:

1. SEGURIDAD:
   - Cambiar la contraseña del rol susalud_app en producción
   - Implementar hash bcrypt real para contraseñas de usuarios
   - Configurar SSL/TLS para conexiones
   - Revisar y ajustar políticas RLS según necesidades

2. RENDIMIENTO:
   - Monitorear índices y crear adicionales según patrones de uso
   - Configurar autovacuum apropiadamente
   - Considerar particionamiento para tablas grandes (casos, auditoría)
   - Implementar caché de consultas frecuentes

3. BACKUP:
   - Configurar backups automáticos diarios
   - Implementar estrategia de retención (7 días, 4 semanas, 12 meses)
   - Probar restauración periódicamente

4. MIGRACIÓN DE DATOS:
   - Usar scripts separados para cargar datos de UBIGEO (25 dept, 196 prov, 1874 dist)
   - Usar scripts separados para cargar IPRESS (35,408 establecimientos)
   - Validar integridad referencial después de carga masiva

5. MONITOREO:
   - Configurar alertas para tablas que crecen rápidamente
   - Monitorear queries lentas con pg_stat_statements
   - Revisar logs de auditoría regularmente

6. MANTENIMIENTO:
   - VACUUM ANALYZE semanal
   - REINDEX mensual en tablas con alta rotación
   - Archivar datos históricos después de 2 años

VERSIÓN: 1.0
FECHA: Abril 2026
AUTOR: Equipo de Desarrollo SUSALUD BPM
*/
