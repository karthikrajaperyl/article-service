import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../model/User';
const AUTH_TOKEN_KEY = 'auth_token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn = this.loggedIn.asObservable();
  constructor(private httpClient: HttpClient, private router: Router) { }

  hasToken(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }
  login(credentials: any): Observable<boolean | null> {
    return this.httpClient.post<User>("/api/auth/v1/login", credentials).pipe(
      tap((response: any) => {
        localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken);
        localStorage.setItem("user", JSON.stringify(response.username));
        this.loggedIn.next(true);
        return response;
      }), catchError(error => {
        console.error('Login failed:', error);
        return of(null);
      })
    );
  }

  getUserDetails(): User | null {
    const token = this.getToken();
    if (!token) return null;

    // --- Mock Token Decoding (Replace with actual JWT decode library) ---
    // In a real app, use a library like 'jwt-decode' to get the payload:
    // const payload = jwt_decode(token);
    // return { id: payload.userId, username: payload.sub, role: payload.role } as User;

    // For this example, we mock a user object based on token existence:
    return this.getUser();
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.loggedIn.next(false); // Update reactive state
    this.router.navigate(['/articles']); // Redirect to login
  }

  register(userData: any): Observable<any> {
    // Note: Registration typically doesn't return a token, 
    // but the backend should assign the 'contributor' role.
    return this.httpClient.post<User>("/api/auth/v1/register", userData).pipe(
      tap((response: any) => {
        // Optional: Redirect to login page after successful registration
        alert('Registration successful!');
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Registration failed:', error);
        return of(null);
      })
    );
  }
}
