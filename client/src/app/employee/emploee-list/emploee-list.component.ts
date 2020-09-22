import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Employe } from 'src/app/_models/employe';
import { ActivatedRoute } from '@angular/router';
import { EmployeeEditDialogComponent } from '../employee-edit-dialog/employee-edit-dialog.component';
import { AuthService } from 'src/app/_services/auth.service';
import { Pagination } from 'src/app/_models/pagination';
import { EmployeesService } from 'src/app/_services/employees.service';
import { PaginatedResult } from 'src/app/_models/paginatedResult';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-emploee-list',
  templateUrl: './emploee-list.component.html',
  styleUrls: ['./emploee-list.component.css']
})
export class EmploeesListComponent implements OnInit {
  employees: Employe[];
  public dataSource: MatTableDataSource<Employe>;
  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'city',
    'region',
    'country',
    'lastUpdate',
    'actions'
  ];
  pagination: Pagination;
  employeeParams: any = {};
  keyUp$ = new Subject<string>();
  isLoading = false;
  searchTerm = '';

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private employeesService: EmployeesService,
              private alertify: AlertifyService,
              public dialog: MatDialog) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource = new MatTableDataSource<Employe>(data.employees.result);
      this.dataSource.sort = this.sort;
      this.pagination = data.employees.pagination;
      this.employees = data.employees.result;
    });
    this.employeeParams.lastName = '';

    this.keyUp$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.employeesService.getEmployees(this.pagination.currentPage, this.pagination.itemsPerPage, searchTerm)),
      tap(() => this.isLoading = false)
    ).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Employe>(data.result);
      this.dataSource.sort = this.sort;
      this.pagination = data.pagination;
      this.employees = data.result;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.pageIndex + 1;
    this.pagination.itemsPerPage = event.pageSize;
    this.keyUp$.subscribe(term => {
      this.searchTerm = term;
    });
    this.loadEmployees();
  }

  resetFilters() {
    this.employeeParams.lastName = '';
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesService.getEmployees(this.pagination.currentPage, this.pagination.itemsPerPage, this.searchTerm)
      .subscribe((res: PaginatedResult<Employe[]>) => {
        this.dataSource = new MatTableDataSource<Employe>(res.result);
        this.dataSource.sort = this.sort;
        this.pagination = res.pagination;
      },
        error => {
          this.alertify.error(error);
        }
      );
  }

  openDialogEmployeeEdit(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = 'rtl';
    const dialogRef = this.dialog.open(EmployeeEditDialogComponent, {
      width: '1000px',
      disableClose: false,
      position: { top: '1%' },
      maxHeight: '96vh',
      panelClass: ['mat-dialog-overflow', 'dialog-0-p']
    });

    dialogRef.componentInstance.employeeId = id;

  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
