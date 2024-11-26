import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExpensesService } from '../services/expenses.service';
import { IExpenseModel } from '../interfaces/IExpense';
import { FormsModule } from '@angular/forms';
import { ICategoryModel } from '../interfaces/ICategory';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for unique ID generation
import { DatePipe } from '@angular/common';
 
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
    userId: '100',
  };
  editing: boolean = false;
 
  constructor(private expenseService: ExpensesService, public datePipe: DatePipe, private router: Router,private route: ActivatedRoute) {}
 
  ngOnInit(): void {
    console.log('ngOnInit - ExpensesComponent');
    this.fetchExpenses();
  }
 
  // Fetch all expenses
  fetchExpenses(): void {
  console.log('Fetching expenses...');
  this.expenseService.getAllExpenses().subscribe(
    (data: IExpenseModel[]) => {
      console.log('all Expenses fetched successfully:', data);
      this.expenses = data;
    },
    (error) => {
      console.error('Error fetching expenses:', error);
    });
    }


  // fetchExpenseById(expenseId: string): void {
  //   this.expenseService.getExpenseById(expenseId).subscribe(
  //     (data: IExpenseModel) => {
  //       console.log('individual Expense fetched successfully:', data);
  //       const formattedDate = this.datePipe.transform(data.date, 'yyyy-MM-dd');
  //       if (formattedDate) {
  //         this.currentExpense = { ...data, date: formattedDate };
  //       }
  //       console.log('expense : '+ this.currentExpense.expenseId);
  //       this.router.navigate(['/expenses', this.currentExpense.expenseId]);
  //     },
  //     (error) => {
  //       console.error('Error fetching expense:', error);
  //     }
  //   );
  // }
 
  // Add or update an expense
  onSubmit(): void {

      this.currentExpense.expenseId = uuidv4();
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
 
  // // Edit an expense
  // editExpense(expense: IExpenseModel): void {
  //   this.currentExpense = { ...expense };
  //   this.editing = true;
  // }
 
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
      userId: '100',
    };
    this.editing = false;
  }
}