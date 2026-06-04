import { Component, inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, merge, skip } from 'rxjs';
import { TronCardComponent } from '../../components/ui/tron-card/tron-card.component';
import { TronButtonComponent } from '../../components/ui/tron-button/tron-button.component';
import { CongresoService } from '../../core/services/congreso.service';
import { TronCardAccent } from '../../components/ui/tron-card/tron-card.component';

const ACCENTS: TronCardAccent[] = ['cyan', 'orange', 'purple', 'green'];

@Component({
  selector: 'app-superpoderes',
  imports: [TronCardComponent, TronButtonComponent],
  templateUrl: './superpoderes.component.html',
  styleUrl: './superpoderes.component.scss',
})
export class SuperpoderesComponent {
  private readonly congresoService = inject(CongresoService);

  private readonly powers$    = this.congresoService.getSuperPowers();

  readonly powers       = toSignal(this.powers$, { initialValue: [] });
  readonly showWeakness = toSignal(this.congresoService.getFlag('show-weakness'), { initialValue: false });
  readonly asistentes   = toSignal(this.congresoService.getAsistentes(),  { initialValue: [] });
  readonly refreshing   = toSignal(
    merge(
      this.congresoService.getRefreshTrigger().pipe(skip(1), map(() => true)),
      this.powers$.pipe(skip(1), map(() => false))
    ),
    { initialValue: false }
  );

  readonly showOnlyAvailable = signal(false);

  readonly assignedPowers = computed(() => {
    const set = new Set<string>();
    for (const a of this.asistentes()) {
      if (a.power1?.trim()) set.add(a.power1.trim());
      if (a.power2?.trim()) set.add(a.power2.trim());
      if (a.power3?.trim()) set.add(a.power3.trim());
    }
    return set;
  });

  readonly filteredPowers = computed(() =>
    this.powers()
      .map((power, i) => ({ power, i }))
      .filter(({ power }) =>
        power.show === 'TRUE' &&
        (!this.showOnlyAvailable() || !this.assignedPowers().has(power.superpower))
      )
  );

  readonly totalVisible = computed(() =>
    this.powers().filter(p => p.show === 'TRUE').length
  );

  isAssigned(powerName: string): boolean {
    return this.assignedPowers().has(powerName);
  }

  refresh(): void {
    this.congresoService.refresh();
  }

  accentFor(i: number): TronCardAccent {
    return ACCENTS[i % ACCENTS.length];
  }

  codeFor(i: number): string {
    return `S-${String(i + 1).padStart(2, '0')}`;
  }
}
