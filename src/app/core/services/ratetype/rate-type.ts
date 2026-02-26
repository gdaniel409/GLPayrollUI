import { inject, Injectable } from '@angular/core';
import { RateTypeModel } from '../../../models/RateTypeModel';
import { APP_SETTINGS } from '../../../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateTypeService {

  http = inject(HttpClient);
  public appSettings = inject(APP_SETTINGS);
  rateTypes: RateTypeModel[] = [];
  downloaded: boolean = false;
  
  initializeLookupData() : Observable<RateTypeModel[]> {
    
    if(this.downloaded) {
        return of(this.rateTypes);
    }

    const urlAddr : string = this.appSettings.getString("ratetypelist");
      return this.http.get<RateTypeModel[]>(urlAddr).pipe(
        tap(data => {
          this.rateTypes = data;
          this.downloaded = true;
        })
      );
  
  }

  public getList(): Observable<RateTypeModel[]>{
    
    if (this.downloaded) {
      return of(this.rateTypes);
    }
    else {
       throw new Error("Rate types not yet downloaded");
    }
  }

  getRateType(rateTypeId: number): RateTypeModel {

    if (this.downloaded) {
      const found = this.rateTypes.find(rt => rt.id === rateTypeId);
      if (found) {
        return found;
      }
      throw new Error(`Rate type not found: ${rateTypeId}`);
    }
    throw new Error("Rate types not yet downloaded"); 
  }

}
