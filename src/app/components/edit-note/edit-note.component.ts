import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent 
{
  title: string;
  description: string;
  colour: string;

  showColorPicker = false;

  colours: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  toggleColorPicker(event: MouseEvent) 
  {
    event.stopPropagation();
    this.showColorPicker = !this.showColorPicker;
  }

  selectColor(colour: string, event: MouseEvent) {
    event.stopPropagation();
    this.colour = colour;
    this.showColorPicker = false;
    this.updateNote();  // Optional: Update note color in DB or backend
  }
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public note: any, 
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditNoteComponent>
  ) {
    // Set initial values from injected note
    this.title = note.title;
    this.description = note.description;
    this.colour = note.colour;
  }

  updateNote() {
    const updatedNote = {
      ...this.note,
      title: this.title,
      description: this.description,
      colour: this.colour
    };

    this.noteService.updateNote(this.note.notesId, updatedNote).subscribe({
      next: (result: any) => 
      {
        this.snackBar.open('Note updated successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(updatedNote); // Send updated note back
      },
      error: (err: any) => 
      {
        this.snackBar.open('Failed to update note', 'Close', { duration: 3000 });
      }
    });
  }

  closeDialog() {
    this.updateNote(); // Save changes when closing
  }
}
