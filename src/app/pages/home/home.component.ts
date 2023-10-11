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

  constructor(private csvPaserService: CsvParserService) {} // Inject PapaParse service
  

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