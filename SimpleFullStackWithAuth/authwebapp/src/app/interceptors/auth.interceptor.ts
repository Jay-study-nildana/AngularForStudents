import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from localStorage
    const token = this.getToken();
    
    if (token) {
      // Clone the request and add the authorization header
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Handle the cloned request
      return next.handle(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // If unauthorized, redirect to login
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login'], { 
              queryParams: { returnUrl: this.router.url }
            });
          }
          return throwError(() => error);
        })
      );
    }
    
    // If no token, proceed with original request
    return next.handle(request);
  }
  
  private getToken(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.token;
    }
    return null;
  }
}