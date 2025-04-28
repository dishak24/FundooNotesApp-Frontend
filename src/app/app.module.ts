import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; 

import { MatCardModule } from '@angular/material/card';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';

//for api call
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MatMenuModule } from '@angular/material/menu';
import { AddNoteComponent } from './components/add-note/add-note.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { AllDisplayNotesComponent } from './components/all-display-notes/all-display-notes.component';
import { ArchiveNotesComponent } from './components/archive-notes/archive-notes.component';
import { TrashNotesComponent } from './components/trash-notes/trash-notes.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

import { MatDialogModule } from '@angular/material/dialog';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';

import { MatChipsModule } from '@angular/material/chips';
import { NoteIconsComponent } from './components/note-icons/note-icons.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule(
  {
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddNoteComponent,
    DisplayNoteComponent,
    AllDisplayNotesComponent,
    ArchiveNotesComponent,
    TrashNotesComponent,
    EditNoteComponent,
    CollaboratorsComponent,
    NoteIconsComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    //without this line, datepicker will not work
    MatNativeDateModule, 
    //for dropdown(Gender)
    MatSelectModule, 
    //for api call
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule
    
    
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})

export class AppModule 
{
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) 
  {
    matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
  }
}

