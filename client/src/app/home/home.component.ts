import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  navToRegister() {
    this.router.navigate(['/register']);
  }

  navToLogin() {
    this.router.navigate(['/login']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
