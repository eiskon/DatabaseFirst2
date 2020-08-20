import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginDialogComponent } from './login/components/login-dialog/login-dialog.component';
import { EmployeeDetailResolver } from './_resolvers/employee-detail.resolver';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then((x) => x.OrdersModule)
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () => import('./employee/employee.module').then((x) => x.EmployeesModule)
  },
  // {
  //   path: '',
  //   runGuardsAndResolvers: 'always',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./orders/orders.module').then((x) => x.OrdersModule)
  // },
  {
    path: 'login',
    component: LoginDialogComponent,
    loadChildren: () => import('./login/login.module').then((x) => x.LoginModule)
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
