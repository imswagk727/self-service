import { Component, OnInit } from '@angular/core';
import { CsvDataService } from 'src/app/shared/service/csv-data.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit {
  csvData: { headers: string[]; rows: string[][] } | null = null;

  // 1.1 data selection
  listOfOption: string[] = [];
  listOfSelectedFeatureVariables: string[] = [];
  listOfselectedTargetVariable: string | null = null;

  // 1.2 data filteration
  listOfOperator: string[] = ['>', '<', '=', '!=']; // filter operator
  listOfOperatorNumeical: string[] = ['>', '<', '=', '!=']; // filter operator
  listOfOperatorCategorical: string[] = ['=', '!='];

  filterGroups: {
    //
    listOfSelectedFilterColumn: string; // selected column
    listOfSelectedOperator: string; // selected operator
    listofSelectableValues: any[];
    listOfSelectedFilterValue: any[]; // selected value
    isNumber: boolean;
    isDiverseNumber: boolean;
    minValue: number | null;
    maxValue: number | null;
  }[] = [];

  isTableVisible = false;
  filteredData: { headers: string[], rows: any[][] } = { headers: [], rows: [] };
  pageIndex = 1;
  pageSize = 10;

  constructor(private csvDataService: CsvDataService) {
    console.log('CsvDataService injected');
  }

  ngOnInit() {
    // Access CSV data from the SharedService
    this.csvData = this.csvDataService.getCSVData();

    // 初始化 listOfOption 为 csvData 的 headers
    if (this.csvData && this.csvData.headers) {
      this.listOfOption = this.csvData.headers;
    }
  }

  // Reset the target variable if it matches any selected feature variable
  resetTargetIfMatch() {
    if (
      this.listOfselectedTargetVariable &&
      this.listOfSelectedFeatureVariables.includes(
        this.listOfselectedTargetVariable
      )
    ) {
      this.listOfselectedTargetVariable = null;
    }
  }

  // filter column name
  get combinedFeatureAndTargetVariables(): string[] {
    const combinedVariables = [...this.listOfSelectedFeatureVariables];
    if (this.listOfselectedTargetVariable) {
      combinedVariables.push(this.listOfselectedTargetVariable);
    }
    return combinedVariables;
  }

  // add new filter group
  addFilterGroup() {
    this.filterGroups.push({
      listOfSelectedFilterColumn: '',
      listOfSelectedOperator: '',
      listofSelectableValues: [],
      listOfSelectedFilterValue: [],
      isNumber: false,
      isDiverseNumber: false,
      minValue: null,
      maxValue: null,
    });
  }

  // remove a filter
  removeFilterGroup(index: number) {
    this.filterGroups.splice(index, 1);
  }

  // 更新 selected fitler value
  updateSelectedFilterValue(index: number): void {
    const group = this.filterGroups[index];
    // 获取当前所选列名
    const selectedColumn = group.listOfSelectedFilterColumn;

    // 结果数组
    const selectableValues = this.getColumnValues(selectedColumn);
    group.listofSelectableValues = selectableValues
    console.log('data column:', group.listOfSelectedFilterColumn);
    console.log('data value:', selectableValues);
    group.isNumber = this.isNumeric(selectableValues);
    group.isDiverseNumber = this.hasMoreThanFiveUniqueNumbers(
      selectableValues
    );
    console.log('isNumber:', group.isNumber);
    console.log('isDiverseNumber:', group.isDiverseNumber);

    // Calculate min and max for numeric values
    const numericValues = selectableValues
      .map((value) => parseFloat(value))
      .filter((value) => !isNaN(value));

    if (numericValues.length > 0) {
      group.minValue = Math.min(...numericValues);
      group.maxValue = Math.max(...numericValues);
    } else {
      group.minValue = null;
      group.maxValue = null;
    }
    console.log('Min:', group.minValue);
    console.log('Max:', group.maxValue);

  }

  updateSelectVariable(): void {
    this.filteredData = this.getColumnValuesForMultipleColumns(this.combinedFeatureAndTargetVariables);
    console.log('combined column', this.combinedFeatureAndTargetVariables)
    console.log('combined value', this.filteredData);
  }

  isNumeric(columnData: string[]): boolean {
    return columnData.every((value) => !isNaN(parseFloat(value)));
  }

  hasMoreThanFiveUniqueNumbers(columnData: string[]): boolean {
    const uniqueNumbers = new Set();

    for (const value of columnData) {
      if (!isNaN(parseFloat(value))) {
        uniqueNumbers.add(parseFloat(value));
        if (uniqueNumbers.size > 5) {
          return true;
        }
      }
    }
    return false;
  }

  getColumnValues(columnName: string): any[] {
    const values: any[] = [];

    // 检查所选列名是否为空
    if (columnName && typeof columnName === 'string') {
      // 在数据源中查找与所选列名匹配的数据行
      if (this.csvData && this.csvData.headers && this.csvData.rows) {
        const columnIndex = this.csvData.headers.indexOf(columnName);

        if (columnIndex !== -1) {
          // 使用数组映射（map）来获取所选列的所有数据行
          this.csvData.rows.forEach((row) => {
            values.push(row[columnIndex]);
          });
        }
      }
    }

    return values;
  }

  // getColumnValuesForMultipleColumns(columnNames: string[]): { [key: string]: any[] } {
  //   // object: key-value pair
  //   const result: { [key: string]: any[] } = {};

  //   for (const columnName of columnNames) {
  //     const values = this.getColumnValues(columnName);
  //     result[columnName] = values;
  //   }

  //   return result;
  // }

  getColumnValuesForMultipleColumns(columnNames: string[]): { headers: string[], rows: any[][] } {
    // csv data format
    const result: { headers: string[], rows: any[][] } = {
      headers: [],
      rows: []
    };

    // Check if csvData is not null before accessing its properties
    if (this.csvData) {
      result.headers = columnNames;

      const numRows = this.csvData.rows.length;

      for (let i = 0; i < numRows; i++) {
        const row: any[] = [];
        for (const columnName of columnNames) {
          // Check if headers is not null before using indexOf
          if (this.csvData.headers) {
            const columnIndex = this.csvData.headers.indexOf(columnName);
            // Check if columnIndex is not -1 (meaning the column exists) before accessing the row
            if (columnIndex !== -1) {
              row.push(this.csvData.rows[i][columnIndex]);
            } else {
              row.push(null); // Handle cases where the column is not found
            }
          } else {
            row.push(null); // Handle cases where headers is null
          }
        }
        result.rows.push(row);
      }
    }

    return result;
  }

  get visibleRows() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredData!.rows.slice(start, end);
  }

  checkFilterGroups() {
    console.log(this.filterGroups)
  }



}