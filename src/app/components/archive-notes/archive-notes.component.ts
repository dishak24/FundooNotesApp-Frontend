import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-archive-notes',
  templateUrl: './archive-notes.component.html',
  styleUrls: ['./archive-notes.component.scss']
})
export class ArchiveNotesComponent {

  filteredNotes: any[] = [];

  constructor(private noteService: NoteService) {}


  ngOnInit(): void 
  {
    this.noteService.getAllNotes().subscribe((response: any) => 
    {
          this.filteredNotes = response.filter((note: any) => note.isArchived === true);
    });
  }
}
