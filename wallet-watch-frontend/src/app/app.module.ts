// Import Angular Core and Browser modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

// Import Routing Module
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemindersComponent } from './reminders/reminders.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';

// Import Application Services
import { ExpensesService } from './services/expenses.service'; // Expenses Service
import { ReminderService } from './services/reminder.service'; // Reminders Service
import { BudgetService } from './services/budget.service'; // Budget Service
import { HomepageService } from './services/homepage.service'; // Homepage Service

// Import Angular Material Components
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; // Import MatTooltipModule

// Import Application Components
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BudgetComponent,
    ExpensesComponent,
    HomepageComponent,
    RemindersComponent,
    FooterComponent,
    ProfileComponent // Add ProfileComponent here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule, // Correct import for HTTP functionality
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule // Include Tooltip module here
  ],
  providers: [
    ExpensesService,  // Expenses Service
    ReminderService, // Reminders Service
    BudgetService,    // Budget Service
    HomepageService,   // Homepage Service
    DatePipe           // Provide DatePipe here
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
