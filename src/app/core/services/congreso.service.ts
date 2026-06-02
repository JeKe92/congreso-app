import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay, map } from 'rxjs';
import { SheetsService } from './sheets.service';
import { Speaker, Stat, SuperPower, Flag, Asistente } from '../models/congreso.models';

@Injectable({ providedIn: 'root' })
export class CongresoService {
  private readonly sheets = inject(SheetsService);

  private speakers$    = this.sheets.fetchSheet<Speaker>('Ponentes').pipe(shareReplay(1));
  private stats$       = this.sheets.fetchSheet<Stat>('Stats').pipe(shareReplay(1));
  private superPowers$ = this.sheets.fetchSheet<SuperPower>('Powers').pipe(shareReplay(1));
  private flags$       = this.sheets.fetchSheet<Flag>('flags').pipe(shareReplay(1));
  private asistentes$  = this.sheets.fetchSheet<Asistente>('users').pipe(shareReplay(1));

  getSpeakers(): Observable<Speaker[]> {
    return this.speakers$;
  }

  getStats(): Observable<Stat[]> {
    return this.stats$;
  }

  getSuperPowers(): Observable<SuperPower[]> {
    return this.superPowers$;
  }

  getAsistentes(): Observable<Asistente[]> {
    return this.asistentes$;
  }

  getFlag(name: string): Observable<boolean> {
    return this.flags$.pipe(
      map(flags => flags.find(f => f.name === name)?.value?.toLowerCase() === 'true')
    );
  }
}
