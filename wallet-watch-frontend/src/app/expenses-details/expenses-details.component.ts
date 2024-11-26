import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IExpenseModel } from '../interfaces/IExpense';
import { ExpensesService } from '../services/expenses.service';
import { DatePipe } from '@angular/common';
 

@Component({
  selector: 'app-expenses-details',
  templateUrl: './expenses-details.component.html',
  styleUrls: ['./expenses-details.component.css']
})
export class ExpensesDetailsComponent implements OnInit {
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

  constructor(private expenseService: ExpensesService, public datePipe: DatePipe, private router: Router,private route: ActivatedRoute) {}
 

  ngOnInit(): void {
    const expenseId = this.route.snapshot.paramMap.get('id');
    console.log('hihi');
    console.log(expenseId);
    console.log('hihi');
    if (expenseId) {
      this.fetchExpense(expenseId); // Fetch data using the ID


    }
  }

  fetchExpense(expenseId: string): void {
    this.expenseService.getExpenseById(expenseId).subscribe(
      (data: IExpenseModel) => {
        console.log('Expense fetched successfully:', data);
        const formattedDate = this.datePipe.transform(data.date, 'yyyy-MM-dd');
        if (formattedDate) {
          this.currentExpense = { ...data, date: formattedDate };
        }
      },
      (error) => {
        console.error('Error fetching expense:', error);
      }
    );
  }
}
