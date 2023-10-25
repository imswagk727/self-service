import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CsvParserService } from 'src/app/shared/service/csv-parser.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/shared/service/csv-data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CustomRow, CustomColumn } from './shared-interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  listOfData: CustomRow[] = [
    {
      key: '1',
      name: 'John Brown',
      gender: 'female',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      gender: 'female',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      gender: 'male',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  customColumn: CustomColumn[] = [
    {
      name: 'Name',
      value: 'name',
      default: true,
      required: true,
      position: 'left',
      width: 200,
      fixWidth: true
    },
    {
      name: 'Gender',
      value: 'gender',
      default: true,
      width: 200
    },
    {
      name: 'Address',
      value: 'address',
      default: true,
      width: 200
    },
    {
      name: 'Age',
      value: 'age',
      default: true,
      width: 200,
      required: true,
      position: 'right',
    }
  ];

  isVisible: boolean = false;
  title: CustomColumn[] = [];
  footer: CustomColumn[] = [];
  fix: CustomColumn[] = [];
  notFix: CustomColumn[] = [];

  selectedFile: File | null = null;
  csvData: { headers: string[]; rows: string[][] } | null = null;
  totalItems = 0;
  titleText: string = "";

  constructor(private cdr: ChangeDetectorRef, private csvDataService: CsvDataService, private csvPaserService: CsvParserService) {
    console.log('CsvDataService injected');
  }

  ngOnInit(): void {
    this.title = this.customColumn.filter(item => item.position === 'left' && item.required);
    this.footer = this.customColumn.filter(item => item.position === 'right' && item.required);
    this.fix = this.customColumn.filter(item => item.default && !item.required);
    this.notFix = this.customColumn.filter(item => !item.default && !item.required);

    this.csvData = this.csvDataService.getCSVData()
  }

  drop(event: CdkDragDrop<CustomColumn[]>): void {
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

  deleteCustom(value: CustomColumn, index: number): void {
    value.default = false;
    this.notFix = [...this.notFix, value];
    this.fix.splice(index, 1);
    this.cdr.markForCheck();
  }

  addCustom(value: CustomColumn, index: number): void {
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

      //store the data in csv-data service
      this.csvDataService.setCSVData(this.csvData);
    });
  }
}