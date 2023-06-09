import { Component,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { RoleService } from 'src/app/role.service';
import { TokenService } from '../../shared/token.service';
import { Role } from 'src/app/role';
import { Permission } from 'src/app/permission';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
    

    isLoading = true
    Roles !: Role[];
    Permissions !: Permission[];
    allRolesp : number = 0;
    pagination  : number = 1;
    roleToEdit : Role = new Role(); 
    deleteIndex : number = -1 ;
    roleIndex   : number = -1 ;
    editIndex   : number = -1 ;
    param       : boolean = false;
    errors: any = null;
    editerrors: any = null;
    role :  Role = new Role();
    permission : Permission = new Permission();
    arrayOfPermessions !: Permission[];


    constructor
              (public formBuilder : FormBuilder,
                public router : Router,
                public ngZone : NgZone,
                public token : TokenService,
                public roleService : RoleService
              )
    {
      this.fetchroles();
    } 
    getRolePermissionNames(role: any): string {
      return role.permissions.map((permission: any) => permission.name);
    }
    fetchroles(){
          if(this.token.isLoggedIn()){
            this.roleService.getAllRoles(this.pagination).subscribe((data: any) => {
              if(data.error){
                this.ngZone.run(()=> this.router.navigateByUrl('/home'))
              }else
              if(data.roles){
                this.Roles = data.roles;
                this.Permissions = data.permissions;
                this.isLoading = false;
              }else
              if(data.permissions){
                this.ngZone.run(()=> this.router.navigateByUrl('/permissions'))
              }
            });
          }else{
            this.ngZone.run(()=> this.router.navigateByUrl('/home'))
          }
    }
    renderPage(event: number) {
      this.pagination = event;
      this.fetchroles();
    }
    showAddModal(){
      let showAddModal=document.querySelector('#add-roleModal') as HTMLElement;
      showAddModal.classList.add('flex');
      showAddModal.classList.remove('hidden');
    }
    hideAddModal(){
      let showAddModal=document.querySelector('#add-roleModal') as HTMLElement;
      let roleForm=document.querySelector('#role-form') as HTMLFormElement;
      showAddModal.classList.add('hidden');
      showAddModal.classList.remove('flex');
      roleForm.reset();
      this.errors = null;
    }
    showEditModal(index : number){
      let editRoleModal=document.querySelector('#edit-roleModal') as HTMLElement;
      this.editIndex = index;
      this.Roles.forEach(element => {
        if(element.id == index){
          this.roleToEdit.id           = element.id; 
          this.roleToEdit.name         = element.name; 
          this.roleToEdit.permissions  = element.permissions; 
        }
      });
      editRoleModal.classList.add('flex');
      editRoleModal.classList.remove('hidden');
      this.param = true;
    }
    ischecked(name:string){
      if(this.param == true){        
        for (let permission of this.roleToEdit.permissions) {
            if(permission.name == name){
               return true;
            }
        }
        return false;
      }
    }
    hideEditModal(){
      let editRolerModal=document.querySelector('#edit-roleModal') as HTMLElement;
      editRolerModal.classList.add('hidden');
      editRolerModal.classList.remove('flex');
      this.editerrors = null;

    }
    showDeleteModal(index : number){
      let deleteRoleModal=document.querySelector('#delete-roleModal') as HTMLElement;
      this.deleteIndex = index;
      deleteRoleModal.classList.add('flex');
      deleteRoleModal.classList.remove('hidden');
    }
    hideDeleteModal(){
      let deleteRoleModal=document.querySelector('#delete-roleModal') as HTMLElement;
      deleteRoleModal.classList.add('hidden');
      deleteRoleModal.classList.remove('flex');
    }
    createRole(){
      let showAddModal=document.querySelector('#add-roleModal') as HTMLElement;
      let messageSuccessRole=document.querySelector(".message-success-role") as HTMLElement;
      let successAlertRole = document.querySelector("#successAlert-role") as HTMLElement;
      let checkedPermissions = this.Permissions.filter(permission => permission.checked);

      this.role.permissions = checkedPermissions;
      console.log(this.role);
      this.roleService.addRole(this.role)
      .subscribe(
        response => {
          if(response.success){
            this.Roles.push(response.role);
            showAddModal.classList.add('hidden')
            showAddModal.classList.remove('flex')
            successAlertRole.classList.add('flex')
            successAlertRole.classList.remove('hidden');
            messageSuccessRole.innerText=response.success;
            this.hideAddModal();  
            if (messageSuccessRole) {
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
    confirmDelete(){
      console.log(this.deleteIndex)
      let messageSuccessRole=document.querySelector(".message-success-role") as HTMLElement;
      let successAlertRole = document.querySelector("#successAlert-role") as HTMLElement;
      this.Roles.forEach((element,index) => {
        if(element.id == this.deleteIndex){
          this.roleIndex = index;
          this.roleService.removeRole(this.deleteIndex).subscribe((response) =>{
            if(response.success){
              this.Roles.splice(this.roleIndex,1);
              this.hideDeleteModal();
              successAlertRole.classList.add('flex')
              successAlertRole.classList.remove('hidden');
              messageSuccessRole.innerText=response.success;
              if (messageSuccessRole) {
                setTimeout(() => {
                  this.removeAlert();
                }, 5000);
              }
            }
            if(response.error){
              console.log(response.error  )
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
    confirmUpdate(){
      let messageSuccessRole=document.querySelector(".message-success-role") as HTMLElement;
      let successAlertRole = document.querySelector("#successAlert-role") as HTMLElement;
      let checkedPermissions = this.Permissions.filter(permission => permission.checked);
      this.roleToEdit.permissions = checkedPermissions
      this.Roles.forEach((element,index) => {
        if(element.id == this.editIndex){
          this.roleIndex = index;
          this.roleService.updateRole(this.editIndex,this.roleToEdit).subscribe(response => {
            if(response.success){
              this.Roles[this.roleIndex] = response.role;
              this.hideEditModal();
              successAlertRole.classList.add('flex')
              successAlertRole.classList.remove('hidden');
              messageSuccessRole.innerText=response.success;
              if (messageSuccessRole) {
                setTimeout(() => {
                  this.removeAlert();
                }, 5000);
              }
            }else if(response.permissions){
              this.ngZone.run(()=> this.router.navigateByUrl('/permissions'))
            }else if(response.errors){
              this.errors = response.errors
            }else if(response.exist){
              let errorAlert=document.querySelector('#errorAlert-role') as HTMLElement
              let messageErrors=document.querySelector(".message-error-role") as HTMLElement;
              messageErrors.innerText=response.exist;
              errorAlert.classList.add('flex')
              errorAlert.classList.remove('hidden');
              if (messageErrors) {
                setTimeout(() => {
                  this.removeAlert();
                }, 5000);
              }
            }else{
              this.ngZone.run(()=> this.router.navigateByUrl('/404'))
            }
        },(err)=>{
          
        })
        }
      });

    }
    removeAlert(): void {
      let errorAlertRole = document.querySelector("#errorAlert-role") as HTMLElement;
      let successAlertRole = document.querySelector("#successAlert-role") as HTMLElement;
      let errorAlert = document.querySelector("#errorAlert") as HTMLElement;

      if (errorAlertRole) {
        errorAlertRole.classList.add('hidden');
        errorAlertRole.classList.remove('flex');
      }
      if (successAlertRole) {
        successAlertRole.classList.add('hidden');
        successAlertRole.classList.remove('flex');
      }
      if (errorAlert) {
        errorAlert.classList.add('hidden');
        errorAlert.classList.remove('flex');
      }
    }
}
