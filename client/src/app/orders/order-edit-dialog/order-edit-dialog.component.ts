import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { OrdersService } from 'src/app/_services/orders.service';
import { Order } from 'src/app/_models/order';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-edit-dialoge',
  templateUrl: './order-edit-dialog.component.html',
  styleUrls: ['./order-edit-dialog.component.css']
})
export class OrderEditDialogComponent implements OnInit {
  order: Order;
  orderId: number;
  customerId: string;
  isLoading = true;

  form: FormGroup;

  constructor(private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<OrderEditDialogComponent>
  ) {

    this.orderId = this.activatedRoute.snapshot.params.orderId;
  }

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder(): void {
    this.ordersService.getOrder(this.orderId).subscribe((data: Order) => {
      this.order = data;
    });
  }

  save() { }

  close() {
    this.dialogRef.close();
  }
}
