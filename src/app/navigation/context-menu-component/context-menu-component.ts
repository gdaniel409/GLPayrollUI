import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { RouterLink } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContextMenuService } from '../../core/services/contextmenuservice/ContextMenuService';


@Component({
  selector: 'app-context-menu-component',
  imports: [MatDialogModule, RouterLink, DragDropModule],
  templateUrl: './context-menu-component.html',
  styleUrl: './context-menu-component.css',
 
})
export class ContextMenuComponent{

  
  employeeID: number | undefined; 
  employeeNumber: string | undefined; 
  documentCount: number | undefined;
   
  absoluteX : number = 0;
  absoluteY : number = 0;
  minIcon : string = '-';
  hideContext : boolean = false;
  contextServiceMenu = inject(ContextMenuService);

  @Output() menuClose = new EventEmitter<any>(); // Event for selection changes
  
  //private contextMenu: ContextMenuService,
  onCloseMenu(event : any){

    this.menuClose.emit(event);

     if(event !== undefined)
     {
       event.preventDefault();
     }
    
  }

  onMinMenu(event : any):boolean{

    this.hideContext = !this.hideContext;

    if(this.hideContext){
      this.minIcon = '+';
    }
    else{
      this.minIcon = '-';
    }
   
    return false;

  }


}
