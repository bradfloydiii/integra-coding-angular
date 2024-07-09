import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent {
  users: IUsers[] = [];

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    //this.users = this.userService.getUsers();
    this.userService.getUsers().subscribe(
      (users) => (this.users = users),
      () =>
        console.error(
          `Error retrieving user(s) from ${this.userService.baseUrl}`
        ),
      () => console.log(`Retrieved user(s) from ${this.userService.baseUrl}`)
    );
  }

  updateUser(user: IUsers): void {
    this.router.navigate(['/user/create', {user: JSON.stringify(user)}]);
  }


  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      () => (this.users = this.users.filter((u) => u._id !== id)),
      () => console.error(`Error deleting user with id ${id}`),
      () => console.log(`Deleted user with id ${id}`)
    );
  }
}
