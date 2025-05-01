import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/application/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent initialized');
  }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(['/subscriptions']);
        } else {
          this.errorMessage = 'Invalid username or password'; 
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }
}