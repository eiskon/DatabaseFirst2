import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Employe } from '../_models/employe';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterDialogComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  employee: Employe;
  registerForm: FormGroup;
  selectedTitleOfCourtesy = ['Ms.', 'Mr.', 'Mrs.'];

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      titleOfCourtesy: ['', Validators.required],
      birthDate: [null, Validators.required],
      postalCode: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      homePhone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.employee = Object.assign({}, this.registerForm.value);
      this.authService.register(this.employee).subscribe(() => {
        this.alertify.success('registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.employee).subscribe(() => {
          this.router.navigate(['/employee']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
