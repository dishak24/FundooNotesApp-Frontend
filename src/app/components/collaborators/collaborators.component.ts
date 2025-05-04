import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollaboratorService } from 'src/app/services/collaborator/collaborator.service';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent {

  email: string = '';
  collaborators: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { noteId: number, existingCollaborators: string[] },
    private dialogRef: MatDialogRef<CollaboratorsComponent>,
    private service: CollaboratorService,
    private snackBar: MatSnackBar
  ) {
    this.collaborators = [...data.existingCollaborators];
  }

  //to add collaborator
  addCollaborator() 
  {
    if (!this.email) return;

    const payload = { email: this.email };

    this.service.addCollaborator(this.data.noteId, payload).subscribe(
    {
      next: () => 
      {
        this.collaborators.push(this.email);
        this.email = '';
        this.snackBar.open('Collaborator added', 'Close', 
          { duration: 3000 });
      },
      error: () => 
      {
        this.snackBar.open('Failed to add collaborator', 'Close', 
          { duration: 3000 });
      }
    });
  }

  //to remove collaborator
  removeCollaborator(email: string) 
  {
      

  }

  close() 
  {
    this.dialogRef.close(this.collaborators);
  }

}
