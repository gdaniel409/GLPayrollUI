/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect, MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-pay-rate-types',
  imports: [
     MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    MatError,
    
  ],
  templateUrl: './pay-rate-types.component.html',
  styleUrl: './pay-rate-types.component.css'
})
export class PayRateTypesComponent {

  @Input() rateID: number | undefined; 
  @Output() selectionChange = new EventEmitter<MatSelectChange>(); // Event for selection changes

  onSelectionChange(event: MatSelectChange): void {
    this.selectionChange.emit(event.value);
  }

  constructor()
  {}

  compare(object1: any, object2: any) {
    return object1 && object2 && object1.toString() == object2.toString()
  }

}
