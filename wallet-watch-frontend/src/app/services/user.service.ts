import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserModel } from '../interfaces/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private baseUrl = 'http://localhost:8080/walletwatch/user'; 
  
    constructor(private http: HttpClient) { }
    
    getUserById(userId: string): Observable<IUserModel> {
      return this.http.get<IUserModel>(`${this.baseUrl}`);
    }
    addExpense(user: IUserModel): Observable<IUserModel> {
    return this.http.post<IUserModel>(this.baseUrl, user);
    }
   /* updateUser(userId: string, user: IUserModel): Observable<IUserModel> {
      return this.http.put<IUserModel>(`${this.baseUrl}`);
    }*/
    deleteUser(userId: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${userId}`);
    }
  
}
