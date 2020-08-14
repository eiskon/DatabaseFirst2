import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import {
  // MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatGridListModule,
  MatDialogModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component'


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    // MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule
  ],
  declarations: [
    LoginDialogComponent
  ]
})
export class LoginModule { }
