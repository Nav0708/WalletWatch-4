import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { response } from 'express';
import { request } from 'node:https';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userSubject = new BehaviorSubject<string | null>('');
  private apiUrl = 'http://localhost:8080';
  welcomepage = '/welcome';
  
  loggedIn$ = this.loggedInSubject.asObservable();
  user$ = this.userSubject.asObservable();

  //userType$ = this.userTypeSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  login() {
    localStorage.setItem('loggedIn', 'true');
    this.loggedInSubject.next(true);
    this.getUserProfile();

  }
  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    this.loggedInSubject.next(false);
    window.location.href = this.welcomepage;
  }
  getUserProfile():any{
    if (this.isLoggedIn()){
    console.log('Fetching user profile...');  // This logs the message before the HTTP request
    return this.http.get<any>(this.apiUrl + `/user`,{withCredentials:true}).pipe(
    tap((response) => {
      console.log('User profile data:', response);  
    }),
    catchError((error) => {
      console.error('Error fetching user profile:', error);  // This logs any errors if the request fails
      return throwError(error);
    })
    );
  }
  else{
    console.log('User is not logged in');  
  }
  }
  // Call this to update the user data in the frontend
  setUser(user: any) {
    this.userSubject.next(user);
  }
  public isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
  public getUser() {
    return this.http.get(`${this.apiUrl}/user`,{withCredentials:true});
  }
  public updateLoginState() {
    this.loggedInSubject.next(this.isLoggedIn());
  }
}