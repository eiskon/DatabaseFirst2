import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders-list/orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
   MatInputModule, MatTableModule, MatPaginatorModule, MatSelect, MatOption,
   MatSelectModule, MatGridListModule, MatDialogModule, MatDialogContent
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { OrdersService } from './_services/orders.service';
import { CoreModule } from './_core/core.module';
import { OrdersModule } from './orders/orders.module';
import { HomeComponent } from './home/home.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterDialogComponent
   ],
   imports: [
      CoreModule,
      OrdersModule,
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatIconModule,
      MatTableModule,
      MatToolbarModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      FlexLayoutModule,
      MatPaginatorModule,
      LayoutModule,
      MatSidenavModule,
      MatListModule,
      FormsModule,
      MatSelectModule,
      MatGridListModule,
      MatDialogModule
   ],
   providers: [
      AuthService,
      OrdersService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ],
  entryComponents: [
    RegisterDialogComponent
  ]
})
export class AppModule { }
