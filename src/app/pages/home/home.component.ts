import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse'; // Import PapaParse for CSV parsing

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  csvData: { headers: string[], rows: string[][] } | null = null; // Store CSV data

  constructor(private papa: Papa) {} // Inject PapaParse service

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', this.selectedFile);

    // Implement your file upload logic here (as shown previously)

    // After successful upload, parse the CSV data
    this.parseCsvData(); // Add this function
  }

  private parseCsvData(): void {
    // Ensure selectedFile is not null
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    // Parse CSV data using PapaParse
    this.papa.parse(this.selectedFile, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true, // Skip empty lines
      complete: (result) => {
        // Store the parsed data in csvData
        this.csvData = {
          headers: result.meta.fields,
          rows: result.data.map((row: any) => Object.values(row)),
        };
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
      },
    });
  }
  
}
