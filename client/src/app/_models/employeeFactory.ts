import { Employe } from './employe';

export class EmployeeFactory {
    static empty(): Employe {
        return {
            employeeId: null,
            lastName: '',
            firstName: '',
            title: '',
            titleOfCourtesy: '',
            hireDate: '',
            birthDate: '',
            lastUpdate: '',
            age: null,
            address: '',
            city: '',
            region: '',
            postalCode: '',
            country: '',
            homePhone: '',
            notes: '',
            orders: []
        }
    }
}
