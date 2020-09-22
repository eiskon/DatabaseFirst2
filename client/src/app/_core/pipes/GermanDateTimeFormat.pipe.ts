import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GermanDateTimeFormat'
})
export class GermanDateTimeFormatPipe implements PipeTransform {

  transform(value: any): any {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'dd.MM.yyyy hh-mm');
    return value;
  }

}
