import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent],
    template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <span class="text-mono text-muted" style="font-size:0.65rem">
          CONGRESO TECNOLÓGICO NACIONAL &copy; 2026
        </span>
        <span class="text-mono text-muted" style="font-size:0.65rem">
          [ SISTEMA v2026.1.0 ]
        </span>
      </div>
    </footer>
  `,
    styles: [`
    :host { display: block; }

    main { min-height: calc(100vh - 64px); }

    .site-footer {
      background: var(--bg-elevated);
      border-top: 1px solid var(--border-dim);
      padding-block: var(--space-lg);

      &__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: var(--space-md);
      }
    }
  `]
})
export class AppComponent {}
