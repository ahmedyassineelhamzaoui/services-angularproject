import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"projects",component:ProjectsComponent},
  {path:"services",component:ServicesComponent},
  {path:"statistics",component:StatisticsComponent},
  {path:"home",redirectTo:"/"},
  {path:"",redirectTo:"home",pathMatch:"full"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
