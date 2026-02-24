import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

export const employeeGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isAuthenticated() && 
      (authService.isInRole("admin") || authService.isInRole("generalmanager")
    || authService.isInRole("payrollmanager"))) {

    return true;

  }else {
    router.navigate(['/forbidden']);
    return false;
  }
  
  
};
