import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart when selection changes', () => {
    const updateSpy = spyOn(component, 'updateChart');
    
    // Manually update the properties
    component.selectedDate = '2024-10';
    component.selectedCategory = 'Food';
    
    // Create a mock SimpleChanges object
    const changes: any = {
      selectedDate: { currentValue: '2024-10', previousValue: '', firstChange: true, isFirstChange: () => true },
      selectedCategory: { currentValue: 'Food', previousValue: '', firstChange: true, isFirstChange: () => true }
    };
    
    // Call ngOnChanges with the mock changes
    component.ngOnChanges(changes);
    
  
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should initialize the bar chart', () => {
    const chartSpy = spyOn(Chart, 'getChart');
    component.createBarChart();
    expect(chartSpy).toHaveBeenCalled();
  });
});
