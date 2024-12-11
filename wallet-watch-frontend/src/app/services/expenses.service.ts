import { Injectable } from '@angular/core';
import { IExpenseModel } from '../interfaces/IExpense';  
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ICategoryModel } from '../interfaces/ICategory';
import { IUserModel } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private baseUrl = 'http://localhost:8080/walletwatch/expenses'; 

  constructor(private http: HttpClient) { }
  
  getAllExpenses(): Observable<IExpenseModel[]> {
    return this.http.get<IExpenseModel[]>(this.baseUrl);




  }
  getExpenses() {
    return this.http.get('http://localhost:8080/walletwatch/expenses', { withCredentials: true });

  }

  // addExpense(expense: any) {
  //   return this.http.post<any>('http://localhost:8080/walletwatch/expenses', expense, { withCredentials: true  });
  // }

  addExpense(expense: any) {
    return this.http.post<string>(
      'http://localhost:8080/walletwatch/expenses',
      expense,
      { withCredentials: true, responseType: 'text' as 'json' }
    );
  }
  
  // addExpense(expense: IExpenseModel): Observable<IExpenseModel> {
  //   return this.http.post<IExpenseModel>(`${this.baseUrl}/expenses`, expense);
  // }

  updateExpense(expenseId: string, updatedExpense: any): Observable<any> {
    const apiUrl = `http://localhost:8080/walletwatch/expenses/${expenseId}`;
    return this.http.put(apiUrl, updatedExpense, { withCredentials: true });
  }
  

  deleteExpense(expenseId: string): Observable<any> {
    const apiUrl = `http://localhost:8080/walletwatch/expenses/${expenseId}`;
    return this.http.delete(apiUrl, { withCredentials: true });
  }
  

    getExpensesByUserId(userId: string) {
      console.log('get expenses by id ')
      return this.http.get<IExpenseModel[]>(
        `http://localhost:8080/walletwatch/expenses/user/${userId}`,
        { withCredentials: true } 
      );
    }

    getExpenseById(expenseId: string) {
      return this.http.get<IExpenseModel>(
        `http://localhost:8080/walletwatch/expenses/${expenseId}`,
        { withCredentials: true }
      );
    }
    
    
  }
