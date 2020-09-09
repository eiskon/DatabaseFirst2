import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { OrdersService } from '../../_services/orders.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/_models/order';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderEditDialogComponent } from '../order-edit-dialog/order-edit-dialog.component';
import { EmployeeDetailsDialogComponent } from 'src/app/employee/employee-details-dialog/employee-details-dialog.component';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrdersComponent implements OnInit {
  order: Order;

  ordersFromEmployee: Order[];
  orders$: Observable<Order[]>;
  public dataSource: MatTableDataSource<Order>;
  columnsToDisplay: string[] = [
    'orderId',
    'orderDate',
    'shipVia',
    'shipAddress',
    'actions',
    'employee'
  ];

  expandedElement: Order | null;

  constructor(private ordersService: OrdersService,
              public dialog: MatDialog,
              private dataShareService: DataShareService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.ordersService.refreshNeeded$.subscribe((data) => {
      if (data.length > 0) {
        console.log('refresh');
        this.refreshOrders();
      } else {
        console.log('load');
        this.loadOrders();
      }
    });


    this.dataShareService.shareDataSubject.subscribe(receivedData => {
      this.ordersFromEmployee = receivedData;
      if (this.ordersFromEmployee.length > 0) {
        this.clearDataSource();
        this.columnsToDisplay = [
          'orderId',
          'orderDate',
          'shipVia',
          'shipAddress',
          'actions'
        ];
        this.dataSource = new MatTableDataSource<Order>(this.ordersFromEmployee);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.ordersService.refreshNeeded$.subscribe(() => {
          this.loadOrders();
        });
      }
    });

  }

  loadOrders() {
    this.clearDataSource();
    this.ordersService.getOrders();
    this.orders$ = this.ordersService.orders;
    this.orders$.subscribe(res => {
      this.dataSource = new MatTableDataSource<Order>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  refreshOrders() {
    this.ordersService.refreshNeeded$.subscribe((res) => {
      this.dataSource = new MatTableDataSource<Order>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.columnsToDisplay = [
        'orderId',
        'orderDate',
        'shipVia',
        'shipAddress',
        'actions',
        'employee'
      ];
    });
    this.ordersFromEmployee = null;
  }

  clearDataSource() {
    this.dataSource = null;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Dialog
  // -----------------------------------------------------------------------------------------------------

  openDialog(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(OrderEditDialogComponent, {
      width: '1000px',
      disableClose: false,
      position: { top: '1%' },
      maxHeight: '96vh',
      panelClass: ['mat-dialog-overflow', 'dialog-0-p']
    });

    dialogRef.componentInstance.orderId = id;
  }

  openDialogEmployeeDetails(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = 'rtl';
    const dialogRef = this.dialog.open(EmployeeDetailsDialogComponent, {
      width: '1000px',
      disableClose: false,
      position: { top: '1%' },
      maxHeight: '96vh',
      panelClass: ['mat-dialog-overflow', 'dialog-0-p']
    });

    dialogRef.componentInstance.employeeId = id;
  }

  loadOrderDetails(id: number) {
    this.order = null;
    this.ordersService.getOrder(id).subscribe((data: Order) => {
      this.order = data;
    });
  }
}
