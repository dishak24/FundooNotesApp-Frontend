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

  constructor(private route: ActivatedRoute, private noteService: NoteService) {}


ngOnInit(): void 
{
  const tabType = this.route.snapshot.data['type'];

  this.noteService.getAllNotes().subscribe((response: any) => 
  {
    //cast the response to an array
    const notes = response as any[];
    this.filteredNotes = notes.filter((note: any) => 
    {
      return tabType === 'archive' ? note.isArchived : !note.isArchived;
    });
  });
  
}

  
  

}
