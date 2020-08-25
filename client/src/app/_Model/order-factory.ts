import { Orders } from './order';
import { OrdersRaw } from './order-raw';


export class OrdersFactory {

  static fromRaw(o: OrdersRaw): Orders {
    return {
      ...o,
      orderDate: new Date(o.orderDate),
      requiredDate: new Date(o.requiredDate),
      shippedDate: new Date(o.shippedDate)
    };
  }
}

