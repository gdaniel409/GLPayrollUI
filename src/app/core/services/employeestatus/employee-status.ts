import { inject, Injectable } from '@angular/core';
import { EmployeeStatusModel } from '../../../models/EmployeeStatusModel';
import { HttpClient} from '@angular/common/http';
import { Observable, of, tap} from 'rxjs';
import { APP_SETTINGS } from '../../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatusService{

  http = inject(HttpClient);
  public appSettings = inject(APP_SETTINGS);

  employeeStatuses: EmployeeStatusModel[] = [];
  downloaded: boolean = false;

  public initializeLookupData(): Observable<EmployeeStatusModel[]> {

    if(this.downloaded) {
      return of(this.employeeStatuses);
    }

    const urlAddr : string = this.appSettings.getString("employeestatustypeslist");
    return this.http.get<EmployeeStatusModel[]>(urlAddr).pipe(
      tap(data => {
        this.employeeStatuses = data;
        this.downloaded = true;
      })
    );
  }

  public getList(): EmployeeStatusModel[]{
  
      if (this.downloaded) {
        return this.employeeStatuses;
      }
      else {
  
        throw new Error("Employee statuses not yet downloaded");
 
      }
    }
    
    getEmployeeStatus(id: number): EmployeeStatusModel {
      if (this.downloaded) {
        const found = this.employeeStatuses.find(es => es.id === id);   
        
        if(found === undefined) {
          throw new Error(`Employee status with id ${id} not found`);
        }
        return found;
        } else {
          throw new Error('Employee statuses not loaded yet');
      } 
    }

}
