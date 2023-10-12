import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvDataService {

  private csvData: { headers: string[]; rows: string[][] } | null = null;

  setCSVData(data: { headers: string[]; rows: string[][] } | null) {
    this.csvData = data;
  }

  getCSVData(): { headers: string[]; rows: string[][] } | null {
    return this.csvData;
  }
}
