import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserModel } from '../interfaces/IUser';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private baseUrl = 'http://localhost:8080/user'; 
    private expenseUrl = 'http://localhost:8080/walletwatch/expenses';
  
    constructor(private http: HttpClient, private authservice: AuthService) { }
    
    getUserById(): Observable<IUserModel> {
      const userId = this.authservice.getUser();
      if (!userId) {
        throw new Error('User ID not found');
      }
      return this.http.get<IUserModel>(`${this.expenseUrl}/${userId}`);
    }
    addExpense(user: IUserModel): Observable<IUserModel> {
    return this.http.post<IUserModel>(this.expenseUrl, user);
    }
   /* updateUser(userId: string, user: IUserModel): Observable<IUserModel> {
      return this.http.put<IUserModel>(`${this.baseUrl}`);
    }*/
    deleteUser(userId: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${userId}`);
    }
  
}
