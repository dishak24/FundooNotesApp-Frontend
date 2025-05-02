import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit
{
  newLabel: string = '';
  labels: any[] = [];

  constructor(private dialogRef: MatDialogRef<EditLabelComponent>, private labelService: LabelService) {}

  ngOnInit(): void 
  {
    this.getAllLabels();
  }

  //add label api
  addLabel() 
  {
    if (!this.newLabel.trim()) 
    {
      return;
    }
       
    const payload = 
    { 
      labelName: this.newLabel.trim() 
    };

    this.labelService.createLabel(payload).subscribe(
    {
      next: (res: any) => 
      {
        this.labels.push(
        {
          id: res.labelId,
          name: res.labelName,
          editing: false
        });

        this.newLabel = '';
        this.getAllLabels();
      },
      
      error: (err) => 
      {
        console.error('Error creating label:', err);
      }
    });
  }

  //get all notes api
  getAllLabels() 
  {
    this.labelService.getAllLabels().subscribe(
    {
      next: (res: any) => 
      {
        this.labels = res.map((label: any) => (
        {
          id: label.labelId,
          name: label.labelName,
          editing: false
        }));
      },
      error: (err: any) => 
      {
        console.error('Error fetching labels:', err);
      }
    });
  }
  
  

  deleteLabel(index: number) 
  {
    const labelId = this.labels[index].id;
    this.labelService.deleteLabel(labelId).subscribe(
      () => this.labels.splice(index, 1),
      err => console.error('Delete failed:', err)
    );
  }

  toggleEdit(index: number) 
  {
    const label = this.labels[index];
    if (label.editing) 
    {
      this.updateLabel(label);
    }
    label.editing = !label.editing;
  }

  updateLabel(label: any) 
  {
    const payload = 
    {
      labelName: label.name.trim()
    };
    this.labelService.updateLabel(label.id, payload).subscribe(
      () => console.log('Label updated!'),
      err => console.error('Update failed:', err)
    );
  }

  cancelNewLabel() 
  {
    this.newLabel = '';
  }
}

