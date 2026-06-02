import { Component } from '@angular/core';
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
  standalone: true,
  imports: [CommonModule, RouterLink, TronButtonComponent, TronCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  countdown = { days: 47, hours: 12, minutes: 38, seconds: 5 };

  stats: Stat[] = [
    { value: '2,400+', label: 'Asistentes' },
    { value: '80+',    label: 'Ponentes' },
    { value: '12',     label: 'Tracks' },
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
    { name: 'Dr. Ana Torres',       role: 'CTO · NeuralLabs',           topic: 'Modelos fundacionales en producción', code: 'AT' },
    { name: 'Javier Mendoza',       role: 'Security Researcher · CISA', topic: 'Zero-trust en infraestructura crítica', code: 'JM' },
    { name: 'Priya Nair',           role: 'Principal Eng · Cloudflare',  topic: 'Edge computing a escala global',       code: 'PN' },
    { name: 'Lucas Ferreira',       role: 'Co-founder · ChainBridge',   topic: 'Interoperabilidad cross-chain',         code: 'LF' },
    { name: 'Dr. Isabel Ramos',     role: 'AI Ethics · UNESCO',         topic: 'IA responsable: marcos regulatorios',   code: 'IR' },
    { name: 'Marco van den Berg',   role: 'VP Eng · HashiCorp',         topic: 'Infraestructura como código 2.0',       code: 'MB' },
  ];
}
