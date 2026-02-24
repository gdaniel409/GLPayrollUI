import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDrop {


  constructor() { 
   
  }

  @Output() filesDropped = new EventEmitter<FileList>();

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

        // Add visual feedback for dragover
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
        // Remove visual feedback

   
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.filesDropped.emit(event.dataTransfer?.files || undefined);
        // Remove visual feedback

  }


}
