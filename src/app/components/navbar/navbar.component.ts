import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


interface NavLink {
  label: string;
  path: string;
}

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuOpen = signal(false);

  links: NavLink[] = [
    { label: 'Inicio',     path: '/' },
    { label: 'Programa',   path: '/programa' },
    { label: 'Asistentes',   path: '/asistentes' },
    { label: 'Superpoderes',       path: '/superpoderes' },
    { label: 'Registro',   path: '/registro' },
  ];

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
