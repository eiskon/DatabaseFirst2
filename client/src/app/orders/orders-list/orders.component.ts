import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../_services/orders.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Orders } from '../../Model/order';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderEditDialogComponent } from '../order-edit-dialog/order-edit-dialog.component';
import { EmployeeDetailsDialogComponent } from 'src/app/employee/employee-details-dialog/employee-details-dialog.component';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersFromEmployee: Orders[];
  orders$: Observable<Orders[]>;
  public dataSource: MatTableDataSource<Orders>;
  displayedColumns: string[] = [
    'orderId',
    'orderDate',
    'shipVia',
    'shipAddress',
    'actions',
    'employee'
  ];

  constructor(private ordersService: OrdersService,
    public dialog: MatDialog,
    private dataShareService: DataShareService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.ordersService.refreshNeeded$.subscribe((data) => {
      if (data.length > 0) {
        this.refreshOrders();
      } else {
        this.loadOrders();
      }
    });


    this.dataShareService.shareDataSubject.subscribe(receiveddata => {
      this.ordersFromEmployee = receiveddata;
      if (this.ordersFromEmployee.length > 0) {
        this.displayedColumns = [
          'orderId',
          'orderDate',
          'shipVia',
          'shipAddress',
          'actions'
        ];
        this.dataSource = new MatTableDataSource<Orders>(this.ordersFromEmployee);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.ordersService.refreshNeeded$.subscribe(() => {
          this.loadOrders();
        });
        this.loadOrders();
      }
    });

  }

  loadOrders() {
    this.clearDataSource();
    this.ordersService.getOrders();
    this.orders$ = this.ordersService.orders;
    this.orders$.subscribe(res => {
      this.dataSource = new MatTableDataSource<Orders>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  refreshOrders() {
    this.ordersService.refreshNeeded$.subscribe((res) => {
      this.dataSource = new MatTableDataSource<Orders>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = [
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
}
