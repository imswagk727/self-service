import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvDataService {

  constructor() { }

  private csvData: any[] = [];

  setCsvData(data: any[]): void {
    this.csvData = data;
  }

  getCsvData(): any[] {
    return this.csvData;
  }
  
}
