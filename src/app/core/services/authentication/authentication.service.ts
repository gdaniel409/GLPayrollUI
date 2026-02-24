/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { HttpClient } from '@angular/common/http';
import {inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthResponse } from '../../../models/AuthResponse';
import { APP_SETTINGS } from '../../../app.settings';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  private readonly http = inject(HttpClient);
  private readonly appSettings = inject(APP_SETTINGS);

  public authResponse: AuthResponse | null = null;
  public userRoles: string[] = [];

  public login(username: string, password: string) {

    const url = this.appSettings.getString("authenticate");

    return this.http.post<AuthResponse>(url, { username, password }).pipe(
      tap(response => {
        // Handle the response, e.g., store the token
        this.authResponse = response;

        const helper = new JwtHelperService();
        const token = response.token; 
        const decodedToken = helper.decodeToken(token);

        this.userRoles = decodedToken.roles;  //|| decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        console.log(this.userRoles);
              
      }
    ));

    }

    public logout() {
      this.authResponse = null;
      this.userRoles = [];
    }

    public isAuthenticated(): boolean | undefined{
      if (this.authResponse?.token) {
        const helper = new JwtHelperService();
        return !helper.isTokenExpired(this.authResponse.token);
        
      } 
      else {
        return false;
      }
    }

    public isInRole(role: string): boolean {
      return this.userRoles.includes(role);
    }

      
}
