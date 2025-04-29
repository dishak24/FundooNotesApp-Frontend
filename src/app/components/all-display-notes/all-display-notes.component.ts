import { Component, Input, ViewChild } from '@angular/core';
import { DisplayNoteComponent } from '../display-note/display-note.component';

@Component({
  selector: 'app-all-display-notes',
  templateUrl: './all-display-notes.component.html',
  styleUrls: ['./all-display-notes.component.scss']
})
export class AllDisplayNotesComponent {

  //gives direct access to the child component
  @ViewChild(DisplayNoteComponent) displayNoteComp!: DisplayNoteComponent;

  @Input() showArchived: boolean = false; 
  @Input() showTrash: boolean = false;

  @Input() isListView: boolean = false;

  @Input() showReminders: boolean = false;
 
  onNoteAdded(newNote: any) 
  {
    if (this.displayNoteComp) 
    {
      this.displayNoteComp.getNotes(); // refresh
    }
  }

}
