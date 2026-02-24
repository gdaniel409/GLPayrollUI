/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from "./navigation/context-menu-component/context-menu-component";
import { ContextMenuService } from './core/services/contextmenuservice/ContextMenuService';
import { NavBarComponent } from './navigation/navbar/nav-bar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, ContextMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit {
  
  title = 'GLPayroll';

  hideMenu : boolean = true;
  contextMenu = inject(ContextMenuService);
 
  @ViewChild('contextMenu') contextMenuRef!: ContextMenuComponent;
 
event: any;

  constructor() {}

  ngOnInit(): void {

    this.contextMenu.callAppEmployeeSelectedMethod$.subscribe(data=>{

      this.employeeSelected(data.employeeID, data.employeeNumber, data.documentCount);

    });

 
    
  }

  employeeSelected(employeeID : number, employeeNumber: string, documentCount : number):any{

  
      if(this.hideMenu)
      {
        this.hideMenu = false;
      }
      
      this.contextMenuRef.employeeID = employeeID;
      this.contextMenuRef.employeeNumber = employeeNumber;
      this.contextMenuRef.documentCount = documentCount;
       
      return false;
 
  }

  handleMenuClose(event : any){
  
    this.menuClose(true);
 
  }

  menuClose(show : boolean){
    this.hideMenu = show;
  }


}
