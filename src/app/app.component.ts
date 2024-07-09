import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'Create User';

  constructor(private router: Router) {}

  ngOnInit() {
    if (environment.production) {
      console.log('We are running in production mode');
      console.log(`baseUrl: ${environment.baseUrl}`);
    } else {
      console.log('We are running in development mode');
      console.log(`baseUrl: ${environment.baseUrl}`);
    }
  }

  createUser(): void {
    this.router.navigate(['/user/create']);
  }
}
