import { Component } from '@angular/core';
import { IUsers } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent {

  users: IUsers[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    //this.users = this.userService.getUsers();
    this.userService.getUsers().subscribe(
      (users) => (this.users = users),
      () => console.error(`Error retrieving contacts from ${this.userService.baseUrl}`),
      () => console.log(`Retrieved contacts from ${this.userService.baseUrl}`)
    );
  }
}
