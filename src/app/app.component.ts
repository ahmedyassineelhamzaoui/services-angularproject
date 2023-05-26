import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'services-project';
  constructor(private router: Router) {}

  isLandingPageRoute() {
    if( this.router.url === '/' ||  this.router.url === '/login'){
      return true
    }
    return false
  }
  isDashboardRoute() {
    return this.router.url === '/dashboard';
  }
}

