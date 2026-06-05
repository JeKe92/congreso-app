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
      import('./pages/programa/programa.component').then(m => m.ProgramaComponent),
  },
  {
    path: 'asistentes',
    loadComponent: () =>
      import('./pages/asistentes/asistentes.component').then(m => m.AsistentesComponent),
  },
  {
    path: 'potenciadores',
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
