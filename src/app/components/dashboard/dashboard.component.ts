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
  showArchived: boolean = false;
  
  
  constructor(private router: Router) { }
  
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

  // setActive(item: string) {
  //   this.activeItem = item;
  // }

  // Set active tab and toggle archived notes display
  setActive(item: string) 
  {
    this.activeItem = item;
    if (item === 'Archive') {
      this.showArchived = true; // Show archived notes when Archive tab is clicked
    } else if (item === 'Notes') {
      this.showArchived = false; // Show regular notes when Notes tab is clicked
    }
  }

  navigateToAddNote() 
  {
    this.router.navigate(['dashboard/add-note']);
  }

}