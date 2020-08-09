import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders-list/orders.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    // canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then((x) => x.OrdersModule)
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
