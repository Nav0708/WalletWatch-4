import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExpensesService } from '../services/expenses.service';
import { UserService } from '../services/user.service';
import { IExpenseModel } from '../interfaces/IExpense';
import { FormsModule } from '@angular/forms';
import { ICategoryModel } from '../interfaces/ICategory';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for unique ID generation
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';



 
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
    private router: Router,
    private route: ActivatedRoute) {}
 
  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const userId = this.authService.getUser();  // Get the current userId from AuthService
        console.log('Logged in as:', userId);
        if (userId) {
          this.fetchExpenses(userId);  // Fetch expenses for the logged-in user
        }
      } else {
        console.log('User is not logged in');
      }
    });
  }
 
  // Fetch all expenses
  fetchExpenses(userId: string): void {
      console.log('Fetching expenses...');
      this.expenseService.getExpensesByUserId(userId).subscribe(
        (data: IExpenseModel[]) => {
          console.log('Expenses fetched successfully:', data);
          this.expenses = data;
        },
        (error) => {
          console.error('Error fetching expenses:', error);
        }
      );
    }
 
  // Add or update an expense
  onSubmit(): void {
    const userId = this.authService.getUser();  // Get the current userId from AuthService
    if (userId) {
      this.currentExpense.userId = userId;  // Associate the expense with the logged-in user
      this.expenseService.addExpense(this.currentExpense).subscribe(
        () => {
          console.log('Expense added successfully');
          this.fetchExpenses(userId);  // Refresh the list of expenses after adding
        },
        (error) => {
          console.error('Error adding expense:', error);
        }
      );
    }
  }
  logout(): void {
    this.authService.logout();  // Log the user out through AuthService
  }

 
  //Edit an expense
  editExpense(expense: IExpenseModel): void {
    const formattedDate = this.datePipe.transform(expense.date, 'yyyy-MM-dd');
    if (formattedDate) {
      this.currentExpense = { ...expense,date: formattedDate }; // Ensure date is in the correct format
    }
    // Navigate to the route with the expense ID
    console.log('expense : '+ expense.expenseId);
    this.router.navigate(['/expenses', expense.expenseId]);
    this.editing = true;
  }

  // Delete an expense
  deleteExpense(expenseId: string): void {
    console.log(expenseId);
    this.expenseService.deleteExpense(expenseId).subscribe(
      () => {
        console.log('Expense deleted successfully');
      },
      (error) => {
        console.error('Error deleting expense:', error);
      }
    );
  }

  fetchExpenseById(expenseId: string): void {
    this.router.navigate(['/expenses', expenseId]); // Navigate to the details component
  }

  resetForm(): void {
    this.currentExpense = {
      expenseId: '',
      amount: 0,
      categoryName: '',
      date: '',
      description: '',
      userId: '',
    };
    this.editing = false;
  }
}