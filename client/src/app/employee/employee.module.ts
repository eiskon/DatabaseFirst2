import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploeesListComponent } from './emploee-list/emploee-list.component';

import { EmployeesRoutingModule } from './employee-routing.module';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { EmployeeListResolver } from '../_resolvers/employee-list.resolver';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { EmployeeEditDialogComponent } from '../employee/employee-edit-dialog/employee-edit-dialog.component'

@NgModule({
  declarations: [
    EmploeesListComponent,
    EmployeeEditDialogComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatCardModule,
    LayoutModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    EmployeeEditDialogComponent
  ],
  providers: [
    EmployeeListResolver
  ]
})
export class EmployeesModule { }
