import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TronButtonComponent } from '../../components/ui/tron-button/tron-button.component';
import { TronCardComponent } from '../../components/ui/tron-card/tron-card.component';

interface Speaker {
  name: string;
  role: string;
  topic: string;
  code: string;
}

interface Track {
  code: string;
  title: string;
  description: string;
  sessions: number;
  accent: 'cyan' | 'orange' | 'purple' | 'green';
}

interface Stat {
  value: string;
  label: string;
}

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterLink, TronButtonComponent, TronCardComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
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

  stats: Stat[] = [
    { value: '100+', label: 'Asistentes' },
    { value: '4+',    label: 'Ponentes' },
    { value: '5+',     label: 'Actividades' },
    { value: '3',      label: 'Días' },
  ];

  tracks: Track[] = [
    {
      code: 'T-01',
      title: 'Inteligencia Artificial',
      description: 'LLMs, agentes autónomos y el futuro del trabajo cognitivo.',
      sessions: 14,
      accent: 'cyan',
    },
    {
      code: 'T-02',
      title: 'Ciberseguridad',
      description: 'Defensa, amenazas emergentes y arquitecturas resilientes.',
      sessions: 10,
      accent: 'orange',
    },
    {
      code: 'T-03',
      title: 'Web & Cloud Native',
      description: 'Plataformas modernas, edge computing y DevOps a escala.',
      sessions: 12,
      accent: 'purple',
    },
    {
      code: 'T-04',
      title: 'Blockchain & Web3',
      description: 'Infraestructura descentralizada y economía digital.',
      sessions: 8,
      accent: 'green',
    },
  ];

  speakers: Speaker[] = [
    { name: 'Ps. Dario Virviescas',       role: 'Pastor',           topic: 'La identidad en Dios: Mefiboset', code: 'DV' },
    { name: 'Sebas Peña',       role: 'Líder de Jóvenes', topic: 'La identidad en Dios: José', code: 'SP' },
    { name: 'Andrea Galeano',           role: 'Equipo de apoyo',  topic: 'La identidad en Dios: Débora',       code: 'AG' },
    { name: 'Kevin Triana',       role: 'Equipo de apoyo',   topic: 'La identidad en Dios: Joven Rico',         code: 'KT' },
  ];
}
