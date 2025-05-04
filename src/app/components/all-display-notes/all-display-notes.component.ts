import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { DisplayNoteComponent } from '../display-note/display-note.component';

@Component({
  selector: 'app-all-display-notes',
  templateUrl: './all-display-notes.component.html',
  styleUrls: ['./all-display-notes.component.scss']
})
export class AllDisplayNotesComponent implements OnChanges  
{

  //gives direct access to the child component
  @ViewChild(DisplayNoteComponent) displayNoteComp!: DisplayNoteComponent;

  @Input() showArchived: boolean = false; 
  @Input() showTrash: boolean = false;

  @Input() isListView: boolean = false;

  @Input() showReminders: boolean = false;

  @Input() searchText: string = '';

  allNotes: any[] = [];
  filteredNotes: any[] = [];

  @Input() labelName: string = '';


  ngOnChanges(changes: SimpleChanges)
  {
    if (changes['searchText']) 
    {
      this.applySearchFilter();
    }
  }
 
  onNoteAdded(newNote: any) 
  {
    if (this.displayNoteComp) 
    {
      this.displayNoteComp.getNotes(); // refresh
    }
  }

  applySearchFilter() 
  {
    const search = this.searchText.toLowerCase();

    if (!search) 
    {
      this.filteredNotes = this.allNotes;
    } 
    else 
    {
      this.filteredNotes = this.allNotes.filter(note =>
        (note.title && note.title.toLowerCase().includes(search)) ||
        (note.description && note.description.toLowerCase().includes(search))
      );
    }
  }

}
