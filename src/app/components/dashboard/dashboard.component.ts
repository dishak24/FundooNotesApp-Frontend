import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { MatDialog } from '@angular/material/dialog';
import { LabelService } from 'src/app/services/label/label.service';

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

  labels: any[] = [];//for label
  searchText: string = '';

  @Output() searchTextChanged = new EventEmitter<string>();

  onSearchChange() 
  {
    this.searchTextChanged.emit(this.searchText.trim());
  }

  handleSearch(searchValue: string) 
  {
    this.searchText = searchValue;
  }
  
  constructor(
    private router: Router, 
    private dialog: MatDialog, 
    private labelService: LabelService
  ) { this.getAllLabels(); }
  
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

  // Set active tab 
  setActive(item: string) 
  {
    this.activeItem = item;

    if (item === 'Archive') 
    {
      this.showArchived = true;
      this.showTrash = false;
      this.showReminders = false;
      this.headerTitle = 'Archive';
    } 
    else if (item === 'Trash') 
    {
      this.showArchived = false;
      this.showTrash = true;
      this.showReminders = false;
      this.headerTitle = 'Trash';
    } 
    else if (item === 'Reminders') 
    {
      this.showArchived = false;
      this.showTrash = false;
      this.showReminders = true;
      this.headerTitle = 'Reminders';
    } 
    else if (item === 'Edit labels') 
    {
      const dialogRef = this.dialog.open(EditLabelComponent, 
      {
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(() => 
      {
        this.getAllLabels();  // Refresh labels after closing dialog
      });
      return;
    }
    else 
    {
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
    //to show spinner
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


  getAllLabels() 
  {
    this.labelService.getAllLabels().subscribe(
      (res: any) => {
        this.labels = res.map((label: any) => ({
          id: label.labelId,
          name: label.labelName
        }));
      },
      (err: any) => {
        console.error('Error fetching labels:', err);
      }
    );
  }

}