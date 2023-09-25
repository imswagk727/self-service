import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedCommonDataService {
  static baseUrl: string = 'http://localhost:4200';
  constructor() { }
}
