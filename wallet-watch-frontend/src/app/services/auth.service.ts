import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  //private userTypeSubject = new BehaviorSubject<string | null>(this.getUserType());
  private memoryStorage = new Map<string, string>();

  loggedIn$ = this.loggedInSubject.asObservable();
  //userType$ = this.userTypeSubject.asObservable();
  

  login(userType: string) {
    console.log(localStorage);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userType', userType);
    this.loggedInSubject.next(true);
    //this.userTypeSubject.next(userType);
  }
  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/auth/google'; 
  }

  logout() {
    // Perform logout logic here
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userType');
    this.loggedInSubject.next(false);
    window.location.href = 'http://localhost:8080/logout'; // Redirect to backend logout route
    //this.userTypeSubject.next(null);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
  public updateLoginState() {
    this.loggedInSubject.next(this.isLoggedIn());
  }
}