import { Component } from '@angular/core';
import { CsvParserService } from 'src/app/shared/service/csv-parser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedFile: File | null = null;
  csvData: { headers: string[], rows: string[][] } | null = null; // Store CSV data

  // Define pageIndex and pageSize properties for pagination
  pageIndex = 1;
  pageSize = 10;

  constructor(private csvPaserService: CsvParserService) {} // Inject PapaParse service
  

  get visibleRows() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.csvData!.rows.slice(start, end);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', this.selectedFile);

    // Implement file upload logic here

    // After successful upload, parse the CSV data
    this.csvPaserService.getParsedData; 

    // Subscribe to the parsing completion event
    this.csvPaserService.parseCsvFile(this.selectedFile);
    this.csvPaserService.getParsedData().subscribe((data) => {
      this.csvData = data;
    });
  }


  
}