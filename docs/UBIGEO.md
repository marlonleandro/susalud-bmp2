# Sistema de UBIGEO - Selectores Dependientes

## Descripción General

El sistema de UBIGEO implementa selectores en cascada para la selección de ubicación geográfica (Departamento, Provincia y Distrito) basado en los datos oficiales del INEI (Instituto Nacional de Estadística e Informática) del Perú.

## Fuente de Datos

Los datos provienen del archivo `docs/UBIGEO.csv` que contiene:
- 1,861 registros de ubicaciones
- 25 departamentos
- 196 provincias
- 1,861 distritos

## Estructura de Códigos UBIGEO

El sistema utiliza el código UBIGEO de 6 dígitos del INEI, donde:

- **Código de Departamento**: 2 primeros dígitos (ej: "15" para Lima)
- **Código Referencial de Provincia**: 4 primeros dígitos (ej: "1501" para Lima-Lima)
  - Compuesto por: 2 dígitos de departamento + 2 dígitos de provincia
- **Código de Distrito (UBIGEO completo)**: 6 dígitos (ej: "150101" para Lima-Lima-Lima)
  - Compuesto por: 4 dígitos de provincia + 2 dígitos de distrito

### Ejemplo de Jerarquía

```
15     → LIMA (Departamento)
├─ 1501 → LIMA (Provincia)
│  ├─ 150101 → LIMA (Distrito)
│  ├─ 150102 → ANCON
│  ├─ 150103 → ATE
│  └─ ... (44 distritos)
├─ 1502 → BARRANCA (Provincia)
│  ├─ 150201 → BARRANCA (Distrito)
│  └─ ... (5 distritos)
└─ ... (10 provincias)
```

## Arquitectura

### Capa de Dominio

**Modelos** (`src/app/domain/models/ubigeo.model.ts`):
- `Departamento`: Código y nombre del departamento
- `Provincia`: Código, nombre y código del departamento al que pertenece
- `Distrito`: Código, nombre, código de provincia, departamento y ubigeo completo
- `UbigeoData`: Estructura completa de un registro del CSV

**Puerto** (`src/app/domain/ports/ubigeo.repository.ts`):
- `obtenerDepartamentos()`: Retorna lista de todos los departamentos
- `obtenerProvinciasPorDepartamento(codigoDepartamento)`: Retorna provincias de un departamento
- `obtenerDistritosPorProvincia(codigoDepartamento, codigoProvincia)`: Retorna distritos de una provincia

### Capa de Infraestructura

**Datos** (`src/app/infrastructure/mock/ubigeo-data.ts`):
- Array constante con todos los 1,861 registros del UBIGEO
- Generado automáticamente desde el CSV
- Formato TypeScript para mejor rendimiento

**Repositorio Mock** (`src/app/infrastructure/mock/ubigeo-mock.repository.ts`):
- Implementa la lógica de filtrado usando códigos UBIGEO
- Extrae códigos de 2, 4 y 6 dígitos del CODIGO_UBIGEO
- Elimina duplicados usando Map con códigos referenciales
- Ordena alfabéticamente los resultados
- Retorna Observables para consistencia con el patrón

### Lógica de Filtrado

```typescript
// Departamentos: primeros 2 dígitos únicos
codigoDept = item.codigoUbigeo.substring(0, 2)  // "15"

// Provincias: primeros 4 dígitos únicos, filtrados por departamento
codigoProv = item.codigoUbigeo.substring(0, 4)  // "1501"
filter: item.codigoUbigeo.substring(0, 2) === codigoDepartamento

// Distritos: 6 dígitos completos, filtrados por provincia
codigoDist = item.codigoUbigeo  // "150101"
filter: item.codigoUbigeo.substring(0, 4) === codigoProvincia
```

## Funcionamiento de Selectores Dependientes

### Flujo de Selección

1. **Carga Inicial**
   - Al cargar el formulario, se obtienen todos los departamentos
   - Los selectores de provincia y distrito están deshabilitados

2. **Selección de Departamento**
   - Usuario selecciona un departamento
   - Se cargan las provincias correspondientes al departamento
   - Se habilita el selector de provincias
   - Se limpian las selecciones de provincia y distrito

3. **Selección de Provincia**
   - Usuario selecciona una provincia
   - Se cargan los distritos correspondientes a la provincia
   - Se habilita el selector de distritos
   - Se limpia la selección de distrito

4. **Selección de Distrito**
   - Usuario selecciona un distrito
   - Se completa la información de ubicación

### Implementación en el Formulario

