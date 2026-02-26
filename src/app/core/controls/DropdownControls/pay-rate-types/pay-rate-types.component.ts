
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { RateTypeService } from '../../../services/ratetype/rate-type';
import { RateTypeModel } from '../../../../models/RateTypeModel';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-pay-rate-types',
  imports: [
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    MatError,
    AsyncPipe,
    CommonModule,
    
],
  templateUrl: './pay-rate-types.component.html',
  styleUrl: './pay-rate-types.component.css'
})
export class PayRateTypesComponent implements OnInit {

  @Input() rateId: number | undefined; 
  @Output() selectionChange = new EventEmitter<MatSelectChange>(); // Event for selection changes

  rateTypes$ : Observable<RateTypeModel[]> | undefined = undefined;
  
  onSelectionChange(event: MatSelectChange): void {
    this.selectionChange.emit(event.value);
  }

  constructor(private readonly ratetypeservice: RateTypeService)
  {
    
  }

  ngOnInit(): void {
    
    this.rateTypes$ = this.ratetypeservice.initializeLookupData();
   
  }

  compare(object1: any, object2: any) {
    return object1 && object2 && object1.toString() == object2.toString()
  }

}
