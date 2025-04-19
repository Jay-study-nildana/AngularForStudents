import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo: LoginResponse | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.currentUserValue;
    if (!this.userInfo) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}