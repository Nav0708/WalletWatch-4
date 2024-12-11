import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBudget } from '../interfaces/IBudget'; // Ensure correct import path
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080/walletwatch/budget';
  //private baseUrl = environment.hostUrl; // Adjust this to match your backend URL

  constructor(private http: HttpClient) {}

  // Method to get all budgets
  getAllBudgets(): Observable<IBudget[]> {
    return this.http.get<IBudget[]>(this.baseUrl);
  }

  // Method to get budgets by user ID
  getBudgetsByUserId(userId: string): Observable<IBudget[]> {
    return this.http.get<IBudget[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Method to get budgets by category
  getBudgetsByCategory(category: string): Observable<IBudget[]> {
    return this.http.get<IBudget[]>(`${this.baseUrl}/category/${category}`);
  }

  // Method to get budgets within a specific date range
  getBudgetsByDateRange(startDate: string, endDate: string): Observable<IBudget[]> {
    return this.http.get<IBudget[]>(`${this.baseUrl}/date?start=${startDate}&end=${endDate}`);
  }

  // Method to add a new budget
  addBudget(budget: IBudget): Observable<IBudget> {
    return this.http.post<IBudget>(this.baseUrl, budget);
  }

  // Method to delete a budget
  deleteBudget(budgetId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${budgetId}`);
  }

  // Method to count the total number of budget entries
  getBudgetCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
