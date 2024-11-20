import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BudgetService } from '../services/budget.service';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgets = [
    { month: '2024-10', category: 'Food', amount: 500 },
    { month: '2024-10', category: 'Rent', amount: 1200 },
    { month: '2024-10', category: 'Transportation', amount: 100 }
  ];

  constructor() { }

  ngOnInit(): void {
    // Logic to load budgets, if needed
  }

  onEdit(budget: any): void {
    console.log('Edit Budget:', budget);
    // You can open an edit modal or navigate to an edit page
  }

  onDelete(budget: any): void {
    const index = this.budgets.indexOf(budget);
    if (index !== -1) {
      this.budgets.splice(index, 1); // Remove the selected budget
    }
    console.log('Deleted Budget:', budget);
  }
}