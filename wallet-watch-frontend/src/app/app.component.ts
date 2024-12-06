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
  googleAuthUrl = "http://localhost:8080" + "/auth/google";
  welcomepage = '';
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Update the login state when navigation ends
        this.authService.updateLoginState();
      });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  loginAsUser() {
    this.authService.login('user');
    window.location.href = this.googleAuthUrl; 
  }
  logout() {
    this.authService.logout();
    window.location.href = this.welcomepage; 
  }



}
