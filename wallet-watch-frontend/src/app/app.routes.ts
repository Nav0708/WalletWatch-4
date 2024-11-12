import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetComponent } from './budget/budget.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemindersComponent } from './reminders/reminders.component';

export const routes: Routes = [
  { path: '', component:HomepageComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expenses/:id', component: ExpensesComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'budget/:id', component: BudgetComponent },
  { path: 'reminders', component: RemindersComponent },
  { path: 'reminders/:id', component: RemindersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
