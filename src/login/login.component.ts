import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login({
      username: this.userName,
      password: this.password
    }).subscribe({
      next: (success: boolean | null) => {
        if (success) {
          this.router.navigate(['/articles']);
        } else {
          this.handleLoginError();
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.handleLoginError();
      }
    });
  }

  private handleLoginError() {
    this.userName = "";
    this.password = "";
    alert("Invalid Credentials");
  }
}
