import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-details';
  showButton = true;
  constructor(private router: Router)  {}
  login() {
    this.showButton = false;
    this.router.navigateByUrl('/login');
  }
}
