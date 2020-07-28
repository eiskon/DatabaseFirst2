import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../Model/order';
import { OrdersRaw } from '../Model/order-raw';
import { OrdersFactory } from '../Model/order-factory';
import { retry, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private api = 'http://localhost:5000/api';
  private orders: any;

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<Orders[]> {
    return this.http.get<OrdersRaw[]>(`${this.api}/orders`)
      .pipe(
        retry(3),
        map(orderRaw =>
          orderRaw.map(o => OrdersFactory.fromRaw(o)),
          )
      );
  }
}
