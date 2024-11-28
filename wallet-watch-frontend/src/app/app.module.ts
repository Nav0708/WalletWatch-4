// Import Angular Core and Browser modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
 
// Import Routing Module
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemindersComponent } from './reminders/reminders.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

 
 
// Import Application Services
import { ExpensesService } from './services/expenses.service'; // Expenses Service
import { ReminderService } from './services/reminder.service'; // Reminders Service
import { BudgetService } from './services/budget.service'; // Budget Service
import { HomepageService } from './services/homepage.service'; // Homepage Service
import { RouterModule } from '@angular/router';
 
// Import Application Components
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
 
@NgModule({
  declarations: [
    // Declarations: Define components, directives, and pipes that belong to this module
    AppComponent,
    WelcomeComponent,
    BudgetComponent,
    ExpensesComponent,
    HomepageComponent,
    RemindersComponent,
    FooterComponent
  ],
  // Imports: Specify external modules required in the application
  imports: [
    BrowserModule,
    FormsModule,
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
    FormsModule,
    DatePipe
  ],
  exports: [FooterComponent],
  // Providers: Register services for dependency injection
  providers: [
    ExpensesService,  // Expenses Service
    ReminderService, // Reminders Service
    BudgetService,    // Budget Service
    HomepageService   // Homepage Service
  ],
  // Bootstrap: Specify the root component to bootstrap the application
  bootstrap: [AppComponent]
})
export class AppModule { }
