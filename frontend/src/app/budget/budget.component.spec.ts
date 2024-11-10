import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetComponent } from './budget.component';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have budgets data', () => {
    expect(component.budgets.length).toBeGreaterThan(0);
  });

  it('should delete a budget', () => {
    const initialCount = component.budgets.length;
    component.onDelete(component.budgets[0]);
    expect(component.budgets.length).toBe(initialCount - 1);
  });

  it('should log budget for edit', () => {
    const spy = spyOn(console, 'log');
    component.onEdit(component.budgets[0]);
    expect(spy).toHaveBeenCalledWith('Edit Budget:', component.budgets[0]);
  });
});
