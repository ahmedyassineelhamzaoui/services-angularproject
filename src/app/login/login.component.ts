import { Component,NgZone } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email : string = "" ;
  password : string = "" ;
  

  constructor(private userService: UserService,
    private token:TokenService,
    private router:Router,
    private ngZone: NgZone) { }

  connect(): void {
    let messageErrorAuth=document.querySelector(".message-error-auth") as HTMLElement;
    let messageInfoAuth=document.querySelector(".message-info-auth") as HTMLElement;
    let errorAlertLogin = document.querySelector("#errorAlert-login") as HTMLElement;
    let infoAlertLogin = document.querySelector("#infoAlert-login") as HTMLElement;
    this.userService.login(this.email, this.password)
      .subscribe(
        response => {
         this.responseHandler(response.authorisation);
         if(response.success){
          this.ngZone.run(()=> this.router.navigateByUrl('/dashboard/users'))
         }else{
          errorAlertLogin.classList.add('flex')
          errorAlertLogin.classList.remove('hidden');
          if (errorAlertLogin) {
            setTimeout(() => {
              this.removeAlert();
            }, 3000);
          }
          messageErrorAuth.innerText="Incorrect email or password"
         }
        },
        error => {
          infoAlertLogin.classList.add('flex');
          infoAlertLogin.classList.remove('hidden');
          if (infoAlertLogin) {
            setTimeout(() => {
              this.removeAlert();
            }, 3000);
          }
          messageInfoAuth.innerText="somthing went wrong !!"
        }
      );
  }
  removeAlert(): void {
    let errorAlertLogin = document.querySelector("#errorAlert-login") as HTMLElement;
    let infoAlertLogin = document.querySelector("#infoAlert-login") as HTMLElement;
    if (errorAlertLogin) {
      errorAlertLogin.classList.add('hidden');
      errorAlertLogin.classList.remove('flex');
    }
    if (infoAlertLogin) {
      infoAlertLogin.classList.add('hidden');
      infoAlertLogin.classList.remove('flex');
    }
  }
  responseHandler(data:any) {
    this.token.handleData(data.token);
  }
  
}
