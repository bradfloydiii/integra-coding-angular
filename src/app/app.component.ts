import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'integra-coding';

  ngOnInit() {
    if (environment.production) {
      console.log("We are running in production mode");
      console.log(`baseUrl: ${environment.baseUrl}`);
    } else {
      console.log("We are running in development mode");
      console.log(`baseUrl: ${environment.baseUrl}`);
    }
  }
  
}
