import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvDataService {
  private csvData: any[] = [];

  constructor() { }

  setCSVData(data: any[]) {
    this.csvData = data;
  }

  getCSVData() {
    return this.csvData;
  }
}
