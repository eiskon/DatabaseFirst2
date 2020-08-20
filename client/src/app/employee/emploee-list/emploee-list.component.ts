import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../_services/employees.service';
import { Employe } from 'src/app/_models/employe';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emploee-list',
  templateUrl: './emploee-list.component.html',
  styleUrls: ['./emploee-list.component.css']
})
export class EmploeesListComponent implements OnInit {
  employees: Employe[];

  constructor(private employeeService: EmployeesService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.employees = data.employees;
    });
  }

  // loadEmployees() {
  //   this.employeeService.getEmployees().subscribe((employees: Employe[]) => {
  //     this.employees = employees;
  //     // console.log(this.employees);
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
