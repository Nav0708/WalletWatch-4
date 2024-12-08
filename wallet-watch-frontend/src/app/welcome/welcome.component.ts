import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  userId: string | null = null; // Property to hold the user ID

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch the user ID from AuthService
    //this.userId = this.userService.getUserById();
  }
}