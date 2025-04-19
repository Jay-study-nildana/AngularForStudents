import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {
    email: '',
    password: ''
  };
  
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';
    
    // Validation
    if (this.registerRequest.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    this.isLoading = true;
    
    this.authService.register(this.registerRequest).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        
        // Navigate to login after a short delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        console.error('Registration error', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}