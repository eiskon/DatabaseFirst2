import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders-list/orders.component';
import { MatDialogModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, 
  MatSelectModule, MatInputModule, MatButtonModule, MatSortModule, MatCardModule } from '@angular/material';
import { CoreModule } from '../_core/core.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderEditDialogComponent } from './order-edit-dialog/order-edit-dialog.component';
import { EmployeeDetailsDialogComponent } from '../employee/employee-details-dialog/employee-details-dialog.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeDetailResolver } from '../_resolvers/employee-detail.resolver';
import { OrderDetailsComponent } from './orders-list/order-details/order-details.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    OrdersRoutingModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSortModule
  ],
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    OrderEditDialogComponent,
    EmployeeDetailsDialogComponent
  ],
  entryComponents: [
    OrderEditDialogComponent,
    EmployeeDetailsDialogComponent
  ],
  providers: [
     EmployeeDetailResolver
  ]
})
export class OrdersModule { }