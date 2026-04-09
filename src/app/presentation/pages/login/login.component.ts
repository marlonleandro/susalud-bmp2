import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthRepository } from '@domain/ports/auth.repository';
import { LoginCredentials } from '@domain/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <img src="assets/images/logo_susalud.png" alt="SUSALUD" class="logo">
          <h1>Sistema de Gestión de Consultas y Denuncias</h1>
          <p>SUSALUD - Superintendencia Nacional de Salud</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="credentials.username"
              placeholder="Ingrese su usuario"
              required
              [disabled]="isLoading"
              autocomplete="username"
            >
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="credentials.password"
              placeholder="Ingrese su contraseña"
              required
              [disabled]="isLoading"
              autocomplete="current-password"
            >
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn-login" [disabled]="isLoading">
            <span *ngIf="!isLoading">Iniciar Sesión</span>
            <span *ngIf="isLoading">Iniciando sesión...</span>
          </button>
        </form>

        <div class="login-footer">
          <p class="help-text">Usuario de prueba: <strong>admin</strong> / Contraseña: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0EA6F1 0%, #568FDD 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 450px;
      padding: 40px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .logo {
      max-width: 180px;
      height: auto;
      margin-bottom: 20px;
    }

    .login-header h1 {
      font-size: 1.5rem;
      color: #2d3748;
      margin: 0 0 10px 0;
      font-weight: 600;
    }

    .login-header p {
      color: #718096;
      font-size: 0.95rem;
      margin: 0;
    }

    .login-form {
      margin-top: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #2d3748;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-group input:disabled {
      background-color: #f7fafc;
      cursor: not-allowed;
    }

    .error-message {
      background-color: #fed7d7;
      color: #c53030;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 0.9rem;
      border-left: 4px solid #c53030;
    }

    .btn-login {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .btn-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .login-footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }

    .help-text {
      text-align: center;
      color: #718096;
      font-size: 0.85rem;
      margin: 0;
    }

    .help-text strong {
      color: #2d3748;
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 30px 20px;
      }

      .login-header h1 {
        font-size: 1.25rem;
      }

      .logo {
        max-width: 150px;
      }
    }
  `]
})
export class LoginComponent {
  private authRepository = inject(AuthRepository);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  credentials: LoginCredentials = {
    username: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Por favor, ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authRepository.login(this.credentials).subscribe({
      next: (authToken) => {
        console.log('Login exitoso:', authToken);
        
        // Obtener la URL de retorno o ir al dashboard
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.isLoading = false;
      }
    });
  }
}
