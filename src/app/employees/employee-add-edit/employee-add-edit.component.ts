/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,  ReactiveFormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { EmployeePayrollHttpService } from '../../core/services/employeepayroll/employee-payroll.service';
import { EmployeeModel } from '../../models/EmployeeModel';
import { Location } from '@angular/common';
import { EmployeeStatusesComponent } from "../../core/controls/DropdownControls/employee-statuses/employee-statuses.component";
import { PayRateTypesComponent } from "../../core/controls/DropdownControls/pay-rate-types/pay-rate-types.component";
import { EmployeeStatusService } from '../../core/services/employeestatus/employee-status';
import { RateTypeService } from '../../core/services/ratetype/rate-type';


@Component({
  selector: 'app-employee-add-edit',
  imports: [
   // RouterTestingModule,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatFormField,
    MatError,
    MatLabel,
    MatOption,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelect,
    EmployeeStatusesComponent,
    PayRateTypesComponent,
  
],
 
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.css'
})
export class EmployeeAddEditComponent implements OnInit {

  employeeFormGroup!: FormGroup;
  employeeID: number | undefined;
  statusID : number | undefined;
  rateTypeID : number | undefined;
  isAddMode: boolean = false;
  loading = false;
  submitted = false;
  documentCount : number = 0;
  message : string = "";
 
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly httpEmployeeService : EmployeePayrollHttpService,
    public location: Location,
    private readonly router: Router,
    private readonly employeeStatus : EmployeeStatusService,
    private readonly rateType : RateTypeService,
 
  ) 
  {}
  
  ngOnInit() {
    
  this.employeeID = Number(this.route.snapshot.params['id']);
   
  this.isAddMode = !this.employeeID;
    
    this.employeeFormGroup = this.formBuilder.group({
      
        title: ['', Validators.required],
        employeeNumber: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        email: ['', [Validators.required, Validators.email]],
        dateHired: ['', Validators.required],
        dateTerminated: [''],
        ssn: ['', Validators.required],
        telephoneLandline: [''],
        telephoneCell: [''],
        employeeID: [-1], 
        rate : ['', Validators.required],
    
   
    
    });

    this.employeeFormGroup.reset();

    if (this.isAddMode) {
      this.statusID = 1;
    }
    else{
     this.httpEmployeeService.getItem(this.employeeID)!.subscribe({
        next: (value)=>{

          this.employeeFormGroup.patchValue(value);
          this.statusID = value.employeeStatus.id;
          this.rateTypeID = value.rateType.id;
          this.documentCount = value.documentCount;
        
        }
      })
       
    }
  }

  onSubmit() {
 
    //stop here if form is invalid
    if (this.employeeFormGroup === undefined || this.employeeFormGroup.invalid) {
       this.message="There was a problem with the form.";
        return;
    }

    if(!this.employeeFormGroup.dirty)
    {
      this.message="No changes were detected.";
      return;
    }

    this.message = "";

    this.submitted = true;
    this.loading = true;
    
    if (this.isAddMode) {
        this.createEmployee();
    } else {
        this.updateEmployee();
    }
  }

  private createEmployee() {

   
    const employeeModel : EmployeeModel ={
      companyID : 1,
      title: this.employeeFormGroup.value.title,
      employeeNumber: this.employeeFormGroup.value.employeeNumber,
      firstName: this.employeeFormGroup.value.firstName,
      lastName: this.employeeFormGroup.value.lastName,
      middleName: this.employeeFormGroup.value.middleName,

      dateHired: this.employeeFormGroup.value.dateHired,
      dateTerminated: this.employeeFormGroup.value.dateTerminated,
      ssn: this.employeeFormGroup.value.ssn,
      telephoneLandline: this.employeeFormGroup.value.telephoneLandline,
      telephoneCell: this.employeeFormGroup.value.telephoneCell,
      email: this.employeeFormGroup.value.email,
      rate: this.employeeFormGroup.value.rate,
      employeeStatus: this.employeeStatus.createEmployeeStatus(Number(this.statusID!)),
      rateType: this.rateType.createRateType(Number(this.rateTypeID!)),
      id: -1,
      documentCount: 0,
    }

    this.httpEmployeeService.addItem(employeeModel).subscribe({
      next: ()=>{
      
        this.employeeFormGroup.reset();
        this.loading = false;
        this.submitted = false;

         this.router.navigate(['/listemployees']);
       
      } 
    });

  }

  private updateEmployee() {

    
    const employeeModel : EmployeeModel ={

      companyID : 1,
      title: this.employeeFormGroup.value.title,
      employeeNumber: this.employeeFormGroup.value.employeeNumber,
      firstName: this.employeeFormGroup.value.firstName,
      lastName: this.employeeFormGroup.value.lastName,
      middleName: this.employeeFormGroup.value.middleName,
      
      dateHired: this.employeeFormGroup.value.dateHired,
      dateTerminated: this.employeeFormGroup.value.dateTerminated,
      ssn: this.employeeFormGroup.value.ssn,
      telephoneLandline: this.employeeFormGroup.value.telephoneLandline,
      telephoneCell: this.employeeFormGroup.value.telephoneCell,
      email: this.employeeFormGroup.value.email,
      id: this.employeeID ?? -1,
      
      rate : this.employeeFormGroup.value.rate,
      employeeStatus: this.employeeStatus.createEmployeeStatus(Number(this.statusID!)),
      rateType: this.rateType.createRateType(Number(this.rateTypeID!)),
      documentCount: 0,
     
    }

    this.httpEmployeeService.updateItem(employeeModel).subscribe({
      next: (value)=>{
      
        this.employeeFormGroup.reset();
        this.loading = false;
        this.submitted = false;

        this.router.navigate(['/listemployees']);
    
       
      } 
    });
 
  }

  handleStatusChangeSelection($event: any) {
    this.statusID = $event;
  }

  handleRateChangeSelection($event: MatSelectChange) {
    this.rateTypeID = Number($event);
  }


}
