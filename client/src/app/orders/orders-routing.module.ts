import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders-list/orders.component';
import { OrderEditDialogComponent } from './order-edit-dialog/order-edit-dialog.component';
import { AuthGuard } from '../_guards/auth.guard';
import { EmployeeDetailResolver } from '../_resolvers/employee-detail.resolver';


const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'orders/:orderId',
    component: OrderEditDialogComponent
  },
  {
    path: 'orders/:employeeId',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
