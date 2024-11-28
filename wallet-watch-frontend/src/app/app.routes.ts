import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemindersComponent } from './reminders/reminders.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ExpensesDetailsComponent } from './expenses-details/expenses-details.component';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';
import { LoginComponent } from './login/login.component';
 
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root to login
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '**', redirectTo: 'login' }, // Redirect unknown routes to login
  { path: 'homepage', component:HomepageComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expenses/:expenseId', component: ExpensesDetailsComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'budget/:id', component: BudgetDetailsComponent },
  { path: 'reminders', component: RemindersComponent },
  { path: 'reminders/:id', component: RemindersComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[provideHttpClient(),  provideAnimationsAsync()]
})
 
export class AppRoutingModule {
}
 