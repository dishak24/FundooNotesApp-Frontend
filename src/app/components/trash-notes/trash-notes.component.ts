import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-trash-notes',
  templateUrl: './trash-notes.component.html',
  styleUrls: ['./trash-notes.component.scss']
})
export class TrashNotesComponent 
{
  filteredNotes: any[] = [];
  
  constructor(private route: ActivatedRoute, private noteService: NoteService) {}
  
  ngOnInit(): void {
    
    this.noteService.getAllNotes().subscribe((response: any) => 
    {
        this.filteredNotes = response.filter((note: any) => note.isTrashed === true);
    });
  }

}
