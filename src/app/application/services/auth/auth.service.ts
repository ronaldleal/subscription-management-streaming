import { catchError, map, Observable, of } from "rxjs";
import { UserDTO } from "../../dtos/users.dto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean;

  private apiUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map((users: UserDTO[]) => {
        if (users.length > 0) {
          const user = users[0];
          this.isAuthenticated = true;
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', JSON.stringify(user)); 
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Error during login request:', error.message || error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  getCurrentUser(): UserDTO | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  updateCurrentUser(user: UserDTO): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
}