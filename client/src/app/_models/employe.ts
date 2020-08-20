import { Order } from './order';

export interface Employe {
    employeeId: number;
    lastName: string;
    firstName: string;
    title: string;
    titleOfCourtesy: string;
    hireDate: string;
    age: number;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    homePhone: string;
    notes?: string;
    orders?: Order[];
}
