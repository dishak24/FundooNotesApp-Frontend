import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/note/note.service';

interface Note 
{
  title: string;
  description: string;
  colour: string;
  showColorPicker: boolean; //for each note
}

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit 
{
  notes: Note[] = [];

  colors: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {}

  ngOnInit() 
  {
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

  selectColor(note: Note, color: string): void {
    note.colour = color;
    note.showColorPicker = false; //  after selection hide the color picker 
    
  }
}
