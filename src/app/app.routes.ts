/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './employees/employee-add-edit/employee-add-edit.component';

import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { EmployeeDetailComponent } from './employees/eployee-detail/employee-detail.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list';
import { documentlistResolver } from './navigation/resolvers/documentlist-resolver';
import { DocumentCreateComponent } from './documents/document-create/document-create';
import { documentGuard } from './core/guards/document-guard';
import { employeeGuard } from './core/guards/employee-guard';
import { ForbiddenComponent } from './forbidden/forbidden/forbiddencomponent';
import { employeeResolver } from './navigation/resolvers/employee-resolver';

export const routes: Routes = [
    
    {
      path: 'home',
      title: 'Home',
      component: HomeComponent
    },
    {
      path: 'notimplemented',
      title: 'Not Implemented',
      component: NotImplementedComponent
    },
    {
      path: 'forbidden',
      title: 'Forbidden',
      component: ForbiddenComponent
    },
    {
      path: 'documents/:id/:employeeNumber',
      title: 'Documents',
      component:DocumentsListComponent,
      canActivate: [documentGuard],
      resolve: {
        documents: documentlistResolver
      }
    },
    {
      path: 'documentsadd/:employeeId/:employeeNumber',
      title: 'Documents',
      component:DocumentCreateComponent,
      canActivate: [documentGuard],
      
    },
    // {
    //   path: 'viewdocument/:documentId/:inline/:contentType/:employeeId/:employeeNumber',
    //   title: 'View Documents',
    //   component:DocumentViewComponent,
    //   canActivate: [documentGuard],
      
    // },
    {
      path: 'listemployees',
      title: 'Employees List',
      component: EmployeeListComponent,
      canActivate: [employeeGuard],
      
      resolve: {
        employees: employeeResolver
      }

    },
    {
      path: 'employee-add-edit',
      title: 'Employee Add/Edit',
      component: EmployeeAddEditComponent,
      canActivate: [employeeGuard],
 
    },
    {
      path: 'employee-add-edit/:id',
      title: 'Employee Add/Edit',
      component: EmployeeAddEditComponent,
      canActivate: [employeeGuard],

    },
    {
      path: 'employeedetail/:id',
      title: 'Employee Detail',
      component: EmployeeDetailComponent,
      canActivate: [employeeGuard],

    },
    
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home' }

  ];