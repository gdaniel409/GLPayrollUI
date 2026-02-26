/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/


import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeModel} from '../../models/EmployeeModel';

import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe , CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule , MatRow } from '@angular/material/table';
import { EmployeePayrollHttpService } from '../../core/services/employeepayroll/employee-payroll.service';
import { RowSelectorService } from '../../core/services/rowselector/row-selector.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { ContextMenuModel } from '../../models/ContextMenuModel';
import { ContextMenuService } from '../../core/services/contextmenuservice/ContextMenuService';


@Component({
  selector: 'app-employee-list',
  imports: [
    AsyncPipe, RouterModule,
    RouterLink,
    MatTableModule,
    MatRow,
    CommonModule,
    MatPaginator,
    MatSortModule,
     
],
  
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  dataSource : any;
  totalItems : number = 0;
  pageSize : number = 5;
  list: EmployeeModel[]=[];

  constructor(private readonly route: ActivatedRoute, 
    private readonly http : EmployeePayrollHttpService,
    public readonly rowIndex: RowSelectorService, 
    private readonly contextMenuService : ContextMenuService,
    
    
  )
  {
  
  }
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  ngAfterViewInit() {
    
    this.paginator.pageIndex = this.rowIndex.pageIndex;
    this.paginator.pageSize = this.rowIndex.pageSize;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

      
  }

          // If you need custom handling for page changes
  onPageChange(event: PageEvent) {
        // Implement custom logic based on event.pageIndex and event.pageSize
        this.rowIndex.pageIndex = event.pageIndex;
        this.rowIndex.pageSize = event.pageSize;
  }

  sortData(sortState: Sort) {

   switch(sortState.active){

    case "firstname" :
      this.sortFirstName(sortState.direction);
      break;

    case "lastname":
      this.sortLastName(sortState.direction);
      break;

    case "employeenumber":
      this.sortEmployeeNumber(sortState.direction);
      break;

    case "status":
      this.sortStatus(sortState.direction);
      break;

   }
        
  }

  sortEmployeeNumber(dir : string){

    if(dir==="asc"){

      this.list.sort((a, b)=>a.employeeNumber.localeCompare(b.employeeNumber));
  
    }
    else if(dir==="desc"){

      this.list.sort((a, b)=>b.employeeNumber.localeCompare(a.employeeNumber));

    }
  }

  sortStatus(dir : string){

    if(dir==="asc"){

      this.list.sort((a, b)=>a.employeeStatus.status!.localeCompare(b.employeeStatus.status!));
  
    }
    else if(dir==="desc"){

      this.list.sort((a, b)=>b.employeeStatus.status!.localeCompare(a.employeeStatus.status!));

    }
  }

  sortLastName(dir : string){

    if(dir==="asc"){

      this.list.sort((a, b)=>a.lastName.localeCompare(b.lastName));
  
    }
    else if(dir==="desc"){

      this.list.sort((a, b)=>b.lastName.localeCompare(a.lastName));

    }
  }

  sortFirstName(dir : string){

    if(dir==="asc"){

      this.list.sort((a, b)=>a.firstName.localeCompare(b.firstName));
  
    }
    else if(dir==="desc"){

      this.list.sort((a, b)=>b.firstName.localeCompare(a.firstName));

    }
  }

  
  highlight(row: any) {
   
    this.rowIndex.rowIndex = row.id;
  }

  employeeSelected(employeeID : number, employeeNumber: string, documentCount : number):any{

    this.rowIndex.rowIndex = employeeID;

    let model: ContextMenuModel = {
       employeeID: employeeID,
       employeeNumber: employeeNumber,
       documentCount: documentCount
    }

    this.contextMenuService.triggerAppEmployeeSelected(model);
    return false;
 
  }

  highlightEmployeeID(employeeID : number){
    this.rowIndex.rowIndex = employeeID;
  }

   employees$ : Observable<EmployeeModel[]> | undefined;
 
  ngOnInit(): void {

    this.getEmployees();
   
      
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.list = this.http.filterEmployeeList(filterValue);
    this.resetList();
  }

 
  //selectedEmployee: EmployeeModel | undefined;
  columnNames = ['employeenumber', 'title', 'firstname', 'lastname', 'status', 'edit' ];
 
  private getEmployees() {

     this.employees$  = this.route.data.pipe(
            switchMap(data =>{

              this.list = data['employees'];
              this.totalItems = this.list.length;
              this.dataSource = new MatTableDataSource<any>(this.list);
              return of(this.list)

              }
    
            ) 
          );
   
  }

  refreshEmployees($event?: Event){

    if($event !== undefined)
    {
      $event.preventDefault();
    }
   
    this.http.refresh().subscribe(
      {
        next: (data)=>{

        this.employees$ = of(data);
        this.list = data;
        this.resetList();
 
      }} 
    );

  }

  resetList(){

    this.totalItems = this.list.length;
    this.dataSource = new MatTableDataSource<any>(this.list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.rowIndex.rowIndex = -1;
    this.rowIndex.pageIndex = 0;
    this.paginator.pageSize = this.rowIndex.pageSize;
    this.paginator.firstPage();

  }

}


