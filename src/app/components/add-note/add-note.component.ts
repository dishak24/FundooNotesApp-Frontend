import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {

  // note = { title: '', content: '', color: '#ffffff' };
  // isColorPickerVisible = false; // Flag to show/hide color picker

  // @Output() noteAdded = new EventEmitter<{ title: string, content: string, color: string }>();

  // colors: string[] = ['#ffffff', '#fce8e6', '#fff8e1', '#f0f4c3', '#e0f7fa', '#f3e5f5', '#e8f5e9', '#ede7f6', '#e1f5fe'];

  // toggleColorPicker() {
  //   this.isColorPickerVisible = !this.isColorPickerVisible; // Toggle visibility
  // }

  // selectColor(color: string) {
  //   this.note.color = color; // Set selected color to the note
  //   this.isColorPickerVisible = false; // Hide color picker after selecting
  // }

  // addNote() {
  //   if (this.note.title || this.note.content) {
  //     this.noteAdded.emit(this.note);
  //     this.note = { title: '', content: '', color: '#ffffff' };
  //   }
  // }

  title: string = '';
  content: string = '';
  isExpanded: boolean = false;

  @Output() noteAdded = new EventEmitter<any>();

  toggleForm() {
    this.isExpanded = true;
  }

  closeNote() {
    if (this.title || this.content) {
      this.noteAdded.emit({ title: this.title, content: this.content });
    }
    this.title = '';
    this.content = '';
    this.isExpanded = false;
  }

}
