export interface Speaker {
  name: string;
  role: string;
  topic: string;
  code: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Flag {
  name: string;
  value: string;
}

export interface Asistente {
  name: string;
  gender: string;
  power1?: string;
  power2?: string;
  power3?: string;
}

export interface SuperPower {
  superpower: string;
  weakness: string;
  cost: string;
  show: string;
}

export interface Track {
  code: string;
  title: string;
  description: string;
  sessions: number;
  accent: 'cyan' | 'orange' | 'purple' | 'green';
}
