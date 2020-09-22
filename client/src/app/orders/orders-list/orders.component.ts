import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { OrdersService } from '../../_services/orders.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/_models/order';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderEditDialogComponent } from '../order-edit-dialog/order-edit-dialog.component';
import { EmployeeDetailsDialogComponent } from 'src/app/employee/employee-details-dialog/employee-details-dialog.component';
import { DataShareService } from 'src/app/_services/data-share.service';
import { Pagination } from 'src/app/_models/pagination';
import { PaginatedResult } from 'src/app/_models/paginatedResult';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrdersComponent implements OnInit {
  order: Order;

  // ordersFromEmployee: Order[];
  ordersFromEmployee: boolean;
  employeeId: number;
  orders: Order[];
  public dataSource: MatTableDataSource<Order>;
  columnsToDisplay: string[] = [
    'orderId',
    'orderDate',
    'shipVia',
    'shipAddress',
    'employee'
  ];
  pagination: Pagination;
  totalItemsForRefresh: number;
  expandedElement: Order | null;

  constructor(private ordersService: OrdersService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private alertify: AlertifyService,
              private dataShareService: DataShareService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource = new MatTableDataSource<Order>(data.orders.result);
      this.dataSource.sort = this.sort;
      this.pagination = data.orders.pagination;
      this.orders = data.orders.result;
      this.totalItemsForRefresh = this.pagination.totalItems;
    });
  }

  pageChanged(event: any): void {
    // console.log(this.ordersFromEmployee);
    this.pagination.currentPage = event.pageIndex + 1;
    this.pagination.itemsPerPage = event.pageSize;
    if (!this.ordersFromEmployee) {
      this.loadOrders();
    }
    else {
      this.loadOrdersbyEmployeeId(this.employeeId);
    }

  }

  loadOrders() {
    this.ordersService.getOrders(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Order[]>) => {
        console.log(res.result);
        this.dataSource = new MatTableDataSource<Order>(res.result);
        this.dataSource.sort = this.sort;
        this.pagination = res.pagination;
        this.ordersFromEmployee = false;
        this.employeeId = 0;
      },
        error => {
          this.alertify.error(error);
        }
      );
  }

  loadOrdersbyEmployeeId(id: number) {
    this.ordersService.getOrders(this.pagination.currentPage, this.pagination.itemsPerPage, id)
      .subscribe((res: PaginatedResult<Order[]>) => {
        this.dataSource = new MatTableDataSource<Order>(res.result);
        this.dataSource.sort = this.sort;
        this.pagination = res.pagination;
        this.ordersFromEmployee = true;
        this.employeeId = id;
      },
        error => {
          this.alertify.error(error);
        }
      );
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
