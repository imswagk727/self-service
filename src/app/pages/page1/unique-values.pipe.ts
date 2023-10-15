import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueValues'
})
export class UniqueValuesPipe implements PipeTransform {
  transform(value: any[]): any[] {
    if (!Array.isArray(value)) {
      return value;
    }
    // 使用 Set 数据结构来确保唯一值
    return Array.from(new Set(value));
  }
}
