import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/_models/employe';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/_services/employees.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-employee-details-dialog',
  templateUrl: './employee-details-dialog.component.html',
  styleUrls: ['./employee-details-dialog.component.scss']
})
export class EmployeeDetailsDialogComponent implements OnInit {
  employee: Employe;
  employeeId: number;

  constructor(private employeeService: EmployeesService,
              private activatedRoute: ActivatedRoute,
              private alertify: AlertifyService,
              private router: Router,
              private dataShareService: DataShareService,
              public dialogRef: MatDialogRef<EmployeeDetailsDialogComponent>
  ) {
    this.employeeId = this.activatedRoute.snapshot.params.employeeId;
  }

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

  close() {
    this.dialogRef.close();
  }
}
