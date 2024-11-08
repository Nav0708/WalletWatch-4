import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesComponent } from './expenses.component';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have expenses data', () => {
    expect(component.expenses.length).toBeGreaterThan(0);
  });

  it('should delete an expense', () => {
    const initialCount = component.expenses.length;
    component.onDelete(component.expenses[0]);
    expect(component.expenses.length).toBe(initialCount - 1);
  });

  it('should log expense for edit', () => {
    const spy = spyOn(console, 'log');
    component.onEdit(component.expenses[0]);
    expect(spy).toHaveBeenCalledWith('Edit Expense:', component.expenses[0]);
  });

  it('should log expense for receipt', () => {
    const spy = spyOn(console, 'log');
    component.onViewReceipt(component.expenses[0]);
    expect(spy).toHaveBeenCalledWith('View receipt for:', component.expenses[0]);
  });
});
