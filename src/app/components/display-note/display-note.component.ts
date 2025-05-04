import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { CollaboratorsComponent } from '../collaborators/collaborators.component';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';
import { LabelService } from 'src/app/services/label/label.service';
import { MatChipsModule } from '@angular/material/chips';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

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
  showIcons?: boolean; //for each note
  remainder?: Date | null;
  isPinned?: boolean;

  noteLabels?: any[];
  
  //showLabelBox?: boolean;
  labelSearch?: string;
  filteredLabels?: any[];
}

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit, OnChanges
{
  notes: Note[] = [];
  trash: Note[] = []; // to hold the trashed notes


  

  // receive a value from its parent
  @Input() showArchived: boolean = false;  
  @Input() showTrash: boolean = false; 
  @Input() isListView: boolean = false;
  @Input() showReminders: boolean = false;
  @Input() searchText: string = '';
  
 // @Output() editExistingNote = new EventEmitter<any>();

  filteredNotes: any[] = [];

  showNoteIcons(note: any, event: MouseEvent) 
  {
    event.stopPropagation(); // prevent click bubbling
    note.showIcons = true;
  }


  colours: string[] = 
  [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  labelsList: any[] = [];
  newLabel: string = '';


  constructor(private noteService: NoteService,
    private labelService : LabelService ,
    private snackBar: MatSnackBar, 
    private router: Router, 
    private dialog: MatDialog // Inject MatDialog service
    ) {}
      
  ngOnInit() 
  {
    this.getNotes();
    
    //this.getAllLabels();
    // this.filterNotes();
  }

  // getLabelName(labelId: number): string {
  //   // this.labelService.getAllLabels().subscribe((response: any) => {
  //   //   this.labelsList = response.data;
  //   // });
  //   const label = this.labelsList.find(l => l.labelId === labelId);
  //   return label ? label.name : '';
  // }


  ngOnChanges(changes: SimpleChanges) 
  {
    this.getNotes();
    this.getAllLabels();
    if (changes['searchText']) 
    {
      
      this.applySearchFilter();

    }
  }

  @Input() labelName: string = '';

  // pinnedNotes: Note[] = [];
  // otherNotes: Note[] = [];

  //sorting notes 
  get sortedNotes() 
  {
    return [...this.notes].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  }
  

  getNotes() 
  {
    this.noteService.getAllNotes().subscribe(
    {
      next: (result: any) => 
      {
        this.notes = Array.isArray(result) ? result : result.data;

        // Filter based on context
        if (this.searchText) 
        {
          this.applySearchFilter();
        } 
        else 
        {
          this.filteredNotes = [...this.notes];
        }

        //filters
        if (this.showTrash) 
        {
          this.notes = this.notes.filter(note => note.isTrashed);
        } 
        else if (this.showArchived) 
        {
          this.notes = this.notes.filter(note => note.isArchived && !note.isTrashed);
        } 
        else if (this.showReminders) 
        {
          this.notes = this.notes.filter(note => note.remainder && !note.isTrashed);
        } 
        else if (this.labelName) 
        {
          this.notes = this.notes.filter(note =>
            note.noteLabels?.some(label => label.name === this.labelName)
          );
          console.log("Label name: ", this.notes, this.labelName);
        } 
        else
        {
          this.notes = this.notes.filter(note => !note.isArchived && !note.isTrashed);
        }
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
    if (!target.closest('.note-card') && !target.closest('.color-picker')) 
    {
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
      next: (result) => 
      {
        console.log('Color updated successfully:', result);
        this.snackBar.open('Note color updated!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.getNotes(); // Refresh the notes after updating color
      },
      error: (err) => 
      {
        console.error('Error updating color', err);
        this.snackBar.open('Failed to update color', 'Close', 
        {
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
  trashNote(notes: Note,event: MouseEvent)
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

        this.getNotes();
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
        this.snackBar.open('Reminder set!', 'Close', { duration: 3000 });
  
        // Refresh notes or update the view
        //this.getNotes(); 
      }
    });
  }
  
  //to remove reminder
  removeReminder(note: Note, event: MouseEvent): void 
  {
    event.stopPropagation();
  
    const payload = 
    { 
      reminder: '' 
    };

    this.noteService.addReminder(note.notesId, payload).subscribe({
      next: (res) => 
      {
        note.remainder = null;
        this.snackBar.open('Reminder removed', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        console.error('Failed to remove reminder', err);
        this.snackBar.open('Failed to remove reminder', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  

  //get all notes api
  getAllLabels() 
  {
    this.labelService.getAllLabels().subscribe(
    {
      next: (res: any) => 
      {
        this.labelsList = res.map((label: any) => (
        {
          id: label.labelId,
          name: label.labelName,
          editing: false
        }));
      },
      error: (err: any) => 
      {
        console.error('Error fetching labels:', err);
      }
    });
  }

  assignLabel(note: Note, label: any): void {
    const labelExists = note.noteLabels?.some((l) => l.name === label.name);
  
    if (labelExists) {
      this.snackBar.open('Label already added to this note!', 'Close', {
        duration: 3000,
        panelClass: ['info-snackbar']
      });
      return;
    }
  
    const payload = {
      labelName: label.name,
      noteId: note.notesId
    };
  
    this.labelService.assignLabelToNote(note.notesId, label.name).subscribe({
      next: (res) => {
        this.snackBar.open('Label added to note!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        note.noteLabels = [...(note.noteLabels || []), label];
      },
      error: (err) => {
        console.error('Error adding label to note:', err);
        this.snackBar.open('Failed to add label', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
    
  }
  
  

  //Remove label
  removeLabelFromNote(note: Note, label: any) 
  {
    this.labelService.removeLabelFromNote(note.notesId, label.labelId).subscribe({
      next: (res) => 
      {
        note.noteLabels = note.noteLabels?.filter(l => l.labelId !== label.labelId);
        this.snackBar.open('Label removed', 'Close', { duration: 2000 });
      },
      error: (err) => 
      {
        this.snackBar.open('Failed to remove label', 'Close', { duration: 2000 });
      }
    });
  }
  
  
  applySearchFilter() 
  {
    const search = this.searchText?.toLowerCase() || '';
    if (search) 
    {
      this.filteredNotes = this.notes.filter(note =>
        (note.title && note.title.toLowerCase().includes(search)) ||
        (note.description && note.description.toLowerCase().includes(search))
      );
    }
  }

  removeLabel(note: Note, label: any) 
  {
    //note.labels = note..filter(l => l.labelId !== label.labelId);
  }

  //pin - unpin note
  togglePin(note: Note, event: MouseEvent)
  {
    event.stopPropagation();
  
    this.noteService.togglePin(note.notesId).subscribe(
    {
      next: (res: any) => 
      {
        // Toggle locally for UI update
        note.isPinned = !note.isPinned;
        this.snackBar.open(res.message || 'Pin status updated.', 'Close', 
        {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
  
        this.getNotes(); // Refresh view
      },
      error: (err: any) => 
      {
        this.snackBar.open('Failed to pin/unpin note.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  
  //delete dialog
  openDeleteDialog(note: any, event: MouseEvent)
  {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteDialogComponent, 
    {
      width: '300px',
      data: { item: 'note' } // customize as needed
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.deletePermanent(note, event) //delete logic
      }
    });
  }
  
}

