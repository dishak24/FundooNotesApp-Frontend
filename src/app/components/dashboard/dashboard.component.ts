import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent 
{
  headerTitle: string = 'FunDoo';//Title
  isExpanded = false;

  activeItem: string = 'Notes'; // default selected

  showArchived: boolean = false;//archive flag
  showTrash: boolean = false;//trash flag

  isLoading = false;
  
  showReminders: boolean = false;
  
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
      this.showArchived = true;
      this.showTrash = false;
      this.showReminders = false;
      this.headerTitle = 'Archive';
    } else if (item === 'Trash') {
      this.showArchived = false;
      this.showTrash = true;
      this.showReminders = false;
      this.headerTitle = 'Trash';
    } else if (item === 'Reminders') {
      this.showArchived = false;
      this.showTrash = false;
      this.showReminders = true;
      this.headerTitle = 'Reminders';
    } else {
      this.showArchived = false;
      this.showTrash = false;
      this.showReminders = false;
      this.headerTitle = 'FunDoo';
    }
    
  }

  navigateToAddNote() 
  {
    this.router.navigate(['dashboard/add-note']);
  }

  refreshPage() 
  {
    this.isLoading = true;

      // Wait a short time to show spinner then reload route
    setTimeout(() => 
    {
        window.location.reload();
    }, 1000);
  }

  isListView: boolean = false;

  toggleView() 
  {
    this.isListView = !this.isListView;
  }

}