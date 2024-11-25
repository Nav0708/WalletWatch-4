import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesDetailsComponent } from './expenses-details.component';

describe('ExpensesDetailsComponent', () => {
  let component: ExpensesDetailsComponent;
  let fixture: ComponentFixture<ExpensesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
