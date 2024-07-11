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
  isError = false;
  errorMessage = '';

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (error) => {this.isError = true; this.errorMessage = error?.message},
    });
  }

  updateUser(user: IUsers): void {
    this.router.navigate(['/user/create', { user: JSON.stringify(user) }]);
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      error: (error) => {this.isError = true; this.errorMessage = error?.message},
      complete: () => this.users = this.users.filter((user) => user.id !== id)
    });
  }
}
