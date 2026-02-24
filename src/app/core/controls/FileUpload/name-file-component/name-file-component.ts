import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-name-file-component',
  imports: [MatInputModule],
  templateUrl: './name-file-component.html',
  styleUrl: './name-file-component.css'
})
  export class NameFileComponent {

  message: string = "";
    
  processFileNames() {

    if(this.filesArray.length === 0){
      this.message="There must be at least one file selected.";
    }
    let arraySize: number = Math.min(this.filesArray.length, 5);

    const fileNames = new Array(arraySize);

    let index: number = 0;

    for(const file of this.filesArray)
    {

      const inputElement = document.getElementById(file.name) as HTMLInputElement;
      fileNames[index] = inputElement.value;

      if(++index == 5){
        break;
      }

    }
  
    this.fileNamesChanges.emit(fileNames);
  }

  @Input() filesArray: File[] = [];
  @Output() fileNamesChanges = new EventEmitter<any>(); 

}
