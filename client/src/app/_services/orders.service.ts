import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Order } from '../_models/order';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataShareService } from './data-share.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`
//   })
// };

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  private _orders = new BehaviorSubject<Order[]>([]);
  private dataStore: { orders: Order[] } = { orders: [] };
  readonly orders = this._orders.asObservable();

  get refreshNeeded$() {
    return this._orders;
  }

  constructor(private http: HttpClient) {}

  public getOrders() {
    this.http.get<Order[]>(`${this.baseUrl}orders`).subscribe(
      res => {
        this.dataStore.orders = res;
        this._orders.next(Object.assign({}, this.dataStore).orders);
      },
      catchError(this.errorHandler)
    );

  }
  // public getOrdersFromEmployee() {
  //   console.log(this.ordersFromEmployee);
  // }
  // getEmployees(): Observable<Employe[]> {
  //   return this.http.get<Employe[]>(`${this.baseUrl}employees`, httpOptions);
  // }

  public getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}orders/${id}`);
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('error occurred!');
    return throwError(error);
  }
}
