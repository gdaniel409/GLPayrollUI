import { Injectable } from '@angular/core';
import { DocumentModel } from '../../../models/DocumentModel';
import { AncillaryHttpService } from '../ancilloryservice/ancilliray.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentsHttpService extends AncillaryHttpService<DocumentModel>{
  override apiString: string;
  //override downloaded: boolean = false;

  constructor() {

    super();

    this.apiString = "documentsforemployee";

  }

  getDocument(url : string): Observable<Blob> {
    return this.getHttp().get(url, {
      responseType: 'blob' // This is crucial for handling binary data
    });

  }
  
}
