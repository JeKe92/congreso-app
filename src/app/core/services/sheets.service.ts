import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const SHEETS_ID = '1WXMBW9w5BDJC-fzYZivmOu3y-4alTY-okiTNBLRn6lc';

@Injectable({ providedIn: 'root' })
export class SheetsService {
  private readonly http = inject(HttpClient);

  fetchSheet<T>(sheetName: string): Observable<T[]> {
    const url = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map(csv => this.parseCSV<T>(csv)));
  }

  private parseCSV<T>(csv: string): T[] {
    const lines = csv.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];

    const headers = this.parseRow(lines[0]).map(h => h.toLowerCase().trim());

    return lines.slice(1).map(line => {
      const values = this.parseRow(line);
      return headers.reduce((obj, header, i) => {
        (obj as Record<string, string>)[header] = values[i]?.trim() ?? '';
        return obj;
      }, {} as T);
    });
  }

  private parseRow(row: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === '"') {
        if (inQuotes && row[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    result.push(current);
    return result;
  }
}
