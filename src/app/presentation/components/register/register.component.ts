import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  private apiUrl = 'http://localhost:3000/users'; // URL de la colección de usuarios

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verificar si el usuario ya existe
    this.http.get<any[]>(`${this.apiUrl}?username=${this.username}`).subscribe({
      next: (users) => {
        if (users.length > 0) {
          alert('El nombre de usuario ya está registrado. Por favor, elige otro.');
          return;
        }
        this.registerNewUser();
      },
      error: (error) => {
        console.error('Error al verificar el usuario:', error);
        alert('Ocurrió un error al verificar el usuario. Intente nuevamente.');
      },
    });
  }

  private registerNewUser(): void {
    const newUser = {
      username: this.username,
      password: this.password,
      subscription: null,
    };

    this.http.post(this.apiUrl, newUser).subscribe({
      next: () => {
        alert('Usuario registrado exitosamente.');
        this.router.navigate(['/']); // Redirige al home después del registro
      },
      error: (error) => {
        console.error('Error al registrar el usuario:', error);
        alert('Ocurrió un error al registrar el usuario. Intente nuevamente.');
      },
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}