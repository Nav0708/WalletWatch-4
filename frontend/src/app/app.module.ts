import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemindersComponent } from './reminders/reminders.component';

import { TodoproxyService } from './todoproxy.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    ExpensesComponent,
    HomepageComponent,
    RemindersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [provideHttpClient(), TodoproxyService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }