import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetComponent } from './budget/budget.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemindersComponent } from './reminders/reminders.component';
import { provideHttpClient } from '@angular/common/http';
import { TodoproxyService } from './todoproxy.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const routes: Routes = [
  { path: '', component:HomepageComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expenses/:expenseId', component: ExpensesComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'budget/:id', component: BudgetComponent },
  { path: 'reminders', component: RemindersComponent },
  { path: 'reminders/:id', component: RemindersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[provideHttpClient(), TodoproxyService, provideAnimationsAsync()]
})

export class AppRoutingModule {
}
