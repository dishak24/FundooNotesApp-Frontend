import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { CollaboratorsComponent } from '../collaborators/collaborators.component';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';


interface Note 
{
  notesId: number;
  title: string;
  description: string;
  colour: string;
  showColorPicker: boolean; //for each note
  isArchived: boolean;
  isTrashed: boolean; 
  collaborators?: string[];
  showIcons : boolean; //for each note
  remainder?: Date | null;
}

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit, OnChanges
{
  notes: Note[] = [];
  trash: Note[] = []; // This will hold the trashed notes



  // receive a value from its parent
  @Input() showArchived: boolean = false;  // Input property to determine whether to archived or non-archived notes
  @Input() showTrash: boolean = false; // Input property to determine whether to show trash notes
  @Input() isListView: boolean = false;
  @Input() showReminders: boolean = false;
  
  @Output() editExistingNote = new EventEmitter<any>();

  
  //notes: any[] = []; // your notes list

  showNoteIcons(note: any, event: MouseEvent) {
    event.stopPropagation(); // prevent click bubbling
    note.showIcons = true;
  }


  colours: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  constructor(private noteService: NoteService, 
    private snackBar: MatSnackBar, 
    private router: Router, 
    private dialog: MatDialog // Inject MatDialog service
    ) {}

  ngOnInit() 
  {
    this.getNotes();
  }

  ngOnChanges() 
  {
    // When showArchived changes, reload the notes
    this.getNotes();
  }

  
  getNotes() 
  {
    this.noteService.getAllNotes().subscribe({
      next: (result: any) => {
        this.notes = Array.isArray(result) ? result : result.data;
  
        // Filter logic based on flags
      if (this.showTrash) 
      {
        this.notes = this.notes.filter((note: Note) => note.isTrashed);
      } 
      else if (this.showArchived) 
      {
        this.notes = this.notes.filter((note: Note) => note.isArchived && !note.isTrashed);
      } 
      else if (this.showReminders) 
      {
        this.notes = this.notes.filter((note: Note) => note.remainder && !note.isTrashed);
      } 
      else 
      {
        this.notes = this.notes.filter((note: Note) => !note.isArchived && !note.isTrashed);
      }
        console.log(this.notes);
      },
      error: (err) => {
        this.snackBar.open('Getting all notes failed !!!!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
   
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Close color picker if the clicked element is outside a note or palette
    if (!target.closest('.note-card') && !target.closest('.color-picker')) {
      this.notes.forEach(note => note.showColorPicker = false);
    }
  }


  toggleColorPicker(note: Note, event: MouseEvent)
  {
    event.stopPropagation();
    note.showColorPicker = !note.showColorPicker;
  }

  selectColor(note: Note, colour: string, event: MouseEvent) 
  {
    event.stopPropagation();
    note.colour = colour;
    note.showColorPicker = false; //  after selection hide the color picker
    
    const payload = { colour: colour }; 

    this.noteService.addColour(note.notesId, payload).subscribe({
      next: (result) => {
        console.log('Color updated successfully:', result);
        this.snackBar.open('Note color updated!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.getNotes(); // Refresh the notes after updating color
      },
      error: (err) => {
        console.error('Error updating color', err);
        this.snackBar.open('Failed to update color', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
    
  }

  //archive note
  toArchive(notes: Note, event: MouseEvent)
  {
    event.stopPropagation();
    console.log('Note ID:', notes.notesId);
    if (!notes.notesId) 
    {
      const body = {
        noteId: notes.notesId,
      };

      console.log('Note ID:', notes.notesId);

      this.snackBar.open('Note ID is missing!', 'Close', 
      {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    this.noteService.archiveNote(notes.notesId).subscribe(
    {
      next: (result: any) => 
      {
        console.log('Note archived successfully:', result);

        this.snackBar.open('Note archived successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.getNotes();//to refresh the notes after archiving
        // Update the notes list to reflect the archive status change
        notes.isArchived = true;
        //this.router.navigate(['/archive']);
      },
      error: (err) => 
      {
        this.snackBar.open('Archiving note failed', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  //trash note
  trashNote(notes: Note)
  {
    console.log('Note ID:', notes.notesId);
    if (!notes.notesId) 
    {
      const body = {
        noteId: notes.notesId,
      };

      console.log('Note ID:', notes.notesId);

      this.snackBar.open('Note ID is missing!', 'Close', 
      {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    this.noteService.trashNote(notes.notesId).subscribe(
    {
      next: (result: any) => 
      {
        console.log('Note moved to trash', result);

        this.snackBar.open('Note moved to trash', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.getNotes();//to refresh the notes after archiving
        // Update the notes list to reflect the archive status change
        notes.isTrashed = true;
        //this.router.navigate(['/archive']);
      },
      error: (err) => 
      {
        this.snackBar.open('Failed to move note in trash !!!!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  
  //unTrash note
  unTrashNote(notes: Note, event: MouseEvent)
  {
    event.stopPropagation();
    console.log('Note ID:', notes.notesId);
    if (!notes.notesId) 
    {
      const body = {
        noteId: notes.notesId,
      };

      console.log('Note ID:', notes.notesId);

      this.snackBar.open('Note ID is missing!', 'Close', 
      {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    this.noteService.trashNote(notes.notesId).subscribe(
    {
      next: (result: any) => 
      {
        console.log('Note Restored', result);

        this.snackBar.open('Note Restored', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.getNotes();//to refresh the notes after archiving
        // Update the notes list to reflect the archive status change
        notes.isTrashed = false;
        
      },
      error: (err) => 
      {
        this.snackBar.open('Failed to Restore Note !!!!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deletePermanent(notes: Note, event: MouseEvent)
  {
    event.stopPropagation();
    console.log('Note ID:', notes.notesId);
    if (!notes.notesId) 
    {
      const body = {
        noteId: notes.notesId,
      };

      console.log('Note ID:', notes.notesId);

      this.snackBar.open('Note ID is missing!', 'Close', 
      {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    this.noteService.deleteNote(notes.notesId).subscribe(
    {
      next: (result: any) => 
      {
        console.log('Note deleted permanently', result);

        this.snackBar.open('Note deleted permanently', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.getNotes();//to refresh the notes after archiving
        // Update the notes list to reflect the archive status change
        //notes.isTrashed = true;
        
      },
      error: (err) => 
      {
        this.snackBar.open('Failed to delete note permanently !!!!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }


// Open edit dialog on note click
  openNoteForEdit(note: any) {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      data: note,
      width: '570px'
      
    });
  
    dialogRef.afterClosed().subscribe((updatedNote) => {
      if (updatedNote) {
        // Find the original note in the notes array and update it
        const index = this.notes.findIndex((n: any) => n.notesId === updatedNote.notesId);
        if (index !== -1) {
          this.notes[index] = updatedNote;
        }
      }
    });
  }
  
// Open collaborators dialog
  openCollaboratorsDialog(note: Note, event: MouseEvent) 
  {
    event.stopPropagation();
    const dialogRef = this.dialog.open(CollaboratorsComponent, 
    {
      data: 
      {
        noteId: note.notesId,
        existingCollaborators: note.collaborators || []
      },
      width: '570px'
    });
  
    dialogRef.afterClosed().subscribe((updatedCollaborators: string[]) => 
    {
      if (updatedCollaborators) 
      {
        note.collaborators = updatedCollaborators;
      }
    });
  }
  
//Reminder box
  openReminderDialog(note: Note, event: MouseEvent): void 
  {
    event.stopPropagation();
  

    const dialogRef = this.dialog.open(ReminderDialogComponent, 
    {
      data: { noteId: note.notesId },
      width: '320px'
    });
  
    dialogRef.afterClosed().subscribe((remainder: Date) => {
      if (remainder) {
        // Update the note's reminder property
        note.remainder = remainder;
  
        // Optional: Update the reminder icon appearance or other UI details based on reminder
        this.snackBar.open('Reminder set!', 'Close', { duration: 3000 });
  
        // Refresh notes or update the view
        //this.getNotes(); // If necessary to re-fetch the notes from the server
      }
    });
  }
  
  

  
}

