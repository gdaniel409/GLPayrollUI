
import { ResolveFn } from '@angular/router';
import { EmployeeModel } from '../../models/EmployeeModel';
import { inject } from '@angular/core';
import { EmployeePayrollHttpService } from '../../core/services/employeepayroll/employee-payroll.service';

export const employeeResolver: ResolveFn<EmployeeModel[]> = (route, state) => {

  try
  {
  const http = inject(EmployeePayrollHttpService)
  return http.getList();
  }
catch (error)
{
  console.error('Error fetching employee data:', error);
  return [];
}

 };

