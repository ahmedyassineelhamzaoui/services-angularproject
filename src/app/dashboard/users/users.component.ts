import { Component,NgZone,ViewChild } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { TokenService } from '../../shared/token.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
   user :  User = new User();
   errors: any = null;
   Users !: User[];
   isLoading = true; 

   allStudents: number = 0;
   pagination: number = 1;


   constructor (
                public  formBuilder:FormBuilder,
                public userService:UserService,
                private token:TokenService,
                public router : Router,
                public ngZone: NgZone){
                  this.fetchUsers();
                  
    }
    showAddModal(){
      let showAddModal=document.querySelector('#add-userModal') as HTMLElement;
      showAddModal.classList.add('flex');
      showAddModal.classList.remove('hidden');
    }
    hideAddModal(){
      let showAddModal=document.querySelector('#add-userModal') as HTMLElement;
      let userForm=document.querySelector('#user-form') as HTMLFormElement;
      showAddModal.classList.add('hidden');
      showAddModal.classList.remove('flex');
      userForm.reset();
      this.errors = null;
    }
    showEditModal(){
      let editUserModal=document.querySelector('#edit-userModal') as HTMLElement;
      editUserModal.classList.add('flex');
      editUserModal.classList.remove('hidden');
    }
    hideEditModal(){
      let editUserModal=document.querySelector('#edit-userModal') as HTMLElement;
      editUserModal.classList.add('hidden');
      editUserModal.classList.remove('flex');
    }
    showDeleteModal(){
      let deleteUserModal=document.querySelector('#delete-userModal') as HTMLElement;
      deleteUserModal.classList.add('flex');
      deleteUserModal.classList.remove('hidden');
    }
    hideDeleteModal(){
      let deleteUserModal=document.querySelector('#delete-userModal') as HTMLElement;
      deleteUserModal.classList.add('hidden');
      deleteUserModal.classList.remove('flex');
    }
    register(){
      let showAddModal=document.querySelector('#add-userModal') as HTMLElement;
      let messageSuccessUser=document.querySelector(".message-success-user") as HTMLElement;
      let successAlertUser = document.querySelector("#successAlert-user") as HTMLElement;
      this.userService.createUser(this.user)
      .subscribe(
        response => {
          if(response.success){
            this.Users.push(response.user);
            showAddModal.classList.add('hidden')
            showAddModal.classList.remove('flex')
            successAlertUser.classList.add('flex')
            successAlertUser.classList.remove('hidden');
            messageSuccessUser.innerText=response.success;
            if (messageSuccessUser) {
              setTimeout(() => {
                this.removeAlert();
              }, 5000);
            }
          }else if(response.error){
            this.ngZone.run(()=> this.router.navigateByUrl('/404'))
          }
          if(response.permissions){
            this.ngZone.run(()=> this.router.navigateByUrl('/permissions'))
          }
          else{
            this.errors = response.errors
          }
         },(err)=>{
          console.log(err);
      })
    }
    fetchUsers(){
      if(this.token.isLoggedIn()){
        this.userService.getAllUsers(this.pagination).subscribe((data: any) => {
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
    renderPage(event: number) {
      this.pagination = event;
      this.fetchUsers();
    }














    
    removeAlert(): void {
      let errorAlertUser = document.querySelector("#errorAlert-user") as HTMLElement;
      let successAlertUser = document.querySelector("#successAlert-user") as HTMLElement;
      if (errorAlertUser) {
        errorAlertUser.classList.add('hidden');
        errorAlertUser.classList.remove('flex');
      }
      if (successAlertUser) {
        successAlertUser.classList.add('hidden');
        successAlertUser.classList.remove('flex');
      }
    }
    
    
}
