import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import copydeck from 'src/assets/properties/properties';


/**
 * UserViewComponent is responsible for displaying and managing user data.
 */
@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent {
  /**
   * Array of users.
   */
  users: IUsers[] = [];

  /**
   * Flag indicating if an error occurred.
   */
  isError = false;

  /**
   * Error message to display.
   */
  errorMessage = '';

  /**
   * Title for the update user action.
   */
  updateUserTitle = copydeck.titles.userUpdate;

  /**
   * Title for the delete user action.
   */
  deleteUserTitle = copydeck.titles.userDelete;

  /**
   * Creates an instance of UserViewComponent.
   * @param userService The user service.
   * @param router The router service.
   */
  constructor(private userService: UsersService, private router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: () => {
        this.isError = true;
        this.errorMessage = copydeck.responses.databaseError;
      },
    });
  }

  /**
   * Updates the user.
   * @param user The user to update.
   */
  updateUser(user: IUsers): void {
    this.router.navigate(['/user/create', { user: JSON.stringify(user) }]);
  }

  /**
   * Deletes the user.
   * @param id The ID of the user to delete.
   */
  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      error: () => {
        this.isError = true;
        this.errorMessage = copydeck.responses.userDeletedError;
      },
      complete: () => (this.users = this.users.filter((user) => user.id !== id)),
    });
  }
}
