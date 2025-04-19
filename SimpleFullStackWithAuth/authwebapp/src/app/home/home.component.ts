// /home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authService.currentUser$.subscribe(user => {
      this.userEmail = user?.email || null;
    });
  }
}