import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
   MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
   MatInputModule, MatTableModule, MatPaginatorModule, MatSelect, MatOption,
   MatSelectModule, MatGridListModule, MatDialogModule, MatDialogContent, MatSortModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { OrdersService } from './_services/orders.service';
import { CoreModule } from './_core/core.module';
import { OrdersModule } from './orders/orders.module';
import { HomeComponent } from './home/home.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { LoginModule } from './login/login.module';
import { EmployeesModule } from './employee/employee.module';
import { EmployeeListResolver } from './_resolvers/employee-list.resolver';
import { EmployeeEditDialogComponent } from './employee/employee-edit-dialog/employee-edit-dialog.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { OrderListResolver } from './_resolvers/order-list.resolver';

export function getToken() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterDialogComponent
   ],
   imports: [
      BrowserModule,
      CoreModule,
      OrdersModule,
      EmployeesModule,
      LoginModule,
      HttpClientModule,
      AppRoutingModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatIconModule,
      MatTableModule,
      MatToolbarModule,
      MatButtonModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule,
      FlexLayoutModule,
      MatPaginatorModule,
      LayoutModule,
      MatSidenavModule,
      MatListModule,
      FormsModule,
      MatSelectModule,
      MatGridListModule,
      MatDialogModule,
      MatSortModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: getToken,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      OrdersService,
      AlertifyService,
      EmployeeListResolver,
      OrderListResolver,
      PreventUnsavedChanges,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      RegisterDialogComponent,
      EmployeeEditDialogComponent
   ]
})
export class AppModule { }
