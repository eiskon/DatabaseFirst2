import { Employe } from './employe';

export interface Order {
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
    employees: Employe;
    orderDetails: OrderDetails;
}

export interface OrderDetails {
    productId: number;
    UnitPrice: number;
    quantity: number;
    discount: number;
}
