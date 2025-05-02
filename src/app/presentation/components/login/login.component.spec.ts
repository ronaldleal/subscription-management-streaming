import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../application/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
onLogout() {
throw new Error('Method not implemented.');
}
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']); 
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}