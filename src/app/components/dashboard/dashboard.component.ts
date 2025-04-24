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


  navigateToAddNote() 
  {
    this.router.navigate(['dashboard/add-note']);
  }

  // navigateToDisplayNote() 
  // {
  //   this.router.navigate(['dashboard/display-note']);
  // }
}