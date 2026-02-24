import { IID } from "./IID";

export interface DocumentModel extends IID{

    alias : string;
    url : string;
    employeeID : number;
    dateCreated : Date;
    employeeNumber : string;
    originalFileName : string;
    mimeType : string;

}