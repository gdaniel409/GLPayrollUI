
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { EmployeeStatusService } from '../../../services/employeestatus/employee-status';
import { EmployeeStatusModel } from '../../../../models/EmployeeStatusModel';
import { Observable} from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-statuses',
  imports: [
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    MatError,
    AsyncPipe,
    CommonModule
    
  ],
  templateUrl: './employee-statuses.component.html',
  styleUrl: './employee-statuses.component.css'
})
export class EmployeeStatusesComponent implements OnInit {

  @Input() statusId: number | undefined; 
  @Output() selectionChange = new EventEmitter<any>(); // Event for selection changes

  employeeStatuses$: Observable<EmployeeStatusModel[]> | undefined = undefined;

  onSelectionChange(event: MatSelectChange): void {
    this.selectionChange.emit(event.value);
    
  }

  constructor(private readonly employeeStatusService: EmployeeStatusService)
  {}    
  
  ngOnInit(): void {

    this.employeeStatuses$ = this.employeeStatusService.initializeLookupData();

  }
 
  compare(object1: any, object2: any) {
    return object1 && object2 && object1.toString() == object2.toString()
  }
  

}
