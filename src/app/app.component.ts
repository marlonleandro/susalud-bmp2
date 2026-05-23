import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@infrastructure/services/auth.service';
import { ChatbotFlotanteComponent } from '@presentation/components/chatbot-flotante/chatbot-flotante.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ChatbotFlotanteComponent],
  template: `
    <div class="app-container" *ngIf="!isLoginPage()" [class.sidebar-collapsed]="sidebarCollapsed">
      <nav class="sidebar" [class.collapsed]="sidebarCollapsed">
        <div class="logo">
          <img *ngIf="!sidebarCollapsed" src="../../assets/images/logo_susalud.png" style="width:200px;"/>
          <img *ngIf="sidebarCollapsed" src="../../assets/images/logo_susalud.png" style="width:36px; object-fit:cover; object-position:left;"/>
          <p class="subtitle" *ngIf="!sidebarCollapsed">Sistema de Gestión BMP 2.0</p>
        </div>
        
        <ul class="menu">
          <li>
            <a routerLink="/dashboard" routerLinkActive="active" [title]="sidebarCollapsed ? 'Dashboard' : ''">
              <span class="icon">📊</span>
              <span class="label">Dashboard</span>
            </a>
          </li>
          <li>
            <a routerLink="/casos" routerLinkActive="active" [title]="sidebarCollapsed ? 'Gestión de Casos' : ''">
              <span class="icon">📋</span>
              <span class="label">Gestión de Casos</span>
            </a>
          </li>
          <li>
            <a routerLink="/pendientes" routerLinkActive="active" [title]="sidebarCollapsed ? 'Mis Pendientes' : ''">
              <span class="icon">⏳</span>
              <span class="label">Mis Pendientes</span>
            </a>
          </li>
          <li>
            <a routerLink="/ipress" routerLinkActive="active" [title]="sidebarCollapsed ? 'IPRESS' : ''">
              <span class="icon">🏥</span>
              <span class="label">IPRESS</span>
            </a>
          </li>
          <li>
            <a routerLink="/workflow" routerLinkActive="active" [title]="sidebarCollapsed ? 'Workflow' : ''">
              <span class="icon">🔄</span>
              <span class="label">Workflow</span>
            </a>
          </li>
          <li>
            <a routerLink="/reportes" routerLinkActive="active" [title]="sidebarCollapsed ? 'Reportes' : ''">
              <span class="icon">📈</span>
              <span class="label">Reportes</span>
            </a>
          </li>
          <li>
            <a routerLink="/ia" routerLinkActive="active" [title]="sidebarCollapsed ? 'IA Aplicada' : ''">
              <span class="icon">🤖</span>
              <span class="label">IA Aplicada</span>
            </a>
          </li>
          <li>
            <a routerLink="/sgd" routerLinkActive="active" [title]="sidebarCollapsed ? 'Integración SGD' : ''">
              <span class="icon">🔗</span>
              <span class="label">Integración SGD</span>
            </a>
          </li>
          <li>
            <a routerLink="/especialistas" routerLinkActive="active" [title]="sidebarCollapsed ? 'Especialistas' : ''">
              <span class="icon">👨‍⚕️</span>
              <span class="label">Especialistas</span>
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <button class="btn-logout" (click)="logout()" [title]="sidebarCollapsed ? 'Cerrar Sesión' : ''">
            <span class="icon">🚪</span>
            <span class="label">Cerrar Sesión</span>
          </button>
        </div>
      </nav>
      
      <main class="main-content">
        <header class="header">
          <div class="header-left">
            <button class="hamburger-btn" (click)="toggleSidebar()" [attr.aria-label]="sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
            <h1>Sistema de Gestión de Consultas y Denuncias</h1>
          </div>
          <div class="header-right">
            <span class="user-info">👤 Usuario: {{ getUsername() }}</span>
          </div>
        </header>
        
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>

    <div *ngIf="isLoginPage()">
      <router-outlet></router-outlet>
    </div>

    <!-- Chatbot flotante global (solo visible cuando no es login) -->
    <app-chatbot-flotante *ngIf="!isLoginPage()"></app-chatbot-flotante>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      background: #f5f7fa;
      transition: all 0.3s ease;
    }

    /* ── Sidebar ── */
    .sidebar {
      width: 260px;
      background: linear-gradient(180deg, #0EA6F1 0%, #568FDD 100%);
      color: white;
      padding: 20px;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      overflow: hidden;
    }

    .sidebar.collapsed {
      width: 72px;
      padding: 20px 10px;
    }

    /* Logo */
    .logo {
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      overflow: hidden;
      white-space: nowrap;
    }

    .sidebar.collapsed .logo {
      margin-bottom: 24px;
      display: flex;
      justify-content: center;
    }

    .subtitle {
      margin: 5px 0 0 0;
      font-size: 12px;
      opacity: 0.8;
    }

    /* Menu */
    .menu {
      list-style: none;
      padding: 0;
      margin: 0;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .menu li {
      margin-bottom: 4px;
    }

    .menu a {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      transition: background 0.2s, transform 0.2s;
      white-space: nowrap;
    }

    .sidebar.collapsed .menu a {
      padding: 12px;
      justify-content: center;
    }

    .menu a:hover {
      background: rgba(255,255,255,0.15);
      transform: translateX(3px);
    }

    .sidebar.collapsed .menu a:hover {
      transform: none;
    }

    .menu a.active {
      background: rgba(255,255,255,0.25);
      font-weight: 600;
    }

    .icon {
      font-size: 20px;
      flex-shrink: 0;
      margin-right: 12px;
    }

    .sidebar.collapsed .icon {
      margin-right: 0;
    }

    .label {
      overflow: hidden;
      transition: opacity 0.2s, max-width 0.3s;
      max-width: 200px;
      opacity: 1;
    }

    .sidebar.collapsed .label {
      max-width: 0;
      opacity: 0;
    }

    /* Footer */
    .sidebar-footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.2);
    }

    .btn-logout {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255,255,255,0.1);
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      font-size: 14px;
      white-space: nowrap;
    }

    .sidebar.collapsed .btn-logout {
      padding: 12px;
      justify-content: center;
    }

    .btn-logout:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }

    .btn-logout .icon {
      margin-right: 12px;
      font-size: 18px;
    }

    .sidebar.collapsed .btn-logout .icon {
      margin-right: 0;
    }

    /* ── Main content ── */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-width: 0;
    }

    /* ── Header ── */
    .header {
      background: white;
      padding: 0 30px;
      height: 64px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .header h1 {
      margin: 0;
      font-size: 18px;
      color: #1e3a8a;
      white-space: nowrap;
    }

    /* Hamburger button */
    .hamburger-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      padding: 6px;
      background: transparent;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.2s;
    }

    .hamburger-btn:hover {
      background: #f1f5f9;
    }

    .hamburger-line {
      display: block;
      width: 100%;
      height: 2px;
      background: #1e3a8a;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .user-info {
      font-size: 14px;
      color: #64748b;
      white-space: nowrap;
    }

    /* ── Content area ── */
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 30px;
    }

    /* ── Tooltip for collapsed icons ── */
    .sidebar.collapsed .menu a[title]:hover::after {
      content: attr(title);
      position: absolute;
      left: 72px;
      background: rgba(30, 41, 59, 0.9);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 100;
    }

    .sidebar.collapsed .menu a {
      position: relative;
    }

    @media (max-width: 768px) {
      .header h1 {
        font-size: 14px;
      }
    }

    /* Responsive: pantallas menores de 800px */
    @media (max-width: 800px) {
      /* Forzar sidebar colapsado */
      .sidebar {
        width: 72px !important;
        padding: 20px 10px !important;
      }

      .sidebar .logo {
        margin-bottom: 24px;
        display: flex;
        justify-content: center;
      }

      .sidebar .menu a {
        padding: 12px !important;
        justify-content: center;
      }

      .sidebar .icon {
        margin-right: 0 !important;
      }

      .sidebar .label {
        max-width: 0 !important;
        opacity: 0 !important;
      }

      .sidebar .btn-logout {
        padding: 12px !important;
        justify-content: center;
      }

      .sidebar .btn-logout .icon {
        margin-right: 0 !important;
      }

      /* Ocultar botón hamburguesa */
      .hamburger-btn {
        display: none !important;
      }

      /* Ajustar header sin el botón hamburguesa */
      .header-left {
        gap: 0 !important;
      }

      .header {
        padding: 0 15px;
      }

      .content {
        padding: 15px;
      }
    }
  `]
})
export class AppComponent {
  title = 'SUSALUD BPM';
  sidebarCollapsed = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/registro-publico-caso';
  }

  getUsername(): string {
    return this.authService.getUsername() || 'Usuario';
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
  }
}
