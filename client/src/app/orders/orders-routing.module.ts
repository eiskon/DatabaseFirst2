import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders-list/orders.component';
import { OrderEditDialogComponent } from './order-edit-dialog/order-edit-dialog.component';
import { AuthGuard } from '../_guards/auth.guard';
import { OrderListResolver } from '../_resolvers/order-list.resolver';


const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent, resolve: {orders: OrderListResolver}
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
