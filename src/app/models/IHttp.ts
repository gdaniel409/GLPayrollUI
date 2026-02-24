/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Observable } from "rxjs";
import { IID as IID } from "./IID";

export interface IHttp<model extends IID>{

    downloaded : boolean;
    list : model[];
    getList() : Observable<model[]>;
    getItem(id : number) : Observable<model> | undefined;
    addItem(newItem :model) : Observable<model>;
    updateItem(editItem : model) : Observable<model>;
    deleteItem(id : number) : Observable<model[]>;
    refresh() : Observable<model[]>;
  
}