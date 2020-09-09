import { Component, OnInit, Input } from '@angular/core';
import { Order, OrderDetails } from 'src/app/_models/order';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';

import { OrderEditDialogComponent } from '../../order-edit-dialog/order-edit-dialog.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @Input() order: Order;

  public dataSource: MatTableDataSource<Order>;
  columnsToDisplay: string[] = [
    'productId',
    'productName',
    'quantity',
    'unitPrice',
    'discount'
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.order);
    const arr = this.order.orderDetails;
    const eArr = arr[Symbol.iterator]();
    const arrDS = [];
    const uniq = [...new Set(eArr)];
    for (const obj of uniq) {
      arrDS.push(obj);
    }
    this.dataSource = new MatTableDataSource<Order>(arrDS);
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
}
