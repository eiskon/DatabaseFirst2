import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/_models/employe';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/_services/employees.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DataShareService } from 'src/app/_services/data-share.service';
import { Orders } from 'src/app/Model/order';

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
    // this.employee = this.activatedRoute.snapshot.data.employee;
  }

  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.data.employee);
    this.loadEmployee();
    // this.activatedRoute.snapshot.data.subscribe(data => {
    //   console.log(data);
    //   this.employee = data.employee;
    // });
    // this.employee = this.activatedRoute.snapshot.data.employee;
  }

  loadEmployee(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe((data: Employe) => {
      this.employee = data;
    }, error => {
      this.alertify.error(error);
    });
  }

  save() { }

  close() {
    this.dialogRef.close();
  }

  passData(orders: Orders[]){
    this.dataShareService.sendDataToOtherComponent(orders);
    this.close();
  }


}
