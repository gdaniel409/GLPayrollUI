import { Component, inject, OnInit, SecurityContext } from '@angular/core';
import { AsyncPipe } from '@angular/common'; 
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DocumentModel } from '../../models/DocumentModel';
import { Observable, of, switchMap } from 'rxjs';
import { MatTable, MatTableModule } from '@angular/material/table';
import { APP_SETTINGS } from '../../app.settings';
import { DocumentsHttpService } from '../../core/services/documents/documents-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-documents-list',
    imports: [
    AsyncPipe,
    RouterLink,
    MatTable,
    MatTableModule,
   
],
  templateUrl: './documents-list.html',
  styleUrl: './documents-list.css'
})
export class DocumentsListComponent implements OnInit{

 fileName: any;
 columnNames = ['alias', 'originalFileName', 'dateCreated', 'edit'];
 appSettings = inject(APP_SETTINGS);

 downloadUrl :string = '';
 
  constructor(private readonly route : ActivatedRoute, 
    private readonly documentService : DocumentsHttpService, 
    private readonly sanitizer: DomSanitizer
  ) {}
  
  employeeId: number | undefined;
  employeeNumber : string | undefined;
  documents$: Observable<DocumentModel[]> | undefined;
   
  ngOnInit(): void {

    this.employeeId = Number(this.route.snapshot.params['id']);
    this.employeeNumber = this.route.snapshot.params['employeeNumber'];
    this.downloadUrl = this.appSettings.getString('downloaddocument');

    this.getDocuments();
        
  }
 

  viewDocumentInNewTab(document: DocumentModel): void {

    const url = this.downloadUrl + "?id=" + document.id + "&inline=true";
     
    this.documentService.getDocument(url).subscribe((blob: Blob) => {
     
      const file = new Blob([blob], { type: document.mimeType });

      // Create a temporary URL for the blob
      const fileURL = URL.createObjectURL(file);
      const sanitizedUrl: string | null = this.sanitizer.sanitize(SecurityContext.URL, fileURL);


      if (sanitizedUrl) {
          const newWindow = window.open(sanitizedUrl, '_blank');

          if (newWindow) {
            console.log('Document opened in a new tab successfully.');
          } else {
            alert('Please allow pop-ups for this website to view the document.');
          }
      }


    });
  }


  
  private getDocuments(){

    this.documents$ = this.route.data.pipe(
      switchMap(data =>
        of(data['documents']

        ))
    );

  }

}
