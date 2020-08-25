import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { EmployeesService } from '../../_services/employees.service';
import { Employe } from 'src/app/_models/employe';
import { AlertifyService } from 'src/app/_services/alertify.service';
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

  constructor(private route: ActivatedRoute, public authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.employees = data.employees;
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
