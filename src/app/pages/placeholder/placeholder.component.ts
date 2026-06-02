import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TronButtonComponent } from '../../components/ui/tron-button/tron-button.component';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, TronButtonComponent],
  template: `
    <section class="placeholder grid-bg">
      <div class="container placeholder__content">
        <span class="text-mono text-muted" style="font-size:0.75rem;letter-spacing:0.15em">// EN CONSTRUCCIÓN</span>
        <h1 class="placeholder__title mt-sm">{{ data['title'] }}</h1>
        <p class="placeholder__sub text-cyan text-mono">{{ data['sub'] }}</p>
        <p class="placeholder__desc">Esta sección estará disponible próximamente.</p>
        <app-tron-button variant="secondary" routerLink="/">
          &#8592; VOLVER AL INICIO
        </app-tron-button>
      </div>
    </section>
  `,
  styles: [`
    .placeholder {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      &__content {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
      }
      &__title { font-size: clamp(2.5rem, 6vw, 5rem); }
      &__sub { font-size: 1rem; letter-spacing: 0.1em; }
      &__desc { color: var(--text-secondary); }
    }
  `],
})
export class PlaceholderComponent {
  data: Record<string, string> = {};

  constructor(private route: ActivatedRoute) {
    this.data = this.route.snapshot.data as Record<string, string>;
  }
}
