import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/auth.service';
import { environment } from '../../../wallet-watch-backend/azure/environment';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule,MatMenuModule, RouterModule,MatToolbarModule,MatIconModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'Wallet Watch'; 
  //googleAuthUrl = environment.hostUrl + "/auth/google";
  googleAuthUrl = "http://localhost:8080/auth/google";
  welcomepage = '/welcome';
  isLoggedIn: boolean = false;
  username: string ='';

  constructor(public authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        // Get user info after logging in
        this.authService.user$.subscribe(user => {
          this.username = user || 'Guest'; // Default to 'Guest' if no user
        });
      }
    });

    // Check if we are returning from Google authentication and need to fetch the user data
    this.authService.updateLoginState(); 
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  loginAsUser() {
    this.authService.login();
    //window.location.href = this.googleAuthUrl; 
  }
  logout() {
    this.authService.logout();
    this.router.navigate([this.welcomepage]);
  }



}
