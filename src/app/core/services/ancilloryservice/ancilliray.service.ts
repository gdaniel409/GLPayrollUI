/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_SETTINGS } from '../../../app.settings';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AncillaryHttpService<model> {

  private readonly http = inject(HttpClient);
  private readonly appSettings = inject(APP_SETTINGS);
  public abstract apiString: string;
 

  list: model[]=[];

  constructor() { }

  getHttp(): HttpClient {
    return this.http;
  } 

  refresh(employeeID : number) : Observable<model[]>{
 
    return this.getAncillary(employeeID);
  }

  getAncillary(employeeID : number) : Observable<model[]>{
                                                                        
    const urlAddr : string = this.appSettings.getString(this.apiString + "getancillary");

    let params = new HttpParams().set('employeeId', employeeID);
    return this.http.get<model[]>(urlAddr, {params}).pipe(
                    map((data) => {
          
                       
                    this.list = data;               
                    return data;
          
                  }),
                  catchError(this.handleError)
                );
 
  }
  
  postAncillary(data : model[], employeeID : number) : Observable<model[]>{

    if(data.length > 0){
      
      const urlAddr : string = this.appSettings.getString(this.apiString + "createancillary");
      let params = new HttpParams().set('employeeID', employeeID);
      return this.http.post<model[]>(urlAddr, data, {params}).pipe(
        map(data=>{

          this.list = data;
          return data;
        })
      );

    }else{
      return of(data);
    }
    

  }

   private handleError(error: HttpErrorResponse) {
    let message = '';

    switch (error.status) {
      case 0:
        message = 'Client error';
        break;
      case HttpStatusCode.InternalServerError:
        message = 'Server error';
        break;
      case HttpStatusCode.BadRequest:
        message = 'Request error';
        break;
      default:
        message = 'Unknown error';
    }

    console.error(message, error.error);

    return throwError(() => error);
  }

}
