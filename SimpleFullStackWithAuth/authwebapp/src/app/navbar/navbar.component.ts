import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  hasReaderRole = false;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.hasReaderRole = user?.roles?.includes('Reader') || false;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}