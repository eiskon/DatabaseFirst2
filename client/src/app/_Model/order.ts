export interface Orders {
  orderId: number;
  customerId: number;
  employeeId: number;
  orderDate?: Date;
  requiredDate?: Date;
  shippedDate?: Date;
  shipVia?: number;
  sreight: number;
  shipName: number;
  shipAddress: string;
  shipCity: string;
  shipRegion: string;
  shipPostalCode: string;
  shipCountry: string;
}
