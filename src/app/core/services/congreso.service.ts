import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { SheetsService } from './sheets.service';
import { Speaker, Stat } from '../models/congreso.models';

@Injectable({ providedIn: 'root' })
export class CongresoService {
  private readonly sheets = inject(SheetsService);

  private speakers$ = this.sheets.fetchSheet<Speaker>('Ponentes').pipe(shareReplay(1));
  private stats$    = this.sheets.fetchSheet<Stat>('Stats').pipe(shareReplay(1));

  getSpeakers(): Observable<Speaker[]> {
    return this.speakers$;
  }

  getStats(): Observable<Stat[]> {
    return this.stats$;
  }
}
