import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders-list/orders.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    // canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then((x) => x.OrdersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
