import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'assets/default-avatar.png'
  };
}
