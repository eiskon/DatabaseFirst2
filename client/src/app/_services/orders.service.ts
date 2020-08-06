import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Orders } from '../Model/order';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private api = 'http://localhost:5000/api';

  private _orders = new BehaviorSubject<Orders[]>([]);
  private dataStore: { orders: Orders[] } = { orders: [] };
  readonly orders = this._orders.asObservable();

  constructor(private http: HttpClient) { }

  public getOrders() {
    this.http.get<Orders[]>(`${this.api}/orders`).subscribe(
      res => {
        this.dataStore.orders = res;
        this._orders.next(Object.assign({}, this.dataStore).orders);
      },
      catchError(this.errorHandler)
    );
  }

  public getOrder(id: number): Observable<Orders> {
    return this.http.get<Orders>(`${this.api}/orders/${id}`);
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('error occurred!');
    return throwError(error);
  }
}
