import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { TronButtonComponent } from '../../components/ui/tron-button/tron-button.component';
import { CongresoService } from '../../core/services/congreso.service';

@Component({
  selector: 'app-asistentes',
  imports: [TronButtonComponent],
  templateUrl: './asistentes.component.html',
  styleUrl: './asistentes.component.scss',
})
export class AsistentesComponent {
  private readonly congresoService = inject(CongresoService);

  private readonly attendees$ = this.congresoService.getAsistentes();

  readonly attendees = toSignal(this.attendees$, { initialValue: [] });
  readonly loading   = toSignal(
    this.attendees$.pipe(map(() => false), startWith(true)),
    { initialValue: true }
  );

  readonly search = signal('');

  readonly filteredAttendees = computed(() => {
    const q = this.search().toLowerCase().trim();
    if (!q) return this.attendees();
    return this.attendees().filter(a => a.name.toLowerCase().includes(q));
  });

  posterFor(gender: string): string {
    const file = gender.toLowerCase() === 'male' ? 'wanted-boy' : 'wanted-girl';
    return `url('/img/${file}.webp')`;
  }
}
