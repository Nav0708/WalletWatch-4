import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  // Sample data for expenses
  expenses = [
    { date: '10/09/24', category: 'Food', amount: 10, description: 'Pizza' },
    { date: '10/08/24', category: 'Rent', amount: 20, description: 'October Rent' },
    { date: '10/05/24', category: 'Personal', amount: 50, description: 'Self Gifting' },
    { date: '10/02/24', category: 'Entertainment', amount: 100, description: 'Movie' },
    { date: '10/01/24', category: 'Transportation', amount: 5, description: 'Orca' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Logic to load expenses, if needed
  }

  // Edit expense method
  onEdit(expense: any): void {
    console.log('Edit Expense:', expense);
    // You can open an edit modal or navigate to an edit page
  }

  // Delete expense method
  onDelete(expense: any): void {
    const index = this.expenses.indexOf(expense);
    if (index !== -1) {
      this.expenses.splice(index, 1); // Remove the selected expense
    }
    console.log('Deleted Expense:', expense);
  }

  // View receipt or additional details method
  onViewReceipt(expense: any): void {
    console.log('View receipt for:', expense);
    // Logic for viewing receipt or additional information
  }
}
