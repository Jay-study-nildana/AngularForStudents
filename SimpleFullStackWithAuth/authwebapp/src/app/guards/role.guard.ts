import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // First check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    
    // Then check if user has the required role
    const requiredRole = route.data['role'] as string;
    if (!requiredRole) {
      return true; // No specific role required
    }
    
    // Get user details including roles
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.roles && currentUser.roles.includes(requiredRole)) {
      return true; // User has the required role
    }
    
    // User doesn't have the required role
    this.router.navigate(['/unauthorized']);
    return false;
  }
}