import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import copydeck from 'src/assets/properties/properties';


@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent {
  users: IUsers[] = [];
  isError = false;
  errorMessage = '';

  updateUserTitle = copydeck.titles.userUpdate;
  deleteUserTitle = copydeck.titles.userDelete;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: () => {this.isError = true; this.errorMessage = copydeck.responses.databaseError},
    });
  }

  updateUser(user: IUsers): void {
    this.router.navigate(['/user/create', { user: JSON.stringify(user) }]);
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      error: () => {this.isError = true; this.errorMessage = copydeck.responses.userDeletedError},
      complete: () => this.users = this.users.filter((user) => user.id !== id)
    });
  }
}
