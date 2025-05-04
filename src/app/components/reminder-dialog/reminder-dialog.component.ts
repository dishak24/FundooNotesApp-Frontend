import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.scss']
})
export class ReminderDialogComponent 
{
  remainder = {
    date: '',
    time: ''
  };

  constructor(
              private dialogRef: MatDialogRef<ReminderDialogComponent>,
              private snackBar: MatSnackBar,
              private service : NoteService,
              @Inject(MAT_DIALOG_DATA) public data: any
             ) {}

             
  save() 
  {
    
    const date = new Date(this.remainder.date);
  
    if (!date || !this.remainder.time) 
    {
      this.snackBar.open('Date or time is missing', 'Close', { duration: 3000 });
      return;
    }
  
    const hours = parseInt(this.remainder.time.split(':')[0]);
    const minutes = parseInt(this.remainder.time.split(':')[1]);
  
    date.setHours(hours, minutes, 0, 0);
  
    // Convert the date to UTC before sending it to the backend
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  
    const combinedString = utcDate.toISOString(); // Use ISO string format
  
    const payload = 
    { 
      reminder: combinedString 
    };
  
    this.service.addReminder(this.data.noteId, payload).subscribe(
    {
      next: () => 
      {
        this.snackBar.open('Reminder added', 'Close', { duration: 3000 });
        this.dialogRef.close(utcDate);
      },
      error: () => 
      {
        this.snackBar.open('Failed to add reminder', 'Close', { duration: 3000 });
      }
    });
  }    
    

}
