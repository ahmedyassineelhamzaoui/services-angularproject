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
  sideBarOpen = true;
  isLandingPageRoute() {
    if( this.router.url === '/' ||  this.router.url === '/login'){
      return true
    }
    return false
  }
  isDashboardRoute() {
    if(this.router.url === '/dashboard/projects' || this.router.url === '/dashboard/services' || this.router.url === '/dashboard/statistics'){
      return true
    }
    return false
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
  checkWindowWidth(): void {
    if (window.innerWidth <= 700) {
      this.sideBarOpen = false;
    }
  }
  ngOnInit(): void {
    this.checkWindowWidth();
  }
}

