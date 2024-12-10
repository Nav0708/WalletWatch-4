import { Injectable } from '@angular/core';
import { IExpenseModel } from '../interfaces/IExpense';  
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Import the environment

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private baseUrl = environment.hostUrl;  // Use the URL from environment

  constructor(private http: HttpClient) { }

  getAllExpenses(): Observable<IExpenseModel[]> {
    return this.http.get<IExpenseModel[]>(this.baseUrl);  // URL from environment
  }

  getExpenses(): Observable<IExpenseModel[]> {
    return this.http.get<IExpenseModel[]>(this.baseUrl, { withCredentials: true });  // Use baseUrl
  }

  addExpense(expense: IExpenseModel): Observable<IExpenseModel> {
    return this.http.post<IExpenseModel>(this.baseUrl, expense, { withCredentials: true });  // Use baseUrl
  }

  deleteExpense(expenseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${expenseId}`, { withCredentials: true });  // Use baseUrl
  }

  getExpensesByUserId(userId: string): Observable<IExpenseModel[]> {
    return this.http.get<IExpenseModel[]>(`${this.baseUrl}/user/${userId}`, { withCredentials: true });  // Use baseUrl
  }

  getExpenseById(expenseId: string): Observable<IExpenseModel> {
    return this.http.get<IExpenseModel>(`${this.baseUrl}/${expenseId}`, { withCredentials: true });  // Use baseUrl
  }
}
