import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnChanges {

  orderForm: FormGroup;

  @Input() order: Order;
  @Input() editing = false;
  @Output() submitBook = new EventEmitter<Order>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    this.initForm();
    // this.setFormValues(this.order);
  }

  private initForm() {
    if (this.orderForm) { return; }

    this.orderForm = this.fb.group({

    });
  }
}
