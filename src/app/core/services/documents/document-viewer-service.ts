import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentViewerService {

  constructor(private readonly http: HttpClient) { }

  // Method to fetch the PDF from the API as a Blob
  getDocument(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob' // This is crucial for handling binary data
    });
  }
  
}
