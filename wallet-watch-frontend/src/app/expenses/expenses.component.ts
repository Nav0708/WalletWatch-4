import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpensesService } from '../services/expenses.service';
import { IExpenseModel } from '../interfaces/IExpense';
import { FormsModule } from '@angular/forms';
import { ICategoryModel } from '../interfaces/ICategory';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenses: IExpenseModel[] = [];
  currentExpense: IExpenseModel ={
    expenseId: '',
    amount: 0,
    categoryId: '',  // Bind to this field
    date: new Date(),
    description: '',
    userId: ''
  };
  categories: ICategoryModel[] = [];
  editing: boolean = false;
  constructor(private expenseService: ExpensesService) {}

  ngOnInit(): void {
    console.log('ngOnInit - ExpensesComponent');
    this.fetchExpenses();
  }

  // Fetch all expenses
  fetchExpenses(): void {
    console.log('Fetching expenses...');
    this.expenseService.getAllExpenses().subscribe(
      (data: any) => {
        console.log('Expenses fetched successfully:', data);  // Log successful data fetch
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching expenses:', error);  // Log error if fetching fails
      }
    );
  }
  fetchCategories(): void {
    // Assume you have a service method to fetch categories
    this.expenseService.getCategories().subscribe((data: ICategoryModel[]) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.editing) {
      // Update existing expense
      this.expenseService
        .updateExpense(this.currentExpense.expenseId!, this.currentExpense)
        .subscribe(() => {
          this.fetchExpenses();
          this.currentExpense = this.resetExpense();
          this.editing = false;
        });
    } else {
      // Add new expense
      this.expenseService.addExpense(this.currentExpense).subscribe(() => {
        this.fetchExpenses();
        this.currentExpense = this.resetExpense();
      });
    }
  }
    // Edit an expense
  editExpense(expense: IExpenseModel): void {
    this.currentExpense = { ...expense };
    this.editing = true;
  }

  // Delete an expense
  deleteExpense(expenseId: string): void {
    this.expenseService.deleteExpense(expenseId).subscribe(() => {
      this.fetchExpenses();
    });
  }

  // Reset the currentExpense object
  private resetExpense(): IExpenseModel {
    return {
      expenseId: '',
      amount: 0,
      categoryId: '',
      date: new Date(),
      description: '',
      userId: '',
    };
  }
}

