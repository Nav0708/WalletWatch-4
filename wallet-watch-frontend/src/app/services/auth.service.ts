import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userSubject = new BehaviorSubject<string | null>(localStorage.getItem('user'));
  private apiUrl = environment.hostUrl; // Using the environment variable
  welcomepage = '/welcome'; // Define your application's welcome page route

  loggedIn$ = this.loggedInSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Login and set the local state */
  login(): void {
    localStorage.setItem('loggedIn', 'true');
    this.loggedInSubject.next(true);
    this.getUserProfile(); // Fetch user profile after login
  }

  /** Logout and clear the local state */
  logout(): void {
    localStorage.clear();
    this.loggedInSubject.next(false);
    this.userSubject.next(null);
    location.assign(this.welcomepage); // Redirect to the welcome page
  }

  /** Fetch the user profile from the backend */
  getUserProfile(): Observable<any> {
    if (this.isLoggedIn()) {
      console.log('Fetching user profile...');
      return this.http.get<any>(`${this.apiUrl}user`, { withCredentials: true }).pipe(
        tap((response) => {
          console.log('User profile data:', response);
          localStorage.setItem('user', JSON.stringify(response));
          this.setUser(response);
        }),
        catchError((error) => {
          console.error('Error fetching user profile:', error);
          return throwError(() => error);
        })
      );
    } else {
      console.log('User is not logged in');
      return throwError(() => new Error('User not logged in'));
    }
  }

  /** Update the user data in the frontend */
  setUser(user: any): void {
    this.userSubject.next(user);
  }

  /** Check if the user is logged in */
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  /** Retrieve user details from the backend */
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}user`, { withCredentials: true });
  }

  /** Synchronize the login state with the local storage */
  updateLoginState(): void {
    this.loggedInSubject.next(this.isLoggedIn());
  }
}