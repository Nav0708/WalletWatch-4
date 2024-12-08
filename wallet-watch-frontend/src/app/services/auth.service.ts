import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userSubject = new BehaviorSubject<string | null>((this.getUser()));
  //private userTypeSubject = new BehaviorSubject<string | null>(this.getUserType());
  private memoryStorage = new Map<string, string>();

  loggedIn$ = this.loggedInSubject.asObservable();
  user$ = this.userSubject.asObservable();

  //userType$ = this.userTypeSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  login(userId: string) {
    localStorage.setItem('loggedIn', 'true');
    this.loggedInSubject.next(true);
    localStorage.setItem('user', userId);
    this.loggedInSubject.next(true);
    this.userSubject.next(userId);
  }

  logout() {
    // Perform logout logic here
    localStorage.removeItem('loggedIn');
    this.loggedInSubject.next(false);
    this.userSubject.next(null);
  }
  public getUser(): string | null {
    console.log(localStorage.getItem('user'));
    return localStorage.getItem('user');
  }
  public isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
  private fetchUserData() {
    this.http.get<{ displayName: string }>('http://localhost:8080/user')
      .subscribe(
        (data) => {
          this.userSubject.next(data.displayName);
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.userSubject.next(null);
        }
      );
  }
  public updateLoginState() {
    this.loggedInSubject.next(this.isLoggedIn());
    this.userSubject.next(this.getUser());
  }
}