import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-login-component',
  imports: [
    // ...
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

isLoginHidden = false

onSubmit(loginFormValue: any) {

    const { username, password } = loginFormValue;
    this.attemptLogin(username, password);

}

  private readonly http = inject(AuthenticationService);

  attemptLogin(username: string, password: string) {
    this.http.login(username, password).subscribe({
      next: (response) => {
       
       this.isLoginHidden = true;
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login failure, e.g., show error message to user
      }
    });
  }
}
