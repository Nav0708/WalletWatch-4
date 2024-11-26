import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../services/expenses.service';
import { IExpenseModel } from '../interfaces/IExpense';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses-details',
  templateUrl: './expenses-details.component.html',
  styleUrls: ['./expenses-details.component.css'],
  providers: [DatePipe],
  imports: [FormsModule, CommonModule], // Include FormsModule here
  standalone: true,
})
export class ExpensesDetailsComponent implements OnInit {
  categories: string[] = ['Food', 'Rent', 'Personal', 'Entertainment', 'Transportation'];
  currentExpense: IExpenseModel = {
    expenseId: '',
    amount: 0,
    categoryName: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    description: '',
    userId: '100',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpensesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Fetch the expense ID from the route
    const expenseId = this.route.snapshot.paramMap.get('id');
    if (expenseId) {
      this.loadExpense(expenseId);
    }
  }

  // Fetch the expense by ID
  loadExpense(expenseId: string): void {
    this.expenseService.getExpenseById(expenseId).subscribe(
      (data: IExpenseModel) => {
        const formattedDate = this.datePipe.transform(data.date, 'yyyy-MM-dd');
        if (formattedDate) {
          this.currentExpense = { ...data, date: formattedDate };
        }
      },
      (error) => {
        console.error('Error loading expense:', error);
      }
    );
  }

  fetchExpenseById(expenseId: string): void {
    this.expenseService.getExpenseById(expenseId).subscribe(
      (expense: IExpenseModel) => {
        console.log('Expense fetched:', expense);
        const formattedDate = this.datePipe.transform(expense.date, 'yyyy-MM-dd');
        if (formattedDate) {
          this.currentExpense = { ...expense, date: formattedDate };
        }
      },
      (error) => {
        console.error('Error fetching expense:', error);
      }
    );
  }
  
  // Save the changes
  saveExpense(): void {
    // if (this.currentExpense) {
    //   this.expenseService.updateExpense(this.currentExpense).subscribe(
    //     () => {
    //       console.log('Expense updated successfully');
    //       this.router.navigate(['/expenses']); // Navigate back to the list
    //     },
    //     (error) => {
    //       console.error('Error updating expense:', error);
    //     }
    //   );
    }
  

  // Cancel editing
  cancel(): void {
    this.router.navigate(['/expenses']); // Navigate back to the list
  }
}
