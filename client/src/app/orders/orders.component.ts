import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../share/orders.service';
import { Observable } from 'rxjs';
import { Orders } from '../Model/order';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit  {
  public dataSource: MatTableDataSource<Orders>;
  displayedColumns: string[] = [
    'orderId',
    'orderDate',
    'shipVia',
    'shipAddress',
  ];

  constructor(private ordersService: OrdersService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.ordersService.getOrders().subscribe(res => {
      this.dataSource = new MatTableDataSource<Orders>(res);
      // this.dataSource = res;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });

  }
}
