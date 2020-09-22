import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { Employe } from 'src/app/_models/employe';
import { EmployeeFactory } from '../../_models/EmployeeFactory';
import { EmployeesService } from 'src/app/_services/employees.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { GermanDateFormatPipe } from '../../_core/pipes/GermanDateFormat.pipe';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.scss']
})
export class EmployeeEditDialogComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  employee = EmployeeFactory.empty();
  employeeId: number;
  
  @HostListener('window:beforeunload', ['$event'])
  uloadNotification($event: any) {
    if ($event.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private employeeService: EmployeesService,
              private alertify: AlertifyService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<EmployeeEditDialogComponent>) {}

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe((data: Employe) => {
      this.employee = data;
    }, error => {
      this.alertify.error(error);
    });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.authService.decodeToken.nameid, this.employee).subscribe(next => {
      this.alertify.success('Profile updated successfuly');
      this.editForm.reset(this.employee);
      this.dialogRef.close();
    }, error => {
      this.alertify.error(error);
    });

  }

}
