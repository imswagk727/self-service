import { Component, OnInit } from '@angular/core';
import { CsvDataService } from 'src/app/shared/service/csv-data.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  csvData: { headers: string[]; rows: string[][] } | null = null;

  // 1.1 data selection
  listOfOption: string[] = [];
  listOfSelectedFeatureVariables: string[] = [];
  listOfselectedTargetVariable: string | null = null;

  // 1.2 data filteration
  listOfFilterColumns: string[] = []; // filter column name 
  listOfOperator: string[] = ['>', '<', '=', '!=']; // filter operator

  filterGroups: {  //
    listOfSelectedFilterColumn: string; // selected column
    listOfSelectedOperator: string; // selected operator
    listOfSelectedFilterValue: any[]; // selected value
  }[] = [];
  
  


  constructor(private csvDataService: CsvDataService) {
    console.log('CsvDataService injected');
    this.addFilterGroup();  // init filter group
  }

  ngOnInit() {
    // Access CSV data from the SharedService
    this.csvData = this.csvDataService.getCSVData();

    // 初始化 listOfOption 为 csvData 的 headers
    if (this.csvData && this.csvData.headers) {
      this.listOfOption = this.csvData.headers;
    }

    // init listOfFilter
    if (this.csvData && this.csvData.headers) {
      this.listOfFilterColumns = this.csvData.headers;
    }

  }

  // Reset the target variable if it matches any selected feature variable
  resetTargetIfMatch() {
    if (this.listOfselectedTargetVariable && this.listOfSelectedFeatureVariables.includes(this.listOfselectedTargetVariable)) {
      this.listOfselectedTargetVariable = null;
    }
  }

  // add new filter group
  addFilterGroup() {
    this.filterGroups.push({
      listOfSelectedFilterColumn: '', 
      listOfSelectedOperator: '',
      listOfSelectedFilterValue: [],
    });
  }

  // 更新 selected fitler value
  updateSelectedFilterValue(index: number): void {
    const group = this.filterGroups[index];
    // 获取当前所选列名
    const selectedColumn = group.listOfSelectedFilterColumn;
  
    // 初始化结果数组
    const selectedValues: any[] = [];
  
    // 检查所选列名是否为空
    if (selectedColumn && typeof selectedColumn === 'string') {
      // 在数据源中查找与所选列名匹配的数据行
      if (this.csvData && this.csvData.headers && this.csvData.rows) {
        const columnIndex = this.csvData.headers.indexOf(selectedColumn);
  
        if (columnIndex !== -1) {
          // 使用数组映射（map）来获取所选列的所有数据行
          this.csvData.rows.forEach(row => {
            selectedValues.push(row[columnIndex]);
          });
        }
      }
    }
  
    group.listOfSelectedFilterValue = selectedValues;
  }
  
}
