import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmploeesListComponent } from './emploee-list/emploee-list.component';
import { EmployeeDetailsDialogComponent } from './employee-details-dialog/employee-details-dialog.component';
import { EmployeeDetailResolver } from '../_resolvers/employee-detail.resolver';
import { EmployeeListResolver } from '../_resolvers/employee-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmploeesListComponent, resolve: {employees: EmployeeListResolver}
  },
  {
    path: 'employees/:employeeId',
    component: EmployeeDetailsDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
