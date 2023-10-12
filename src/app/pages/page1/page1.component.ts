import { Component, OnInit } from '@angular/core';
import { CsvDataService } from 'src/app/shared/service/csv-data.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  csvData: { headers: string[]; rows: string[][] } | null = null;

  constructor(private csvDataService: CsvDataService) {
    console.log('CsvDataService injected');
  }

  ngOnInit() {
    // Access CSV data from the SharedService
    this.csvData = this.csvDataService.getCSVData();
  }
}
