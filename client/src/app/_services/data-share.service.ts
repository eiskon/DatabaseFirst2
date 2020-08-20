import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  shareDataSubject = new Subject<any>();

  constructor() { }

  sendDataToOtherComponent(data: any) {

    this.shareDataSubject.next(data);
  }

}
