import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent 
{
  isExpanded = false;
  activeItem: string = 'Notes'; // default selected
  
  constructor(private router: Router) { }
  //for sidenav
  //hovering = false; // default false Flag for hover state
  //to toggle the sidenav
  toggleSidenav() 
  {
    this.isExpanded = !this.isExpanded;
  }

  // Logout function
  logout() 
  {
    //Remove token from local storage
    localStorage.removeItem('Token'); 
    console.log('User logged out !!!!'); 
    // Navigate to the login page
    this.router.navigate(['/login']); 
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  // Handle hover: expand or collapse sidenav based on mouse enter/leave
  // onHover(state: boolean) {
  //   this.hovering = state;
  //   if (state) {
  //     this.isExpanded = true;
  //   } else if (!this.isExpanded) {
  //     this.isExpanded = false;
  //   }
  // }


//  notes: { title: string, content: string, color: string }[] = [];

//   handleNoteAdded(note: { title: string, content: string, color: string }) {
//   this.notes.unshift(note);
// }


// noteTitle: string = '';
// noteContent: string = '';
// selectedColor: string = '#fff'; // default
// colors: string[] = ['#fff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb'];

// notes: { title: string, content: string, color: string }[] = [];

// changeColor(color: string) {
//   this.selectedColor = color;
// }

// addNote() {
//   if (this.noteTitle.trim() || this.noteContent.trim()) {
//     this.notes.unshift({
//       title: this.noteTitle,
//       content: this.noteContent,
//       color: this.selectedColor
//     });

//     // Clear inputs
//     this.noteTitle = '';
//     this.noteContent = '';
//     this.selectedColor = '#fff';
//   }
// }


}
