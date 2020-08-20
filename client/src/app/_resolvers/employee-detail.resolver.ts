import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Employe } from '../_models/employe';
import { EmployeesService } from '../_services/employees.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeDetailResolver implements Resolve<Employe> {

    constructor(private employeeService: EmployeesService, private alertify: AlertifyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Employe> {
        return this.employeeService.getEmployee(route.params.employeeId)
            .pipe(
                catchError(error => {
                    this.alertify.error('Problem retriving data');
                    this.router.navigate(['/employees']);
                    return of(null);
                })
            );
    }
}
