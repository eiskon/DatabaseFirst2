import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginDialogComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
