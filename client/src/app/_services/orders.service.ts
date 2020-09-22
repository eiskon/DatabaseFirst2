import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../_models/order';
import { PaginatedResult } from '../_models/paginatedResult';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getOrders(page?, itemsPerPage?, employeeId?) {
    const paginatedResult: PaginatedResult<Order[]> = new PaginatedResult<Order[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (employeeId != null) {
      params = params.append('employeeId', employeeId);
    }

    return this.http.get<Order[]>(`${this.baseUrl}orders`, { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  public getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}orders/${id}`);
  }
}
