import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <nav class="sidebar">
        <div class="logo">
          <img src="../../assets/images/logo_susalud.png" style="width:220px;"/>
          <p class="subtitle">Sistema de Gestión BMP 2.0</p>
        </div>
        
        <ul class="menu">
          <li>
            <a routerLink="/dashboard" routerLinkActive="active">
              <span class="icon">📊</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a routerLink="/casos" routerLinkActive="active">
              <span class="icon">📋</span>
              <span>Gestión de Casos</span>
            </a>
          </li>
          <li>
            <a routerLink="/workflow" routerLinkActive="active">
              <span class="icon">🔄</span>
              <span>Workflow</span>
            </a>
          </li>
          <li>
            <a routerLink="/reportes" routerLinkActive="active">
              <span class="icon">📈</span>
              <span>Reportes</span>
            </a>
          </li>
          <li>
            <a routerLink="/ia" routerLinkActive="active">
              <span class="icon">🤖</span>
              <span>IA Aplicada</span>
            </a>
          </li>
          <li>
            <a routerLink="/sgd" routerLinkActive="active">
              <span class="icon">🔗</span>
              <span>Integración SGD</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <main class="main-content">
        <header class="header">
          <div class="header-left">
            <h1>Sistema de Gestión de Consultas y Denuncias</h1>
          </div>
          <div class="header-right">
            <span class="user-info">👤 Usuario: Admin</span>
          </div>
        </header>
        
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      background: #f5f7fa;
    }

    .sidebar {
      width: 260px;
      background: linear-gradient(180deg, #0EA6F1 0%, #568FDD 100%);
      color: white;
      padding: 20px;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }

    .logo {
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .logo h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }

    .subtitle {
      margin: 5px 0 0 0;
      font-size: 12px;
      opacity: 0.8;
    }

    .menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .menu li {
      margin-bottom: 8px;
    }

    .menu a {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s;
    }

    .menu a:hover {
      background: rgba(255,255,255,0.1);
      transform: translateX(5px);
    }

    .menu a.active {
      background: rgba(255,255,255,0.2);
      font-weight: 600;
    }

    .icon {
      margin-right: 12px;
      font-size: 20px;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .header {
      background: white;
      padding: 20px 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header h1 {
      margin: 0;
      font-size: 20px;
      color: #1e3a8a;
    }

    .user-info {
      font-size: 14px;
      color: #64748b;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 30px;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 80px;
      }

      .sidebar span:not(.icon) {
        display: none;
      }

      .logo h2 {
        font-size: 16px;
      }

      .subtitle {
        display: none;
      }
    }
  `]
})
export class AppComponent {
  title = 'SUSALUD BPM';
}
