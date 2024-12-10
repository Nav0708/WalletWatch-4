import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from '../services/expenses.service';
import { AuthService } from '../services/auth.service';
import { IExpenseModel } from '../interfaces/IExpense';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenses: IExpenseModel[] = [];
  categories: string[] = ['Food', 'Rent', 'Personal', 'Entertainment', 'Transportation'];
  currentExpense: IExpenseModel = {
    expenseId: '',
    amount: 0,
    categoryName: '',
    date: new Date(),
    description: '',
    userId: '',
  };
  editing: boolean = false;
  userId: string = '';
 
  constructor(
    private expenseService: ExpensesService,
    private authService: AuthService,
    public datePipe: DatePipe,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.authService.getUser().subscribe((response: any) => {
          const userId = response?.id; // Ensure you extract the correct property from the response
          if (userId) {
            this.userId = userId; // Assign userId to the component property
            this.fetchExpenses(userId);
          }
        });
      } else {
        console.log('User is not logged in');
      }
    });
  }
  
  
 
  fetchExpenses(userId: string): void {
    this.expenseService.getExpensesByUserId(userId).subscribe(
      (data: IExpenseModel[]) => {
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }
 
  fetchExpenseById(expenseId: string): void {
    if (expenseId) {
      this.router.navigate(['/expenses', expenseId]); // Navigates to the expense details page
    } else {
      console.error('Expense ID is required to fetch details.');
    }
  }
  
  onSubmit(): void {
    this.currentExpense.userId = this.userId; // Attach userId to expense
    this.expenseService.addExpense(this.currentExpense).subscribe(
      () => {
        this.fetchExpenses(this.userId);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }
 
  deleteExpense(expenseId: string): void {
    this.expenseService.deleteExpense(expenseId).subscribe(
      () => {
        this.fetchExpenses(this.userId);
      },
      (error) => {
        console.error('Error deleting expense:', error);
      }
    );
  }
 
  resetForm(): void {
    this.currentExpense = {
      expenseId: '',
      amount: 0,
      categoryName: '',
      date: new Date(),
      description: '',
      userId: '',
    };
    this.editing = false;
  }
}
 