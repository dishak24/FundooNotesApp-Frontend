import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { AllDisplayNotesComponent } from './components/all-display-notes/all-display-notes.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
   
  },
  {
    path: 'register',
    component: RegisterComponent
  
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],//property - true or false
    children: [
      // { path: '', component: AddNoteComponent },
      { path: '', component: AllDisplayNotesComponent },
      // Add more child routes as needed
    ]// after note container
    //archive, remainder adding here-- component name , Componant 
    
  },
  {
    path: 'addNote',
    component: AddNoteComponent
  },

  {
    path: 'displayNote',
    component: DisplayNoteComponent
  },

  {
    path: 'allNotes',
    component: AllDisplayNotesComponent
  },

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
