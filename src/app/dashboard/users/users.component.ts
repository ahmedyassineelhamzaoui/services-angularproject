import { Component,NgZone } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { TokenService } from 'src/app/shared/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
   first_name : string = '';
   last_name : string ='';
   status : string ='';
   email : string ='';
   Users !: User[];
   isLoading = true; 
   constructor (public userService:UserService,
                public tokenService:TokenService,
                public router : Router,
                public ngZone: NgZone){
                  if(tokenService.isLoggedIn()){
                      
                    this.userService.getAllUsers().subscribe((data: any) => {
                      if(data.info){
                        this.ngZone.run(()=> this.router.navigateByUrl('/home'))
                      }
                      if(data.error){
                        this.ngZone.run(()=> this.router.navigateByUrl('/permissions'))
                      }
                      this.Users = data.users;
                      this.isLoading = false;
                    });
                  }else{
                    this.ngZone.run(()=> this.router.navigateByUrl('/home'))
                  }
    }
}
