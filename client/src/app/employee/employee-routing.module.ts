import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmploeesListComponent } from './emploee-list/emploee-list.component';
import { EmployeeListResolver } from '../_resolvers/employee-list.resolver';
import { EmployeeDetailsDialogComponent } from './employee-details-dialog/employee-details-dialog.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmploeesListComponent, resolve: {employees: EmployeeListResolver}
  },
  {
    path: 'employee/:employeeId',
    component: EmployeeDetailsDialogComponent
  }
  // {
  //   path: 'employee/edit/:employeeId',
  //   component: EmployeeEditComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
