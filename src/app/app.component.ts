import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'self-service';

  constructor(private router: Router) {}

  isHome(): boolean {
    return this.router.url === '/home';
  }
}
