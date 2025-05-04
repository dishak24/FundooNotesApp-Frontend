import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent 
{
  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>) {}

  onLogout() 
  {
    this.dialogRef.close(true);
  }

  onCancel() 
  {
    this.dialogRef.close(false);
  }

}
