import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CsvParserService {
  private parsedDataSubject = new Subject<{
    headers: string[];
    rows: string[][];
  } | null>();

  constructor(private papa: Papa) {}

  parseCsvFile(file: File) {
    this.papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = {
          headers: result.meta.fields,
          rows: result.data.map((row: any) => Object.values(row)),
        };
        this.parsedDataSubject.next(parsedData);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        this.parsedDataSubject.next(null);
      },
    });
  }

  getParsedData(): Observable<{ headers: string[]; rows: string[][] } | null> {
    return this.parsedDataSubject.asObservable().pipe(
      tap((data) => {
        console.log('Data received from getParsedData():', data);
      })
    );
  }
}
