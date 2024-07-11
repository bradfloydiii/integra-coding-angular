import { Component } from '@angular/core';
import { Router } from '@angular/router';
import copydeck from 'src/assets/properties/properties';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = copydeck.responses.userView;

  userViewTitle = copydeck.titles.userView;
  createUserTitle = copydeck.titles.userCreate;

  constructor(private router: Router) {}

  ngOnInit() {
    if (environment.production) {
      console.log('We are running in production mode');
      console.log(`apiUrl: ${environment.apiUrl}`);
    } else {
      console.log('We are running in development mode');
      console.log(`apiUrl: ${environment.apiUrl}`);
    }
  }

  createUser(): void {
    this.router.navigate(['/user/create']);
  }
}
