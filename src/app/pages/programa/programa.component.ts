import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  readonly sessions = toSignal(this.congresoService.getPrograma(), { initialValue: [] });

  readonly days = computed(() => [
    ...new Set(this.sessions().map(s => s.dia)),
  ]);

  sessionsByDay(dia: string): ProgramaSession[] {
    return this.sessions().filter(s => s.dia === dia);
  }
}
