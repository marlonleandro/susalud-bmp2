import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./presentation/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'casos',
    loadComponent: () => import('./presentation/pages/casos/casos-list.component').then(m => m.CasosListComponent)
  },
  {
    path: 'casos/nuevo',
    loadComponent: () => import('./presentation/pages/casos/caso-form.component').then(m => m.CasoFormComponent)
  },
  {
    path: 'casos/:id',
    loadComponent: () => import('./presentation/pages/casos/caso-detail.component').then(m => m.CasoDetailComponent)
  },
  {
    path: 'workflow',
    loadComponent: () => import('./presentation/pages/workflow/workflow.component').then(m => m.WorkflowComponent)
  },
  {
    path: 'reportes',
    loadComponent: () => import('./presentation/pages/reportes/reportes.component').then(m => m.ReportesComponent)
  },
  {
    path: 'ia',
    loadComponent: () => import('./presentation/pages/ia/ia.component').then(m => m.IAComponent)
  },
  {
    path: 'sgd',
    loadComponent: () => import('./presentation/pages/sgd/sgd.component').then(m => m.SGDComponent)
  }
];
