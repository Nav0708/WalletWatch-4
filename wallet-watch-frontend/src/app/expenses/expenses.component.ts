import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from '../services/expenses.service';
import { AuthService } from '../services/auth.service';
import { IExpenseModel } from '../interfaces/IExpense';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { request } from 'https';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenses: IExpenseModel[] = [];  // List to store all expenses
  categories: string[] = ['Food', 'Rent', 'Personal', 'Entertainment', 'Transportation'];
  currentExpense: IExpenseModel = {
    expenseId: '',
    amount: 0,
    categoryName: '',
    date: new Date(),
    description: '',
    userId: '',  // Will be set dynamically
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
    // Subscribe to the logged-in status to ensure user is authenticated
    this.authService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // Fetch user data after login to get the userId
        this.authService.getUser().subscribe((req: any) => {
          const userId = req.userId; // Extract userId from the response
          console.log('user id expenses ::: ',userId);
          if (userId) {
            this.userId = userId; // Store the userId in the component property
            this.fetchExpenses(userId); // Fetch expenses based on the userId
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
        console.log('expenses data all ----:',data);
        this.expenses = data;  // Store the expenses for the user
        console.log('expenses data all :',this.expenses);
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }
  

  // Navigate to a specific expense details page using expenseId
  fetchExpenseById(expenseId: string): void {
    if (expenseId) {
      this.router.navigate(['/expenses', expenseId]); // Navigates to the expense details page
    } else {
      console.error('Expense ID is required to fetch details.');
    }
  }

  // fetchExpenseById(expenseId: string): void {
  //   this.expenseService.getExpenseById(expenseId).subscribe(
  //     (data: IExpenseModel) => {
  //       console.log('Fetched expense:', data); // Log the fetched expense for verification
  //       // Do something with the fetched expense, e.g., display it in a modal
  //       this.currentExpense = data; // Assign the fetched expense to a variable
  //     },
  //     (error) => {
  //       console.error('Error fetching expense:', error);
  //     }
  //   );
  // }
  

  // Handle form submission for adding a new expense
  onSubmit(): void {
    // Attach the userId to the current expense
    this.currentExpense.userId = this.userId;

    // Call the service to add the expense
    this.expenseService.addExpense(this.currentExpense).subscribe(
      () => {
        this.fetchExpenses(this.userId); // Fetch the updated list of expenses after adding
        this.resetForm(); // Reset the form fields
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }

  // Delete an expense by expenseId
  deleteExpense(expenseId: string): void {
    this.expenseService.deleteExpense(expenseId).subscribe(
      () => {
        this.fetchExpenses(this.userId); // Refresh the expenses after deletion
      },
      (error) => {
        console.error('Error deleting expense:', error);
      }
    );
  }

  // Reset the form to initial values
  resetForm(): void {
    this.currentExpense = {
      expenseId: '',
      amount: 0,
      categoryName: '',
      date: new Date(),
      description: '',
      userId: '',  // Reset userId
    };
    this.editing = false;
  }
}
