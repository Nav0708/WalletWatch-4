import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import MatTooltipModule
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule, // Add MatTooltipModule here
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wallet Watch';
  googleAuthUrl = 'http://localhost:8080/auth/google';
  welcomepage = '/welcome';
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(public authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.authService.updateLoginState();
    });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  login() {
    this.authService.login();
    window.location.href = this.googleAuthUrl; 
    this.cdr.detectChanges(); 
  }

  logout() {
    this.authService.logout();
    //window.location.href = this.welcomepage;
    this.cdr.detectChanges(); 
  }
}
