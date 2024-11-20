import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { HomepageService } from '../services/homepage.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnChanges {
  selectedDate: string = '';
  selectedCategory: string = 'Food';
  barChart: any;

  constructor() { }

  ngOnInit(): void {
    // Check if window is defined (to ensure this is running in the browser )
    if (typeof window !== 'undefined') {
      this.createBarChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedDate && this.selectedCategory) {
      this.updateChart();
    }
  }

  createBarChart(): void {
    if (typeof document !== 'undefined') {  // Check if document is available
      const ctx = document.getElementById('barGraph') as HTMLCanvasElement;
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Expenses',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  updateChart(): void {
    const data = this.getDataForChart();
    if (this.barChart) {
      this.barChart.data.datasets[0].data = data;
      this.barChart.update();
    }
  }

  getDataForChart(): number[] {
    // Mock data based on selected category and date
    return [100, 200, 150, 300, 250]; // Replace with real data fetching logic
  }
}
