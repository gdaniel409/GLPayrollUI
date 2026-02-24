import { Injectable } from '@angular/core';
import { RateTypeModel } from '../../../models/RateTypeModel';


@Injectable({
  providedIn: 'root'
})
export class RateTypeService {

  createRateType(rateTypeId: number): RateTypeModel {

    switch (rateTypeId) {
      case 1:
        return  {id: 1,description: "Hourly"};
      case 2:
        return { id: 2,description: 'Salary' };
      case 3:
        return { id: 3,description: 'Contract' };
      case 4:
        return { id: 4,description: 'Commission' };
      default:
        throw new Error(`Unknown rate type: ${rateTypeId}`);
    } 

  }
  
}
