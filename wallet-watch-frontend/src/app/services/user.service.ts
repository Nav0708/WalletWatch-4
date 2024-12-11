import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserModel } from '../interfaces/IUser';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../../environments/environment';  // Import the environment configuration

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private baseUrl = environment.hostUrl+'/user';/****Changing this as a part of Azure config*****/ 
    private expenseUrl = environment.hostUrl+'/walletwatch/expenses';/****Changing this as a part of Azure config*****/
  
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

    deleteUser(userId: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${userId}`);
    }
}
