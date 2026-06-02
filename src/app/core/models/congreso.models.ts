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
