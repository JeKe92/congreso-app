import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, merge } from 'rxjs';
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

  readonly attendees    = toSignal(this.attendees$, { initialValue: [] });
  readonly superPowers  = toSignal(this.congresoService.getSuperPowers(), { initialValue: [] });
  readonly showWeakness = toSignal(this.congresoService.getFlag('show-weakness'), { initialValue: false });
  readonly showPowers   = toSignal(this.congresoService.getFlag('show-powers'),   { initialValue: false });
  readonly loading = toSignal(
    merge(
      this.congresoService.getRefreshTrigger().pipe(map(() => true)),
      this.attendees$.pipe(map(() => false))
    ),
    { initialValue: true }
  );

  readonly search = signal('');

  readonly filteredAttendees = computed(() => {
    const q = this.search().toLowerCase().trim();
    if (!q) return this.attendees();
    return this.attendees().filter(a => a.name.toLowerCase().includes(q));
  });

  refresh(): void {
    this.congresoService.refresh();
  }

  posterFor(gender: string): string {
    const file = gender.toLowerCase() === 'male' ? 'wanted-boy' : 'wanted-girl';
    return `url('/img/${file}.webp')`;
  }

  powersFor(attendee: { power1?: string; power2?: string; power3?: string }): string[] {
    return [attendee.power1, attendee.power2, attendee.power3].filter((p): p is string => !!p?.trim());
  }

  weaknessFor(powerName: string): string | null {
    return this.superPowers().find(s => s.superpower === powerName)?.weakness ?? null;
  }
}
