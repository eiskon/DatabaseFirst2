import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Order } from '../_models/order';
import { OrdersService } from '../_services/orders.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OrderListResolver implements Resolve<Order[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private ordersService: OrdersService, private alertify: AlertifyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Order[]> {
        return this.ordersService.getOrders(this.pageNumber, this.pageSize)
            .pipe(
                catchError(error => {
                    this.alertify.error('Problem retriving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}
