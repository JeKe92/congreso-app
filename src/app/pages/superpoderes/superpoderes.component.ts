import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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

  readonly powers       = toSignal(this.congresoService.getSuperPowers(), { initialValue: [] });
  readonly showWeakness = toSignal(this.congresoService.getFlag('show-weakness'), { initialValue: false });

  accentFor(i: number): TronCardAccent {
    return ACCENTS[i % ACCENTS.length];
  }

  codeFor(i: number): string {
    return `S-${String(i + 1).padStart(2, '0')}`;
  }
}
