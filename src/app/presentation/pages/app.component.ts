import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../application/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

  navigateToPlans(): void {
    this.router.navigate(['/plans']);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']); 
  }
}