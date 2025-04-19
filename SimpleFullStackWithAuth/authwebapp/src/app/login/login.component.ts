import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        // Store user information in localStorage
        localStorage.setItem('currentUser', JSON.stringify(response));
        
        // Navigate to user page
        this.router.navigate(['/user']);
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}