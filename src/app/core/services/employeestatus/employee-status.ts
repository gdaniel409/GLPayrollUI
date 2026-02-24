import { Injectable } from '@angular/core';
import { EmployeeStatusModel } from '../../../models/EmployeeStatusModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatusService {

  createEmployeeStatus(employeeStatusId: number): EmployeeStatusModel {
    switch (employeeStatusId) {
      case 1:
        return { id: 1, status: 'Active' };
      case 2:
        return { id: 2, status: 'Inactive' };
      case 3:
        return { id: 3, status: 'Pending' };
      case 4:
        return { id: 4, status: 'Suspended' };
      case 5:
        return { id: 5, status: 'Terminated' };
      case 6:
        return { id: 6, status: 'On Leave' };
      default:
        throw new Error(`Unknown employee status: ${employeeStatusId}`);
    }

  }
  
}
