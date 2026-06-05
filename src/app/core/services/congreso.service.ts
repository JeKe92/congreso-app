import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay, map, BehaviorSubject, switchMap } from 'rxjs';
import { SheetsService } from './sheets.service';
import { Speaker, Stat, SuperPower, Flag, Asistente, ProgramaSession } from '../models/congreso.models';

@Injectable({ providedIn: 'root' })
export class CongresoService {
  private readonly sheets = inject(SheetsService);
  private readonly refreshTrigger$ = new BehaviorSubject<void>(undefined);

  private speakers$    = this.refreshTrigger$.pipe(switchMap(() => this.sheets.fetchSheet<Speaker>('Ponentes')), shareReplay(1));
  private stats$       = this.refreshTrigger$.pipe(switchMap(() => this.sheets.fetchSheet<Stat>('Stats')), shareReplay(1));
  private superPowers$ = this.refreshTrigger$.pipe(switchMap(() => this.sheets.fetchSheet<SuperPower>('Powers')), shareReplay(1));
  private flags$       = this.refreshTrigger$.pipe(switchMap(() => this.sheets.fetchSheet<Flag>('flags')), shareReplay(1));
  private asistentes$  = this.refreshTrigger$.pipe(switchMap(() => this.sheets.fetchSheet<Asistente>('users')), shareReplay(1));
  private programa$    = this.refreshTrigger$.pipe(switchMap(() => this.sheets.fetchSheet<ProgramaSession>('Programa')), shareReplay(1));

  getSpeakers(): Observable<Speaker[]> { return this.speakers$; }
  getStats(): Observable<Stat[]>       { return this.stats$; }
  getSuperPowers(): Observable<SuperPower[]> { return this.superPowers$; }
  getAsistentes(): Observable<Asistente[]>     { return this.asistentes$; }
  getPrograma(): Observable<ProgramaSession[]> { return this.programa$; }

  getFlag(name: string): Observable<boolean> {
    return this.flags$.pipe(
      map(flags => flags.find(f => f.name === name)?.value?.toLowerCase() === 'true')
    );
  }

  refresh(): void {
    this.refreshTrigger$.next();
  }

  getRefreshTrigger(): Observable<void> {
    return this.refreshTrigger$.asObservable();
  }
}
