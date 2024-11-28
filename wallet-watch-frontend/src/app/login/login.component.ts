import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onUsernameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.username = input.value;
  }

  onPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
  }

  onLogin(): void {
    if (this.username === 'user' && this.password === 'password') {
      this.router.navigate(['/welcome']);
    } else {
      alert('Invalid username or password');
    }
  }
}
