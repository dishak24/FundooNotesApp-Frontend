import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { AllDisplayNotesComponent } from './components/all-display-notes/all-display-notes.component';
import { ArchiveNotesComponent } from './components/archive-notes/archive-notes.component';
import { TrashNotesComponent } from './components/trash-notes/trash-notes.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

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
      { path: '', component: AllDisplayNotesComponent }, ]
  },
  { path: 'archive', 
    component: ArchiveNotesComponent, 
    data: { type: 'archive' } 
  },
  { path: 'trash', 
    component: TrashNotesComponent, 
    data: { type: 'trash' } 
  },
  {
    path: 'editNote',
    component: EditNoteComponent
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
