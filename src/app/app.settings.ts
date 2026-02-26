
/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { InjectionToken } from '@angular/core';

export interface IAppSettings {
  title: string;
  applicationName: string;
  version: string;
  hostGLApi: string;
  hostSubApi: string;
 
  //GL Control Accounts
  trxnEndPoint: string;
  trxnBatchEndPoint: string;
  postEndPoint: string;
  getLockCountEndPoint: string;
 
  //subsidiary GL 

  listemployees : string ;
  createemployee : string ;
  updateemployee : string ;
  employeestatuslist: string;
  payRateTypes : string;
  employeeStatuses : string;
  authenticate: string;

  documentUpload: string;
  documentList: string;
  documentDownload: string;

  getString(value : string) : string;
}

export const appSettings : IAppSettings={
  title: 'GL Payroll',
  applicationName: 'GL-Payroll',
  version: '1.0',
  hostGLApi: 'https://localhost:7277/',

  authenticate: 'api/auth/authenticate',
  //hostSubApi: 'https://www.audiosl.com/GLSubsidiaryAPI/',
  //hostSubApi: "https://localhost:7283/",
  hostSubApi: "http://localhost:8080/",
  //hostSubApi: 'http://gl-sso/PayrollAPI/',
  trxnEndPoint: 'api/GLLedger/trxn',
  trxnBatchEndPoint: 'api/GLLedger/trxns',
  postEndPoint: 'GLLedger/post',
  getLockCountEndPoint: 'api/GLLedger/count',
  
  ///////////////////////////////////////
  listemployees: 'api/employees/list',
  createemployee: 'api/employees/create',
  updateemployee: 'api/employees/edit',
  employeeStatuses: 'api/employees/employeestatus',
  employeestatuslist: 'api/admin/employeestatus/list',
  documentUpload: 'api/documents/postdocument',
  documentList: 'api/documents/list',
  documentDownload: 'api/documents/downloaddocument',
  payRateTypes: 'api/payment/payratetypes',

  getString: function (value: string): string {

    switch (value.toLowerCase()) {


     
      case 'uploadfile':
        return this.hostSubApi + this.documentUpload;

      case 'downloaddocument':
        return this.hostSubApi + this.documentDownload;

      case "authenticate":
        return this.hostSubApi + this.authenticate;

      case "employeemodellist":
        return this.hostSubApi + this.listemployees;

      case "employeemodeladditem":
        return this.hostSubApi + this.createemployee;

      //update item//////////////////////////////////
      case "employeemodelupdateitem":
        return this.hostSubApi + this.updateemployee;

      case "employeestatuslist":
        return this.hostSubApi + this.employeestatuslist;

      case "payratetypeslist":
        return this.hostSubApi + this.payRateTypes;

      case "employeestatuseslist":
        return this.hostSubApi + this.employeeStatuses;

      //ancillary services
      case "getdepartmentsforemployeegetancillary":
        return this.hostSubApi + "api/departments/getdepartmentsforemployee";

      case "documentsforemployeecreateancillary":
        return this.hostSubApi + this.documentUpload;

      case "documentsforemployeegetancillary":

        return this.hostSubApi + this.documentList;

      case "ratetypelist":
        return this.hostSubApi + "api/admin/ratetype/list";

      case "employeestatustypeslist":
        return this.hostSubApi + "api/admin/employeestatus/list";

      default:
        return "";


    }
  },
 
}


export const APP_SETTINGS = new InjectionToken<IAppSettings>('app.settings');