import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploeesListComponent } from './emploee-list/emploee-list.component';

import { EmployeesRoutingModule } from './employee-routing.module';
import { MatCardModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { EmployeeDetailResolver } from '../_resolvers/employee-detail.resolver';
import { EmployeeListResolver } from '../_resolvers/employee-list.resolver';

@NgModule({
  declarations: [
    EmploeesListComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatCardModule,
    LayoutModule,
    MatFormFieldModule
  ],
  providers: [
    EmployeeListResolver
  ]
})
export class EmployeesModule { }
