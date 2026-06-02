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
    path: 'ponentes',
    loadComponent: () =>
      import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'PONENTES', sub: 'Speakers confirmados' },
  },
  {
    path: 'sede',
    loadComponent: () =>
      import('./pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
    data: { title: 'SEDE', sub: 'Lugar del evento' },
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
