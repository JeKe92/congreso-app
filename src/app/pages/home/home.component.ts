import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TronButtonComponent } from '../../components/ui/tron-button/tron-button.component';
import { TronCardComponent } from '../../components/ui/tron-card/tron-card.component';
import { CongresoService } from '../../core/services/congreso.service';
import { RevealDirective } from '../../directives/reveal.directive';
import { Track } from '../../core/models/congreso.models';

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterLink, TronButtonComponent, TronCardComponent, RevealDirective],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly congresoService = inject(CongresoService);

  readonly speakers = toSignal(this.congresoService.getSpeakers(), { initialValue: [] });
  readonly stats    = toSignal(this.congresoService.getStats(),    { initialValue: [] });

  tracks: Track[] = [
    {
      code: 'T-01',
      title: '¿Qué es la identidad?',
      description: 'La respuesta usualmente es: "Depende". Exploramos casos, desafíos y perspectivas.',
      sessions: 'viernes',
      accent: 'green',
    },
    {
      code: 'T-02',
      title: 'La identidad según Dios',
      description: '¿Por qué me debería importar lo que dice la Biblia sobre la identidad?',
      sessions: 'sábado',
      accent: 'orange',
    },
    {
      code: 'T-03',
      title: 'La vida real es compleja',
      description: '¿Cómo asumir la complejidad de la identidad sin caer en el relativismo o el reduccionismo?',
      sessions: 'domingo',
      accent: 'magenta',
    }
  ];

  private readonly targetDate = new Date('2026-06-28T19:00:00-05:00');
  private timer: ReturnType<typeof setInterval> | null = null;

  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  ngOnInit() {
    this.updateCountdown();
    this.timer = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  private updateCountdown() {
    const diff = this.targetDate.getTime() - Date.now();
    if (diff <= 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }
    this.countdown = {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1000),
    };
  }
}
