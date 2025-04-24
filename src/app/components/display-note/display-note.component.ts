import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/note/note.service';

interface Note {
  id: number;
  title: string;
  description: string;
  colour?: string;
  pinned?: boolean;
  showColorPicker?: boolean;  // Add this property for each note
}

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {
  notes: Note[] = [];
  colors: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getAllNotes().subscribe({
      next: (response: any) => {
        this.notes = Array.isArray(response) ? response : response.data;
      },
      error: (err) => {
          this.snackBar.open('Getting all notes failed !!!!', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
      }
    });
  }

  togglePin(note: Note): void {
    note.pinned = !note.pinned;
  }

  toggleColorPicker(note: Note, event: MouseEvent): void {
    event.stopPropagation();
    // Toggle color picker visibility only for the clicked note
    note.showColorPicker = !note.showColorPicker;
  }

  selectColor(note: Note, color: string): void {
    note.colour = color;
    note.showColorPicker = false;  // Hide the color picker after selection
  }
}
