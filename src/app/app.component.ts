import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'services-project';
  isSignedIn!: boolean;

  constructor(private router: Router,
    private auth: AuthStateService,
    public token: TokenService) {}
 
  sideBarOpen = true;
  isLandingPageRoute() {
    if( this.router.url === '/' ||  this.router.url === '/login'){
      return true
    }
    return false
  }
  isDashboardRoute() {
    if(this.router.url === '/dashboard/projects' || this.router.url === '/dashboard/services' || this.router.url === '/dashboard/statistics' || this.router.url === '/dashboard/users' || this.router.url === '/dashboard/roles'){
      return true
    }
    return false
  }
  isPermissions(){
    if(this.router.url === '/permissions'){
      return true
    }
    return false
  }
  is404(){
    if(this.router.url === '/404'){
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
    }else{
      this.sideBarOpen = true;
    }
  }
  ngOnInit(): void {
    this.checkWindowWidth();
    window.addEventListener('resize', () => {
      this.checkWindowWidth();
    });
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
}

