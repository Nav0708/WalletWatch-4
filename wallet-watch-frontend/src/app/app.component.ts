import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import MatTooltipModule
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';
import 'chart.js';

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
  //googleAuthUrl = 'http://localhost:8080/auth/google';
  googleAuthUrl = environment.hostUrl+'/auth/google';/****Changing this as a part of Azure config*****/
  welcomepage = '/welcome';
  isLoggedIn: boolean = false;
  username: string = '';

  

  constructor(public authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.router.events
    .pipe(filter(this.isNavigationEnd))
    .subscribe(() => {
      this.authService.updateLoginState();
    });
  }
  private isNavigationEnd(event: Event): event is NavigationEnd {
    return event instanceof NavigationEnd;
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
