import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
  roles: string[];
}

export interface RegisterRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7211/api';
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  
  // Observable that components can subscribe to
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient) {
    // Check if user is stored in localStorage during service initialization
    this.checkAuthState();
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/Auth/register`, request);
  }
  
  // Check if we have a stored user and update the subject
  private checkAuthState(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }
  
  // Get current authentication state
  public isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
 * Check if the current user has a specific role
 * @param role The role to check for
 * @returns true if the user has the role, false otherwise
 */
  public hasRole(role: string): boolean {
    const user = this.currentUserValue;
    if (!user || !user.roles) {
      return false;
    }
    return user.roles.includes(role);
  }

  generatePasswordResetLink(email: string): Observable<{resetLink: string}> {
    return this.http.post<{resetLink: string}>(
      `${this.baseUrl}/Auth/generate-password-reset-link`,
      { email }
    );
  }

  resetPassword(email: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/Auth/reset-password`,
      { email, token, newPassword },
      // Specify that we expect a text response, not JSON
      { responseType: 'text' }
    );
  }
  
  // Get current user value without subscribing
  public get currentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/Auth/login`, request)
      .pipe(
        tap(user => {
          // Store user details and update the subject
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }
  
  logout(): void {
    // Remove user from local storage and update the subject
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}