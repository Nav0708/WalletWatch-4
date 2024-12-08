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

  login() {
    localStorage.setItem('loggedIn', 'true');
    this.loggedInSubject.next(true);
    this.userSubject.next(null);
  }

  logout() {
    // Perform logout logic here
    localStorage.removeItem('loggedIn');
    this.loggedInSubject.next(false);
    this.userSubject.next(null);
  }
  public getUser(): string | null {
    return localStorage.getItem('user');
  }
  public isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  public updateLoginState() {
    this.loggedInSubject.next(this.isLoggedIn());
    this.userSubject.next(this.getUser());
}
}