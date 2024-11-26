import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';  

 
Chart.register(...registerables);
 
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {
 
  @ViewChild('barGraph', { static: false }) barGraph!: ElementRef;
 
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const ctx = this.barGraph.nativeElement.getContext('2d');  
 
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',  
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],  
            datasets: [{
              label: 'Expenses ($)',  
              data: [100, 200, 150, 300, 250],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',  
              borderColor: 'rgba(75, 192, 192, 1)',  
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
      }
    }
  }
}