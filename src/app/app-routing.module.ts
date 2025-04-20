import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
    //pathMatch: 'full'
    
  },
  {
    path: 'register',
    component: RegisterComponent
    //pathMatch: 'full'
    
  },
  // {
  //   path: 'dasboard',
  //   component: DashboardComponent
  //   //pathMatch: 'full'
    
  // }
  //,
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
