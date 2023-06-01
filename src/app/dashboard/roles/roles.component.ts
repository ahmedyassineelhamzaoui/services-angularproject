import { Component,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { RoleService } from 'src/app/role.service';
import { TokenService } from '../../shared/token.service';
import { Role } from 'src/app/role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
   
    isLoading = true
    Roles !: Role[];
    allRolesp : number = 0;
    pagination  : number = 1;
 
    deleteIndex : number = -1 ;
    roleIndex   : number = -1 ;
    editIndex   : number = -1 ;
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
              }
              if(data.permissions){
                this.ngZone.run(()=> this.router.navigateByUrl('/permissions'))
              }
              this.Roles = data.roles;
              console.log(this.Roles)
              this.isLoading = false;
            });
          }else{
            this.ngZone.run(()=> this.router.navigateByUrl('/home'))
          }
    }
    renderPage(event: number) {
      this.pagination = event;
      this.fetchroles();
    }
}
