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
    if (item === 'Archive') 
    {
      this.showArchived = true; // Show archived notes when Archive tab is clicked
      this.headerTitle = 'Archive';
      this.showTrash = false;
    } 
    else if (item === 'Notes') 
    {
      this.showArchived = false; // Show regular notes when Notes tab is clicked
      this.headerTitle = 'FunDoo';
      this.showTrash = false;
    }
    else if (item === 'Trash') 
    {
        this.showArchived = false; 
        this.headerTitle = 'Trash';
        this.showTrash = true; // Show trash notes when Trash tab is clicked
    }
    else if (item === 'Reminders') 
    {
        this.showArchived = false;
        this.headerTitle = 'Reminders';
        this.showTrash = false;
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