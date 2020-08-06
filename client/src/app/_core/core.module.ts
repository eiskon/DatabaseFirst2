import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GermanDateFormatPipe } from './pipes/germanDateFormat.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GermanDateFormatPipe
  ],
  exports: [
    GermanDateFormatPipe
  ]
})
export class CoreModule { }
