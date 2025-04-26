import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';

interface Note 
{
  notesId: number;
  title: string;
  description: string;
  colour: string;
  showColorPicker: boolean; //for each note
  isArchived: boolean; 
}

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit, OnChanges
{
  notes: Note[] = [];

  // receive a value from its parent
  @Input() showArchived: boolean = false;  // Input property to determine whether to archived or non-archived notes
 

  colors: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  constructor(private noteService: NoteService, private snackBar: MatSnackBar, private router: Router) {}

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
    this.noteService.getAllNotes().subscribe(
    {
      next: (result: any) => 
      {
        this.notes = Array.isArray(result) ? result : result.data;
       
        console.log(this.notes);

        // Filter notes based on the showArchived property
        this.notes = this.notes.filter((note: Note) => this.showArchived ? note.isArchived : !note.isArchived);
      },
      error: (err) => 
      {
          this.snackBar.open('Getting all notes failed !!!!', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
      }
    });
  }


  toggleColorPicker(note: Note, event: MouseEvent)
  {
    event.stopPropagation();
    note.showColorPicker = !note.showColorPicker;
  }

  selectColor(note: Note, color: string) 
  {
    note.colour = color;
    note.showColorPicker = false; //  after selection hide the color picker 
    
  }

  toArchive(notes: Note)
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


  
}

