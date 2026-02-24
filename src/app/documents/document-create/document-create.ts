import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NameFileComponent } from "../../core/controls/FileUpload/name-file-component/name-file-component";
import { APP_SETTINGS } from '../../app.settings';
import { finalize, Subscription } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DragAndDrop } from '../../core/customDirectives/DragAndDropDirective/drag-and-drop';
import { EmployeePayrollHttpService } from '../../core/services/employeepayroll/employee-payroll.service';


@Component({
  selector: 'app-document-create',
  standalone: true,
  imports: [
    NameFileComponent,
    DragAndDrop,
  //  MatProgressBar
  ],
  templateUrl: './document-create.html',
  styleUrls: ['./document-create.css']
})
export class DocumentCreateComponent implements OnInit{

  filesArray: any;
  uploadProgress:number | undefined | null;
  uploadSub: Subscription | null | undefined;

  employeeId : number | undefined;
  employeeNumber: string | undefined;

  @ViewChild('fileUpload') fileUploadElement!: ElementRef<HTMLInputElement>;

  public appSettings = inject(APP_SETTINGS);
  requiredFileType: any;
  showNameHidden: boolean = true;
  hideNames : boolean = true;
  message: string = "";

  constructor(private readonly http: HttpClient, private readonly httpEmp:  EmployeePayrollHttpService ,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

      this.employeeId = Number(this.route.snapshot.params['employeeId']);
      this.employeeNumber = this.route.snapshot.params['employeeNumber'];

  }

  onFileSelected(event: Event) {

        
        if (this.fileUploadElement.nativeElement.files && this.fileUploadElement.nativeElement.files.length > 0) {
   
          this.filesArray = Array.from(this.fileUploadElement.nativeElement.files);
          
          if(this.filesArray.length > 5)
          {
            this.filesArray = this.filesArray.slice(0,5);
          }

          this.showNameHidden = false;
          this.hideNames = false;
          this.message= "";

          // Process the selected file

        }
      }
    
  processFiles(docs : string[]){

    if(docs.length > 5){
        this.message= "Only 5 files can be uploaded at a time."
        return;
      }

    if(docs.includes("")){

      this.message = "Alias name cannot be empty. Be sure all fields for alias name has an entry.";
      return; 

    }

    if (this.filesArray) {  

      const formData = new FormData();

      formData.append('employeeId', this.employeeId!.toString());

      for(const doc of docs){
        formData.append('aliases', doc);
      }

      for (const file of this.filesArray) {

        formData.append('files', file); // 'files' is the field name your server expects

        let mimeType : string = this.getMimeType(file.name);

        if(mimeType === 'unknown'){
          this.message = 'Unknown mime-type encountered.  Check the list of file types which can be accepted.';
          return;
        }
        formData.append('mimeTypes', mimeType)

      }

      const apiString : string = this.appSettings.getString("uploadfile");

      const upload$ = this.http.post(apiString, formData, {
              //      reportProgress: true,
                    observe: 'events' 
          }).pipe( 
                    finalize(() => this.reset())
        );

        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
            }
          })
 
    }
}

  reset(){
    
    try{
      this.httpEmp.getItem(this.employeeId!)!.subscribe({
        next: (data)=>{
          data.documentCount += this.filesArray.length;
        }
      });
    }
    catch(e){}

    this.router.navigate(['documents/', this.employeeId, this.employeeNumber]);

  }

  handleFiles(files: any) {

    this.message= "";
    this.filesArray = Array.from(files);  
    this.showNameHidden = false;
    this.hideNames = false;

  }

  getMimeType(fileName: string) : string{

      const ext = this.getFileExtension(fileName)?.toLowerCase();

      if(ext === 'unknown')
      {
        return ext;
      }

      switch(ext){

        case 'pdf':
          return 'application/pdf';
        case 'txt':
          return 'text/plain';
        case 'png':
          return 'image/png';
        case 'jpeg':
          return 'image/jpeg';
        case 'jpg':
          return 'image/jpeg';
        case 'xps':
          return 'application/vnd.ms-xpsdocument';
        case 'oxps':
          return 'application/vnd.ms-xpsdocument';
        case 'odt':
          return 'application/vnd.oasis.opendocument.text';
        case 'tiff':
          return 'image/tiff';
        case 'rtf':
          return 'application/rtf';
        case 'epub':
          return 'application/epub+zip';
        case 'md' :
          return 'text/markdown';

        case "docx":
          return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case "doc" :
          return "application/msword";

        default:
          return 'unknown';
      }

    
  }

  getFileExtension(filename: string): string{

    const parts = filename.split('.');

    if (parts.length > 1) {
      const ext = parts.pop(); // Returns the last element (the extension)

      if(ext == undefined){

        return 'unknown';

      }
      else{
        return ext;
      }
    }

    return 'unknown'; // No extension found
  }

}
