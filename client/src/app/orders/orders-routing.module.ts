import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders-list/orders.component';
import { OrderEditDialogComponent } from './order-edit-dialog/order-edit-dialog.component';
import { AuthGuard } from '../_guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
},
{
    path: 'orders/:orderId',
    component: OrderEditDialogComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
