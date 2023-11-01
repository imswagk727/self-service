import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CsvParserService } from 'src/app/shared/service/csv-parser.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/shared/service/csv-data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  customColumn: any[] = [];

  isVisible: boolean = false;
  title: any[] = [];
  footer: any[] = [];
  fix: any[] = [];
  notFix: any[] = [];
  isLoading = true; // Add loading state

  // csvData
  headers: any[] = [];
  listOfData: any[] = [];

  selectedFile: File | null = null;
  csvData: { headers: string[]; rows: string[][] } | null = null;
  totalItems = 0;
  titleText: string = "";

  // Define pageIndex and pageSize properties for pagination
  pageIndex = 1;
  pageSize = 10;


  constructor(private cdr: ChangeDetectorRef, private csvDataService: CsvDataService, private csvPaserService: CsvParserService, private router: Router) {
    console.log('CsvDataService injected');
  }

  get visibleRows() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.csvData!.rows.slice(start, end);
  }

  ngOnInit(): void {


  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.fix = this.fix.map(item => {
      item.default = true;
      return item;
    });
    this.notFix = this.notFix.map(item => {
      item.default = false;
      return item;
    });
    this.cdr.markForCheck();
  }

  deleteCustom(value: any, index: number): void {
    value.default = false;
    this.notFix = [...this.notFix, value];
    this.fix.splice(index, 1);
    this.cdr.markForCheck();
  }

  addCustom(value: any, index: number): void {
    value.default = true;
    this.fix = [...this.fix, value];
    this.notFix.splice(index, 1);
    this.cdr.markForCheck();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.customColumn = [...this.title, ...this.fix, ...this.notFix, ...this.footer];
    this.isVisible = false;
    this.cdr.markForCheck();
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    this.isLoading = true; // Set loading state when uploading
    this.cdr.markForCheck();

    const formData = new FormData();
    formData.append('csvFile', this.selectedFile);

    // Implement file upload logic here

    // After successful upload, parse the CSV data
    this.csvPaserService.parseCsvFile(this.selectedFile);

    // Subscribe to the parsing completion event
    this.csvPaserService.getParsedData().subscribe((data) => {
      this.csvData = data;
      this.totalItems = this.csvData?.rows.length || 0; // Set totalItems
      this.titleText = `(Total Rows: ${this.totalItems})`;

      if (this.csvData) {
        this.headers = this.csvData.headers
        this.listOfData = this.csvData.rows

        const firstRow = this.csvData.rows[0];
        this.customColumn = this.headers.map(header => ({
          name: header,
          value: header,
          default: true,
          width: 200,
          // position: 'left', // or right
          // required: true
          listOfFilter: this.generateFilterOptions(header), // Generate filter options
          // listOfFilter: [],
          filterFn: null,
          filterMultiple: true
        }));


      }

      // configure custom column list
      // this.title = this.customColumn.filter(item => item.position === 'left' && item.required); 
      // this.footer = this.customColumn.filter(item => item.position === 'right' && item.required); 
      this.fix = this.customColumn.filter(item => item.default && !item.required);
      this.notFix = this.customColumn.filter(item => !item.default && !item.required);
      console.log('customColumn', this.customColumn)
      console.log('listOfData:', this.listOfData)

      this.isLoading = false; // Turn off loading state when data is loaded
      this.cdr.markForCheck();

      //store the data in csv-data service
      this.csvDataService.setCSVData(this.csvData);
    });

    // this.csvData = this.csvDataService.getCSVData()

  }

  generateFilterOptions(columnName: string): any[] {
    // Extract values from the specified column
    const columnIndex = this.headers.indexOf(columnName);
    const columnData = this.listOfData.map(row => row[columnIndex]);

    // Use Set to keep only unique values
    const uniqueOptions = Array.from(new Set(columnData));

    // Sort the options if needed
    uniqueOptions.sort();

    return uniqueOptions.map(option => ({ text: option, value: option }));
  }

  startAnalysis() {
    this.router.navigate(['/page1']);
  }



}