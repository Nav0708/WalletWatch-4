import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBudget } from '../interfaces/IBudget';  // Correct import path


@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:5000/api/budget';  // Adjust with the actual backend URL

  constructor(private http: HttpClient) { }

  // Example method to get a budget by userId
  getBudget(userId: string): Observable<IBudget> {
    return this.http.get<IBudget>(`${this.apiUrl}/${userId}`);
  }

  // Add other methods as needed for your application
}
