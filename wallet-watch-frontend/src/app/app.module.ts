import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemindersComponent } from './reminders/reminders.component';

import { TodoproxyService } from './todoproxy.service';
import { ExpensesService } from './services/expenses.service'; // Expenses Service
import { ReminderService } from './services/reminder.service'; // Reminders Service
import { BudgetService } from './services/budget.service'; // Budget Service
import { HomepageService } from './services/homepage.service'; // Homepage Service
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    ExpensesComponent,
    HomepageComponent,
    RemindersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule, // Correct import for HTTP functionality
    AppRoutingModule,
    RouterModule, // RouterModule should be configured if you have routes
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [
    TodoproxyService, // Proxy service for ToDo (if applicable)
    ExpensesService,  // Expenses Service
    ReminderService, // Reminders Service
    BudgetService,    // Budget Service
    HomepageService   // Homepage Service
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
