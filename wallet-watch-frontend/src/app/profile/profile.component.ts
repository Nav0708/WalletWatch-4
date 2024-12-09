import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(
      (data) => {
        this.user = data;  // Store the user profile data
        this.authService.setUser(data);  // Update AuthService with user data
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }
}