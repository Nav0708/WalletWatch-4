import { Injectable } from '@angular/core';
import { IExpenseModel } from '../interfaces/IExpense';  // Correct import path
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ICategoryModel } from '../interfaces/ICategory';



@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private baseUrl = 'http://localhost:8080/walletwatch/expenses'; // Update with your backend URL
  private categoryUrl = `${this.baseUrl}/categories`; 

  constructor(private http: HttpClient) { }
  
  getAllExpenses() {
    return this.http.get(this.baseUrl);  // <-- Using HttpClient here
  }
   //Fetch a specific expense by ID
  getExpenseById(expenseId: string): Observable<IExpenseModel> {
    return this.http.get<IExpenseModel>(`${this.baseUrl}/${expenseId}`);
  }
  // Fetch categories
  getCategories(): Observable<ICategoryModel[]> {
    return this.http.get<ICategoryModel[]>(this.categoryUrl);
  }
  // Add a new expense
  addExpense(expense: IExpenseModel): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.baseUrl, expense);
  }

  // Update an existing expense
  updateExpense(expenseId: string, expense: Partial<IExpenseModel>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${expenseId}`, expense);
  }

  // Delete an expense
  deleteExpense(expenseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${expenseId}`);
  }
}
