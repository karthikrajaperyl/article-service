import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  router: any;

  constructor(private authService: AuthService) { }

  onSubmit() {

    this.authService.register({
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).subscribe({
      next: (success: boolean | null) => {
        if (success) {
          console.log('Form Submitted!', {
            username: this.username,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
            confirmPassword: this.confirmPassword
          });
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
    this.username = "";
    this.email = "";
    this.phoneNumber = "";
    this.password = "";
    this.confirmPassword = "";
    alert("Invalid Credentials");
    // this.router.navigate(['/login']); // Already on login page
  }
}

