import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContextMenuModel } from '../../../models/ContextMenuModel';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  callAppEmployeeSelected = new Subject<ContextMenuModel>();
  callAppEmployeeSelectedMethod$ = this.callAppEmployeeSelected.asObservable();
 
  triggerAppEmployeeSelected(data: ContextMenuModel) {
        this.callAppEmployeeSelected.next(data);
  }

  

  

  

  
  
}
