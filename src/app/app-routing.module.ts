import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { RolesComponent } from './dashboard/roles/roles.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { UsersComponent } from './dashboard/users/users.component';
import { PermissionsComponent } from './errors/permissions/permissions.component';
const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"dashboard/projects",component:ProjectsComponent},
  {path:"dashboard/services",component:ServicesComponent},
  {path:"dashboard/statistics",component:StatisticsComponent},
  {path:"dashboard/users",component:UsersComponent},
  {path:"dashboard/roles",component:RolesComponent},
  {path:"permissions",component:PermissionsComponent},
  {path:"home",redirectTo:"/"},
  {path:"",redirectTo:"home",pathMatch:"full"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
