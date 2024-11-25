import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpensesService } from '../services/expenses.service';
import { IExpenseModel } from '../interfaces/IExpense';
import { FormsModule } from '@angular/forms';
import { ICategoryModel } from '../interfaces/ICategory';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for unique ID generation
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./expenses.component.css'],
  providers: [DatePipe],
})
export class ExpensesComponent implements OnInit {
  expenses: IExpenseModel[] = [];
  categories: ICategoryModel[] = [];
  currentExpense: IExpenseModel = {
    expenseId: '',
    amount: 0,
    categoryName: '',
    date: new Date(),
    description: '',
    userId: '100',
  };
  editing: boolean = false;
 
  constructor(private expenseService: ExpensesService, public datePipe: DatePipe, private router: Router,private route: ActivatedRoute){}
 
  ngOnInit(): void {
    console.log('ngOnInit - ExpensesComponent');
    this.fetchExpenses();
    this.fetchCategories();
 
    // Check for route parameter
    this.route.params.subscribe((params) => {
      const expenseId = params['id'];
      if (expenseId) {
        this.fetchExpenseById(expenseId);
      }
    });
  }
 
//   // Fetch all expenses
//   fetchExpenses(): void {
//   console.log('Fetching expenses...');
//   this.expenseService.getAllExpenses().subscribe(
//     (data: IExpenseModel[]) => {
//       console.log('Expenses fetched successfully:', data);
//       this.expenses = data;
//     },
//     (error) => {
//       console.error('Error fetching expenses:', error);
//     }
//   );
// }
 
 
fetchExpenses(): void {
  console.log('Fetching expenses...');
  this.expenseService.getAllExpenses().subscribe(
    (data: IExpenseModel[]) => {
      console.log('Expenses fetched successfully:', data);
      // Ensure consistent date handling
      this.expenses = data.map(expense => {
        if (typeof expense.date === 'string') {
          const utcDate = new Date(expense.date); // Parse as UTC
          const localDate = new Date(
            utcDate.getUTCFullYear(),
            utcDate.getUTCMonth(),
            utcDate.getUTCDate()
          ); // Convert to local date
          expense.date = localDate;
        }
        return expense;
      });
    },
    (error) => {
      console.error('Error fetching expenses:', error);
    }
  );
}
 
  // Fetch all categories
  fetchCategories(): void {
    console.log('Fetching categories...');
    this.expenseService.getCategories().subscribe(
      (data: ICategoryModel[]) => {
        console.log('Categories fetched successfully:', data);
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
 
  // Add or update an expense
  onSubmit(): void {
    if (this.editing) {
      // Update existing expense
      this.expenseService
        .updateExpense(this.currentExpense.expenseId!, this.currentExpense)
        .subscribe(
          () => {
            console.log('Expense updated successfully');
            this.fetchExpenses();
            this.resetForm();
          },
          (error) => {
            console.error('Error updating expense:', error);
          }
        );
    } else {
      // Add new expense
      this.currentExpense.expenseId = uuidv4(); // Generate unique ID
      this.expenseService.addExpense(this.currentExpense).subscribe(
        () => {
          console.log('Expense added successfully');
          this.fetchExpenses();
          this.resetForm();
        },
        (error) => {
          console.error('Error adding expense:', error);
        }
      );
    }
  }
 
  // // Edit an expense
  // editExpense(expense: IExpenseModel): void {
  //   this.currentExpense = { ...expense };
  //   this.editing = true;
  // }
 
  // Fetch a single expense by ID
  fetchExpenseById(expenseId: string): void {
    this.expenseService.getExpenseById(expenseId).subscribe(
      (data: IExpenseModel) => {
        console.log('Expense fetched successfully:', data);
        const formattedDate = this.datePipe.transform(data.date, 'yyyy-MM-dd');
        if (formattedDate) {
          this.currentExpense = { ...data, date: formattedDate };
        }
        this.editing = true;
 
        const modalElement = document.getElementById('addExpenseModal');
        if (modalElement) {
          const modal = new (window as any).bootstrap.Modal(modalElement);
          modal.show();
        }
        this.resetForm();
      },
      (error) => {
        console.error('Error fetching expense:', error);
      }
    );
  }
  // Edit an expense
  editExpense(expense: IExpenseModel): void {
    // Ensure the date is formatted as 'yyyy-MM-dd' for the input type="date"
    //this.currentExpense = { ...expense };
    const formattedDate = this.datePipe.transform(expense.date, 'yyyy-MM-dd');
    if (formattedDate) {
      this.currentExpense = { ...expense, date: formattedDate }; // Ensure date is in the correct format
    }
    // Navigate to the route with the expense ID
    this.router.navigate(['/expenses', expense.expenseId]);
    this.editing = true;
 
    const modalElement = document.getElementById('addExpenseModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }
 
  // Delete an expense
  deleteExpense(expenseId: string): void {
    this.expenseService.deleteExpense(expenseId).subscribe(
      () => {
        console.log('Expense deleted successfully');
        this.fetchExpenses();
      },
      (error) => {
        console.error('Error deleting expense:', error);
      }
    );
  }
 
  // Reset the form
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
 