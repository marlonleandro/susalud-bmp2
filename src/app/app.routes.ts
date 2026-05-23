import { Routes } from '@angular/router';
import { authGuard } from './infrastructure/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./presentation/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro-publico-caso',
    loadComponent: () => import('./presentation/pages/registro-publico/registro-publico-caso.component').then(m => m.RegistroPublicoCasoComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./presentation/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'casos',
    loadComponent: () => import('./presentation/pages/casos/casos-list.component').then(m => m.CasosListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'casos/nuevo',
    loadComponent: () => import('./presentation/pages/casos/caso-form.component').then(m => m.CasoFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'casos/:id',
    loadComponent: () => import('./presentation/pages/casos/caso-detail.component').then(m => m.CasoDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'pendientes',
    loadComponent: () => import('./presentation/pages/pendientes/pendientes-list.component').then(m => m.PendientesListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'pendientes/:id',
    loadComponent: () => import('./presentation/pages/pendientes/pendiente-detail.component').then(m => m.PendienteDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'ipress',
    loadComponent: () => import('./presentation/pages/ipress/ipress-mapa.component').then(m => m.IpressMapaComponent),
    canActivate: [authGuard]
  },
  {
    path: 'workflow',
    loadComponent: () => import('./presentation/pages/workflow/workflow.component').then(m => m.WorkflowComponent),
    canActivate: [authGuard]
  },
  {
    path: 'reportes',
    loadComponent: () => import('./presentation/pages/reportes/reportes.component').then(m => m.ReportesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'ia',
    loadComponent: () => import('./presentation/pages/ia/ia.component').then(m => m.IAComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sgd',
    loadComponent: () => import('./presentation/pages/sgd/sgd.component').then(m => m.SGDComponent),
    canActivate: [authGuard]
  },
  {
    path: 'especialistas',
    loadComponent: () => import('./presentation/pages/especialistas/especialistas-list.component').then(m => m.EspecialistasListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'especialistas/nuevo',
    loadComponent: () => import('./presentation/pages/especialistas/especialista-form.component').then(m => m.EspecialistaFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'especialistas/:id',
    loadComponent: () => import('./presentation/pages/especialistas/especialista-detail.component').then(m => m.EspecialistaDetailComponent),
    canActivate: [authGuard]
  }
];
