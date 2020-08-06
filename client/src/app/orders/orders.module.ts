import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders-list/orders.component';
import { MatDialogModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatDialogContent } from '@angular/material';
import { CoreModule } from '../_core/core.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderEditDialogComponent } from './order-edit-dialog/order-edit-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    OrdersRoutingModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    OrdersComponent,
    OrderEditDialogComponent
  ],
  entryComponents: [
    OrderEditDialogComponent
  ]
})
export class OrdersModule { }