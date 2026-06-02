import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'programa',
    loadComponent: () =>
      import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'PROGRAMA', sub: 'Agenda del congreso' },
  },
  {
    path: 'asistentes',
    loadComponent: () =>
      import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'ASISTENTES', sub: 'Personas que asistirán al congreso' },
  },
  {
    path: 'superpoderes',
    loadComponent: () =>
      import('./pages/superpoderes/superpoderes.component').then(m => m.SuperpoderesComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'REGISTRO', sub: 'Obtén tu entrada' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
