/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IID } from '../../../models/IID';
import { IHttp } from '../../../models/IHttp';
import { APP_SETTINGS } from '../../../app.settings';


@Injectable(
  {providedIn: 'root'}
)
export abstract class SubsidiaryHttpService<model extends IID> implements IHttp<model>{

  public http = inject(HttpClient);
  public appSettings = inject(APP_SETTINGS);
   
  public list: model[]=[];
  
  public abstract apiString: string;
  abstract downloaded: boolean;
   
  public getList(): Observable<model[]>{

    if (this.downloaded) {
           return of(this.list);
        }
        else {

        const urlAddr : string = this.appSettings.getString(this.apiString + "list");
 
        return this.http.get<model[]>(urlAddr).pipe(
              tap(data => {
    
              this.list = data;
              this.downloaded = true;
             
            }),
            catchError(this.handleError)
          );

        
        }

  }

  getItem(id: number): Observable<model> | undefined{

    if(this.downloaded)
    {
           const foundItem  = this.list.find(item=>item.id === id);
           return of(foundItem!);
    
    }
    else{
      return this.getList().pipe(
            map(data => {
              const foundItem  = data.find(item=>item.id === id);
              return foundItem!;
            }),
            catchError(this.handleError)
      );
    
    }
  }

  addItem(newItem: model): Observable<model> {

    const urlAddr : string = this.appSettings.getString(this.apiString + "additem");
    return this.http.post<model>(urlAddr, newItem).pipe(
          map(data => {
            
            this.list.push(newItem);
            return newItem;
          }),
          catchError(this.handleError)
        );
  }

    updateItem(editItem: model): Observable<model> {
   
    const urlAddr : string = this.appSettings.getString(this.apiString + "updateitem");
    
    let newModel : Observable<model>;
          
    return this.http.post<model>(urlAddr, editItem).pipe(
          map((data)=>{
    
            const ndx = this.list.findIndex(item=>item.id === editItem.id);
            this.list.splice(ndx, 1, editItem);
            return this.list[ndx];
    
          }),
          catchError(this.handleError)
    );
  }
  
  refresh(): Observable<model[]> {

    this.downloaded = false;
    return this.getList().pipe(
      switchMap(data=>of(data))
    );
    
  }

  deleteItem(id : number) :  Observable<model[]>{

    const urlAddr : string = this.appSettings.getString(this.apiString + "delete");
    
    let params = new HttpParams().set('id', id);
 
    return this.http.get<model[]>(urlAddr, {params: params}).pipe(
          map((data)=>{
    
            const ndx = this.list.findIndex(item=>item.id === id);
            this.list.splice(ndx, 1);
            return this.list;
    
          }),
          catchError(this.handleError)

        );

    
  }

  handleError(error: HttpErrorResponse) {
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