```typescript
// Cargar departamentos al iniciar
ngOnInit() {
  this.cargarDepartamentos();
}

// Al cambiar departamento
onDepartamentoChange() {
  // Limpiar dependientes
  this.provinciaSeleccionada = '';
  this.distritoSeleccionado = '';
  
  // Cargar provincias
  if (this.departamentoSeleccionado) {
    this.ubigeoRepository
      .obtenerProvinciasPorDepartamento(this.departamentoSeleccionado)
      .subscribe(provincias => {
        this.provincias = provincias;
      });
  }
}

// Al cambiar provincia
onProvinciaChange() {
  // Limpiar distrito
  this.distritoSeleccionado = '';
  
  // Cargar distritos
  if (this.provinciaSeleccionada) {
    this.ubigeoRepository
      .obtenerDistritosPorProvincia(
        this.departamentoSeleccionado,
        this.provinciaSeleccionada
      ).subscribe(distritos => {
        this.distritos = distritos;
      });
  }
}
```

## Características

### Validación
- Todos los selectores son requeridos (*)
- Los selectores dependientes se deshabilitan hasta que se seleccione el padre
- Mensajes de ayuda indican qué seleccionar primero

### UX/UI
- Selectores con placeholder descriptivo
- Deshabilitación visual de selectores dependientes
- Texto de ayuda contextual
- Ordenamiento alfabético de opciones
- Limpieza automática de selecciones dependientes

### Rendimiento
- Datos cargados en memoria (no requiere llamadas HTTP)
- Filtrado eficiente usando Map para eliminar duplicados
- Ordenamiento en el repositorio, no en el componente

## Integración con el Formulario de Casos

El sistema de UBIGEO está integrado en el formulario de registro de casos (`caso-form.component.ts`):

```typescript
<div class="form-row">
  <div class="form-group">
    <label>Departamento *</label>
    <select 
      [(ngModel)]="departamentoSeleccionado" 
      name="departamento" 
      (change)="onDepartamentoChange()"
      required>
      <option value="">Seleccione un departamento...</option>
      <option *ngFor="let dept of departamentos" [value]="dept.codigo">
        {{dept.nombre}}
      </option>
    </select>
  </div>
  <!-- Provincia y Distrito similares -->
</div>
```

## Almacenamiento en el Caso

Los nombres (no los códigos) se almacenan en el objeto caso:

```typescript
caso.solicitante.departamento = "LIMA"
caso.solicitante.provincia = "LIMA"
caso.solicitante.distrito = "MIRAFLORES"
```

## Extensibilidad

### Para usar con API Backend

1. Modificar el repositorio para hacer llamadas HTTP:

```typescript
export class UbigeoHttpRepository extends UbigeoRepository {
  constructor(private http: HttpClient) {}
  
  obtenerDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>('/api/ubigeo/departamentos');
  }
  
  obtenerProvinciasPorDepartamento(codigo: string): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`/api/ubigeo/provincias/${codigo}`);
  }
  
  obtenerDistritosPorProvincia(codDept: string, codProv: string): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(`/api/ubigeo/distritos/${codDept}/${codProv}`);
  }
}
```

2. Actualizar el provider en `app.config.ts`:

```typescript
{ provide: UbigeoRepository, useClass: UbigeoHttpRepository }
```

## Ventajas del Diseño

1. **Separación de Responsabilidades**: Dominio, infraestructura y presentación separados
2. **Testeable**: Fácil crear mocks para pruebas
3. **Mantenible**: Cambiar implementación sin afectar componentes
4. **Escalable**: Fácil migrar a API backend
5. **Reutilizable**: El servicio puede usarse en múltiples componentes
6. **Datos Oficiales**: Basado en UBIGEO oficial del INEI

## Estadísticas

- Total de registros: 1,861
- Departamentos: 25
- Provincias: 196 (aproximadamente)
- Distritos: 1,861
- Tamaño del archivo de datos: ~250 KB
- Tiempo de carga: < 100ms (en memoria)

### Ejemplos de Códigos

```
Departamento LIMA:
  Código: 15

Provincia LIMA (en departamento LIMA):
  Código Referencial: 1501

Distrito MIRAFLORES (en provincia LIMA):
  Código UBIGEO: 150122
```

## Mantenimiento

Para actualizar los datos del UBIGEO:

1. Obtener nuevo archivo CSV del INEI
2. Reemplazar `docs/UBIGEO.csv`
3. Ejecutar el script de conversión:

```powershell
$csv = Import-Csv "docs\UBIGEO.csv"
$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine("import { UbigeoData } from '@domain/models/ubigeo.model';")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("export const UBIGEO_DATA: UbigeoData[] = [")
foreach($row in $csv) {
  [void]$sb.AppendLine("  { nombreDepartamento: '$($row.NOMBRE_DEPARTAMENTO)', nombreProvincia: '$($row.NOMBRE_PROVINCIA)', nombreDistrito: '$($row.NOMBRE_DISTRITO)', codigoUbigeo: '$($row.CODIGO_UBIGEO)', codigoDepartamento: '$($row.CODIGO_DEPARTAMENTO)', codigoProvincia: '$($row.CODIGO_PROVINCIA)', codigoDistrito: '$($row.CODIGO_DISTRITO)' },")
}
[void]$sb.AppendLine("];")
$sb.ToString() | Out-File "src\app\infrastructure\mock\ubigeo-data.ts" -Encoding UTF8
```

4. Verificar que compile correctamente
