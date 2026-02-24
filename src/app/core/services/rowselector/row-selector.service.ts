import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RowSelectorService {

  constructor() { }

  rowIndex : number = -1;
  pageIndex : number = 0;
  pageSize : number = 5;
}
