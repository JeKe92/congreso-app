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
    { label: 'Asistentes',   path: '/asistentes' },
    { label: 'Potenciadores',       path: '/potenciadores' },
  ];

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
