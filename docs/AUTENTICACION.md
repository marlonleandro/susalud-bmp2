# Sistema de Autenticación - SUSALUD BPM

## Descripción General

El sistema de autenticación implementado en SUSALUD BPM proporciona un mecanismo seguro para controlar el acceso a la aplicación mediante credenciales de usuario y tokens de sesión.

## Arquitectura

### Capa de Dominio

**Modelos** (`src/app/domain/models/auth.model.ts`):
- `LoginCredentials`: Credenciales de inicio de sesión (usuario y contraseña)
- `AuthToken`: Token de autenticación con información de expiración
- `AuthUser`: Información del usuario autenticado

**Puerto** (`src/app/domain/ports/auth.repository.ts`):
- Interface abstracta que define los métodos de autenticación
- Permite cambiar la implementación sin afectar la lógica de negocio

### Capa de Infraestructura

**Repositorio Mock** (`src/app/infrastructure/mock/auth-mock.repository.ts`):
- Implementación de prueba del repositorio de autenticación
- Valida credenciales contra valores predefinidos
- Genera tokens mock para simular autenticación real
- Almacena tokens en localStorage

**Servicio de Autenticación** (`src/app/infrastructure/services/auth.service.ts`):
- Servicio de alto nivel que facilita el uso de la autenticación
- Proporciona métodos simplificados para login, logout y verificación

**Guard de Autenticación** (`src/app/infrastructure/guards/auth.guard.ts`):
- Protege rutas que requieren autenticación
- Redirige a login si el usuario no está autenticado
- Preserva la URL de destino para redirección post-login

### Capa de Presentación

**Componente de Login** (`src/app/presentation/pages/login/login.component.ts`):
- Formulario de inicio de sesión con validación
- Manejo de errores de autenticación
- Diseño responsive y accesible
- Redirección automática después del login exitoso

## Credenciales de Prueba

```
Usuario: admin
Contraseña: admin123
```

## Flujo de Autenticación

1. Usuario accede a la aplicación
2. Si no está autenticado, es redirigido a `/login`
3. Usuario ingresa credenciales
4. Sistema valida credenciales contra el repositorio mock
5. Si son válidas, se genera un token y se almacena en localStorage
6. Usuario es redirigido al dashboard o a la URL solicitada originalmente
7. Todas las rutas protegidas verifican el token mediante el guard

## Almacenamiento

El sistema utiliza localStorage para persistir:
- `susalud_auth_token`: Token de autenticación
- `susalud_auth_user`: Nombre de usuario

## Seguridad

### Implementación Actual (Mock)
- Validación básica de credenciales
- Tokens generados localmente
- Almacenamiento en localStorage

### Recomendaciones para Producción
1. Implementar autenticación con backend real
2. Usar JWT (JSON Web Tokens) con firma digital
3. Implementar refresh tokens
4. Agregar expiración de sesión
5. Usar HTTPS en todas las comunicaciones
6. Implementar rate limiting para prevenir ataques de fuerza bruta
7. Considerar autenticación de dos factores (2FA)
8. Encriptar datos sensibles
9. Implementar logout en backend para invalidar tokens

## Rutas Protegidas

Todas las rutas principales están protegidas por el `authGuard`:
- `/dashboard`
- `/casos`
- `/workflow`
- `/reportes`
- `/ia`
- `/sgd`

## Extensibilidad

Para cambiar a autenticación real:

1. Crear nueva implementación de `AuthRepository`:
```typescript
export class AuthHttpRepository extends AuthRepository {
  constructor(private http: HttpClient) {}
  
  login(credentials: LoginCredentials): Observable<AuthToken> {
    return this.http.post<AuthToken>('/api/auth/login', credentials);
  }
  // ... otros métodos
}
```

2. Actualizar el provider en `app.config.ts`:
```typescript
{ provide: AuthRepository, useClass: AuthHttpRepository }
```

## Funcionalidades Adicionales

### Logout
- Botón de cerrar sesión en el sidebar
- Limpia el token y redirige a login
- Disponible en todas las páginas autenticadas

### Información de Usuario
- Muestra el nombre de usuario en el header
- Disponible en todas las páginas autenticadas

## Testing

Para probar el sistema:

1. Iniciar la aplicación: `npm start`
2. Navegar a `http://localhost:4200`
3. Será redirigido automáticamente a `/login`
4. Ingresar credenciales de prueba
5. Verificar redirección al dashboard
6. Intentar acceder a rutas protegidas
7. Probar el botón de logout

## Próximos Pasos

1. Integrar con API backend real
2. Implementar recuperación de contraseña
3. Agregar validación de fortaleza de contraseña
4. Implementar sesiones con expiración automática
5. Agregar logs de auditoría de accesos
6. Implementar roles y permisos
