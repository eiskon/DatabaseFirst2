import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Employe } from '../_models/employe';
import { EmployeesService } from '../_services/employees.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolver implements Resolve<Employe[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private employeeService: EmployeesService, private alertify: AlertifyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Employe[]> {
        return this.employeeService.getEmployees(this.pageNumber, this.pageSize)
            .pipe(
                catchError(error => {
                    this.alertify.error('Problem retriving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}
