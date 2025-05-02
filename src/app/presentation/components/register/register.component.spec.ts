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

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const newUser = {
      username: this.username,
      password: this.password,
      subscription: null, 
    };

    this.http.post(this.apiUrl, newUser).subscribe(
      (response) => {
        alert('Usuario registrado exitosamente.');
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        alert('Ocurrió un error al registrar el usuario. Intente nuevamente.');
      }
    );
  }
}