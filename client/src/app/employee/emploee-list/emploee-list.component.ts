import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Employe } from 'src/app/_models/employe';
import { ActivatedRoute } from '@angular/router';
import { EmployeeEditDialogComponent } from '../employee-edit-dialog/employee-edit-dialog.component';
import { AuthService } from 'src/app/_services/auth.service';

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

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              public dialog: MatDialog) { }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource = new MatTableDataSource<Employe>(data.employees);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
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
