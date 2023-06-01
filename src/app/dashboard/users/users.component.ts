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
   editerrors: any = null;
   Users !: User[];
   isLoading = true; 
   userToEdit : User = new User(); 

   allStudents : number = 0;
   pagination  : number = 1;

   deleteIndex : number = -1 ;
   userIndex   : number = -1 ;
   editIndex   : number = -1 ;
   constructor (
                public  formBuilder:FormBuilder,
                public userService:UserService,
                private token:TokenService,
                public router : Router,
                public ngZone: NgZone
                )
    {this.fetchUsers();}
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
    showEditModal(index : number){
      let editUserModal=document.querySelector('#edit-userModal') as HTMLElement;
      this.editIndex = index;
      this.Users.forEach(element => {
        if(element.id == index){
          this.userToEdit.id         = element.id; 
          this.userToEdit.first_name = element.first_name; 
          this.userToEdit.last_name  = element.last_name; 
          this.userToEdit.email      = element.email; 
        }
      });
      editUserModal.classList.add('flex');
      editUserModal.classList.remove('hidden');
    }
    hideEditModal(){
      let editUserModal=document.querySelector('#edit-userModal') as HTMLElement;
      editUserModal.classList.add('hidden');
      editUserModal.classList.remove('flex');
      this.editerrors = null;

    }
    showDeleteModal(index : number){
      let deleteUserModal=document.querySelector('#delete-userModal') as HTMLElement;
      this.deleteIndex = index;
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
    confirmDelete() {
      let messageSuccessUser=document.querySelector(".message-success-user") as HTMLElement;
      let successAlertUser = document.querySelector("#successAlert-user") as HTMLElement;
      this.Users.forEach((element,index) => {
        if(element.id == this.deleteIndex){
          this.userIndex = index;
          this.userService.removeUser(this.deleteIndex).subscribe((response) =>{
            if(response.success){
              this.Users.splice(this.userIndex,1);
              this.hideDeleteModal();
              successAlertUser.classList.add('flex')
              successAlertUser.classList.remove('hidden');
              messageSuccessUser.innerText=response.success;
              if (messageSuccessUser) {
                setTimeout(() => {
                  this.removeAlert();
                }, 5000);
              }
            }
            if(response.error){
              this.ngZone.run(()=> this.router.navigateByUrl('/404'))
            }
            if(response.permissions){
              this.ngZone.run(()=> this.router.navigateByUrl('/permissions'))
            }
          },(err)=>{
            this.ngZone.run(()=> this.router.navigateByUrl('/404'))
          }) 
        }
        
      });

      this.hideDeleteModal();
    }
    updateUser(){
      let messageSuccessUser=document.querySelector(".message-success-user") as HTMLElement;
      let successAlertUser = document.querySelector("#successAlert-user") as HTMLElement;
      this.Users.forEach((element,index) => {
        if(element.id == this.editIndex){
          this.userIndex = index;
          this.userService.updateUserInfo(this.editIndex,this.userToEdit).subscribe((response) =>{
            if(response.success){
              this.Users[this.userIndex] = this.userToEdit;
              this.hideEditModal();
              successAlertUser.classList.add('flex')
              successAlertUser.classList.remove('hidden');
              messageSuccessUser.innerText=response.success;
              if (messageSuccessUser) {
                setTimeout(() => {
                  this.removeAlert();
                }, 5000);
              }
            }
            if(response.error){
              console.log(response.error);
              this.ngZone.run(()=> this.router.navigateByUrl('/404'))
            }
            if(response.permissions){
              this.ngZone.run(()=> this.router.navigateByUrl('/permissions'))
            }if(response.errors){
              this.editerrors = response.errors
            }if(response.exist){
              let errorAlert=document.querySelector('#errorAlert') as HTMLElement
              let messageErrors=document.querySelector(".message-error") as HTMLElement;
              messageErrors.innerText=response.exist;
              errorAlert.classList.add('flex')
              errorAlert.classList.remove('hidden');
              if (messageErrors) {
                setTimeout(() => {
                  this.removeAlert();
                }, 5000);
              }
            }
          },(err)=>{
            this.ngZone.run(()=> this.router.navigateByUrl('/404'))
          }) 
        }
        
      });
    }










    
    removeAlert(): void {
      let errorAlertUser = document.querySelector("#errorAlert-user") as HTMLElement;
      let successAlertUser = document.querySelector("#successAlert-user") as HTMLElement;
      let errorAlert = document.querySelector("#errorAlert") as HTMLElement;

      if (errorAlertUser) {
        errorAlertUser.classList.add('hidden');
        errorAlertUser.classList.remove('flex');
      }
      if (successAlertUser) {
        successAlertUser.classList.add('hidden');
        successAlertUser.classList.remove('flex');
      }
      if (errorAlert) {
        errorAlert.classList.add('hidden');
        errorAlert.classList.remove('flex');
      }
    }
    
    
}
