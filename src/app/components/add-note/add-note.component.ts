import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HostListener } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit, OnDestroy {

  isExpanded: boolean = false;
  isColorPickerVisible: boolean = false;
  noteForm!: FormGroup;

  note = {
    title: '',
    content: '',
    color: '#ffffff',
    isPinned: false
  };

  colors: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  @ViewChild('noteCard', { static: true }) noteCard!: ElementRef;
  
  @Output() noteAdded = new EventEmitter<any>();

  constructor(
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void 
  {
    this.noteForm = this.fb.group(
    {
      title: ['', [Validators.maxLength(100)]],
      content: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // Open the form and listen for clicks outside
  toggleForm(event?: MouseEvent) {
    this.isExpanded = true;
    event?.stopPropagation(); // Prevent event from propagating to the document

  }

  // Detect clicks outside the component and close the note
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
  const clickedInside = this.noteCard?.nativeElement.contains(event.target);
  if (!clickedInside && this.isExpanded) {
    this.resetNote(); // Collapse without saving
  }
}


  // Toggle color picker visibility
  toggleColorPicker(event: MouseEvent) {
    event.stopPropagation();  // Prevent click from propagating to document
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }

  // Select color for the note
  selectColor(color: string) {
    this.note.color = color;
    this.isColorPickerVisible = false;
  }

  // Close the note
  closeNote() {
    this.isColorPickerVisible = false;
  
    const title = this.noteForm.value.title.trim();
    const content = this.noteForm.value.content.trim();
  
    if (title || content) 
    {
      const payload = {
        title: title,
        description: content,
        colour: this.note.color,
        //isPinned: this.note.isPinned
      };

      console.log('Payload:', payload);
  
      this.noteService.addNote(payload).subscribe({
        next: (response: any) => {
          this.snackBar.open('Note saved successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.noteAdded.emit(response); // Emit if parent wants to refresh list
          this.resetNote(); // Reset after successful add
        },
        error: () => {
          this.snackBar.open('Error in saving note!', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.resetNote(); // Even if no content, just reset form
    }
  }
  
  resetNote() {
    this.note = { title: '', content: '', color: '#ffffff', isPinned: false };
    this.noteForm.reset();
    this.isExpanded = false;
    this.isColorPickerVisible = false;
  }
  

  // Pin or unpin the note
  togglePin(event: MouseEvent) {
    event.stopPropagation();  // Prevent click from propagating to document
    this.note.isPinned = !this.note.isPinned;
  }
}
