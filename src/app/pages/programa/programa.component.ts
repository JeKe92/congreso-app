import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, merge } from 'rxjs';
import { TronButtonComponent } from '../../components/ui/tron-button/tron-button.component';
import { CongresoService } from '../../core/services/congreso.service';
import { ProgramaSession } from '../../core/models/congreso.models';

@Component({
  selector: 'app-programa',
  imports: [TronButtonComponent],
  templateUrl: './programa.component.html',
  styleUrl: './programa.component.scss',
})
export class ProgramaComponent {
  private readonly congresoService = inject(CongresoService);
  private readonly sessions$ = this.congresoService.getPrograma();

  readonly sessions = toSignal(this.sessions$, { initialValue: [] });
  readonly loading  = toSignal(
    merge(
      this.congresoService.getRefreshTrigger().pipe(map(() => true)),
      this.sessions$.pipe(map(() => false))
    ),
    { initialValue: true }
  );

  readonly days = computed(() => [
    ...new Set(this.sessions().map(s => s.dia)),
  ]);

  sessionsByDay(dia: string): ProgramaSession[] {
    return this.sessions().filter(s => s.dia === dia);
  }
}
