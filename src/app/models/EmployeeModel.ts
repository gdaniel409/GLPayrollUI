
import { RateTypeModel } from "./RateTypeModel";
import { EmployeeStatusModel} from "./EmployeeStatusModel";
import { IID } from "./IID";


export interface EmployeeModel extends IID{

    companyID : number;
   
    employeeNumber : string;
    title : string;
    firstName : string;
    lastName : string;
    middleName : string;
    rate: number;
    dateHired: Date;
    dateTerminated : Date | undefined;
    ssn : string;
  
    telephoneLandline : string;
    telephoneCell : string;
    email : string | undefined;
    employeeStatus : EmployeeStatusModel;
    rateType : RateTypeModel;
    documentCount: number;

  
}



