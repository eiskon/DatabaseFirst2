import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../_services/orders.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from '../../Model/order';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderEditDialogComponent } from '../order-edit-dialog/order-edit-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Orders[]>;
  public dataSource: MatTableDataSource<Orders>;
  displayedColumns: string[] = [
    'orderId',
    'orderDate',
    'shipVia',
    'shipAddress',
    'actions'
  ];

  constructor(private ordersService: OrdersService, public dialog: MatDialog, private router: Router) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.ordersService.getOrders();
    this.orders$ = this.ordersService.orders;
    this.orders$.subscribe(res => {
      this.dataSource = new MatTableDataSource<Orders>(res);

      this.dataSource.paginator = this.paginator;
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Dialog
  // -----------------------------------------------------------------------------------------------------

  openDialog(id: number) {
    // this.router.navigate(['/orders', orderId]);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.dataSource;
    const dialogRef = this.dialog.open(OrderEditDialogComponent, {
      width: '1000px',
      disableClose: false,
      position: { top: '1%' },
      maxHeight: '96vh',
      panelClass: ['mat-dialog-overflow', 'dialog-0-p']
    });

    dialogRef.componentInstance.orderId = id;
  }
}
