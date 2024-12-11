import { Injectable } from '@angular/core';
import { IExpenseModel } from '../interfaces/IExpense';  
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ICategoryModel } from '../interfaces/ICategory';
import { IUserModel } from '../interfaces/IUser';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  //private baseUrl = 'http://localhost:8080/walletwatch/expenses'; 
  private baseUrl  = environment.hostUrl+'/walletwatch/expenses';/****Changing this as a part of Azure config*****/

  constructor(private http: HttpClient) { }
  
  getAllExpenses(): Observable<IExpenseModel[]> {
    return this.http.get<IExpenseModel[]>(this.baseUrl);
  }
  getExpenses() {
    return this.http.get(environment.hostUrl+'/walletwatch/expenses', { withCredentials: true });/****Changing this as a part of Azure config*****/

  }

  addExpense(expense: any) {
    return this.http.post<string>(
      environment.hostUrl+'/walletwatch/expenses',
      expense,
      { withCredentials: true, responseType: 'text' as 'json' }
    );/****Changing this as a part of Azure config*****/
  }
  
  updateExpense(expenseId: string, updatedExpense: any): Observable<any> {
    const apiUrl = environment.hostUrl+`/walletwatch/expenses/${expenseId}`;
    return this.http.put(apiUrl, updatedExpense, { withCredentials: true });
  }/****Changing this as a part of Azure config*****/
  

  deleteExpense(expenseId: string): Observable<any> {
    const apiUrl = environment.hostUrl+`/walletwatch/expenses/${expenseId}`;
    return this.http.delete(apiUrl, { withCredentials: true });
  }/****Changing this as a part of Azure config*****/
  

    getExpensesByUserId(userId: string) {
      console.log('get expenses by id ')
      return this.http.get<IExpenseModel[]>(
        environment.hostUrl+`/walletwatch/expenses/user/${userId}`,
        { withCredentials: true } 
      );
    }/****Changing this as a part of Azure config*****/

    getExpenseById(expenseId: string) {
      return this.http.get<IExpenseModel>(
        environment.hostUrl+`/walletwatch/expenses/${expenseId}`,
        { withCredentials: true }
      );
    }/****Changing this as a part of Azure config*****/
    
    
  }
