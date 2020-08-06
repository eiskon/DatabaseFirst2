import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { OrdersService } from 'src/app/_services/orders.service';
import { Orders } from '../../Model/order';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-edit-dialoge',
  templateUrl: './order-edit-dialog.component.html',
  styleUrls: ['./order-edit-dialog.component.css']
})
export class OrderEditDialogComponent implements OnInit {
  order: Orders;
  orderId: number;
  customerId: string;
  isLoading = true;

  form: FormGroup;

  constructor(private ordersService: OrdersService,
              private activatedRoute: ActivatedRoute,
    // private router: Router,
              public dialogRef: MatDialogRef<OrderEditDialogComponent>
              // private fb: FormBuilder
              ) {

    this.orderId = this.activatedRoute.snapshot.params.orderId;
    // console.log(this.orderId);
    // this.customerId = this.data.customerId;
    // console.log(data);
  }

  ngOnInit() {
    this.loadOrder();
  }
  loadOrder(): void {
    this.ordersService.getOrder(this.orderId).subscribe((data: Orders) => {
      // console.log(data);
      this.order = data;
      // console.log(this.order);
    });
  }
  save() {}

  close() {
    this.dialogRef.close();
  }
}
