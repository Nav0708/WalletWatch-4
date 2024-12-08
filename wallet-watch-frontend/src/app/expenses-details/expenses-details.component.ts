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
  imports: [FormsModule, CommonModule],  // Include FormsModule here
  standalone: true,
})
export class ExpensesDetailsComponent implements OnInit {
  categories: string[] = ['Food', 'Rent', 'Personal', 'Entertainment', 'Transportation'];
  currentExpense: IExpenseModel = {
    expenseId: '',
    amount: 0,
    categoryName: '',
    date: new Date(),
    description: '',
    userId: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpensesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Extract the expenseId from the route and fetch the corresponding expense data
    this.route.paramMap.subscribe((params) => {
      const expenseId = params.get('expenseId');
      console.log('Expense ID from route:', expenseId);  // For debugging

      if (expenseId) {
        // Fetch the expense data using the extracted expenseId
        this.loadExpense(expenseId);
      } else {
        console.error('No expenseId found in route');
      }
    });
  }

  loadExpense(userId: string): void {
    this.expenseService.getExpensesByUserId(userId).subscribe(
      (response: any) => {  
        console.log('Fetched expense data:', response); 

        if (response && response['0']) {
          const data = response['0'];  
          console.log('No format date:', data.amount);

          // Check if the date exists and format it
          const formattedDate = this.datePipe.transform(data.date, 'yyyy-MM-dd');
          console.log('Formatted date:', formattedDate);

          // Update currentExpense with formatted date
          this.currentExpense = {
            ...data,
            date: formattedDate ? formattedDate : data.date,  // Fallback to original date if null
          };
          console.log('Updated expense data with formatted date:', this.currentExpense);
        } else {
          console.error('Invalid data format or no expense data found.');
        }
      },
      (error) => {
        console.error('Error fetching expense data:', error);
      }
    );
  }
  

  // Save the changes to the expense (if you need this functionality)
  saveExpense(): void {
    // this.expenseService.updateExpense(this.currentExpense).subscribe(
    //   () => {
    //     console.log('Expense updated successfully');
    //     this.router.navigate(['/expenses']); // Navigate back to the list
    //   },
    //   (error) => {
    //     console.error('Error updating expense:', error);
    //   }
    // );
  }

  // Cancel editing and navigate back to the list
  cancel(): void {
    this.router.navigate(['/expenses']);
  }
}
