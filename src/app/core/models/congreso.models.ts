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

export interface Track {
  code: string;
  title: string;
  description: string;
  sessions: number;
  accent: 'cyan' | 'orange' | 'purple' | 'green';
}
