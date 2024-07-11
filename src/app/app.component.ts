import { Component } from '@angular/core';
import { Router } from '@angular/router';
import copydeck from 'src/assets/properties/properties';
import { environment } from 'src/environments/environment';

/**
 * This is the root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /**
   * The title of the user view.
   */
  public title = copydeck.responses.userView;

  /**
   * The title of the user view.
   */
  userViewTitle = copydeck.titles.userView;

  /**
   * The title of the user create view.
   */
  createUserTitle = copydeck.titles.userCreate;

  constructor(private router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties of the component are initialized.
   */
  ngOnInit() {
    if (environment.production) {
      console.log('We are running in production mode');
      console.log(`apiUrl: ${environment.apiUrl}`);
    } else {
      console.log('We are running in development mode');
      console.log(`apiUrl: ${environment.apiUrl}`);
    }
  }

  /**
   * Navigates to the user create page.
   */
  createUser(): void {
    this.router.navigate(['/user/create']);
  }
}
