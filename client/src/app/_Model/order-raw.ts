export interface OrdersRaw {
  orderId: number;
  customerId: number;
  employeeId: number;
  orderDate?: string;
  requiredDate?: string;
  shippedDate?: string;
  shipVia?: number;
  sreight: number;
  shipName: number;
  shipAddress: string;
  shipCity: string;
  shipRegion: string;
  shipPostalCode: string;
  shipCountry: string;
}
