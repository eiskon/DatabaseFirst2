import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GermanDateFormatPipe } from './pipes/germanDateFormat.pipe';
import { GermanDateTimeFormatPipe } from './pipes/germanDateTimeFormat.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GermanDateFormatPipe,
    GermanDateTimeFormatPipe
  ],
  exports: [
    GermanDateFormatPipe,
    GermanDateTimeFormatPipe
  ]
})
export class CoreModule { }
