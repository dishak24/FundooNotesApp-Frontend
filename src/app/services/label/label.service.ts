import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  token: any;
    constructor( private http: HttpService) 
    {
      //to retrive token first from local storage
      this.token = localStorage.getItem('Token');
      console.log('Token:', this.token);
  
    }

  //Create Label
  createLabel(payload: { labelName: string })
  {
    let httpOptions = 
    {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.postApi(`/createLabel`, payload, httpOptions.headers);
  }

  //Get All Labels
  getAllLabels()
  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.getApi(`/getAllLabels`, httpOptions.headers);
  }

  // Update Label
  updateLabel(labelId: number, payload: { labelName: string }) 
  {
    let httpOptions = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.putApi(`/updateLabel/${labelId}`, payload, httpOptions.headers);
  }


// Delete label
  deleteLabel(labelId: number) 
  {
    let httpOptions = 
    {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.deleteApi(`/deleteLabel/${labelId}`, httpOptions.headers);
  }


  // Assign Label to a Note
  assignLabelToNote(noteId: number, labelName: string) {
    const payload = {
      noteId: noteId,
      labelName: labelName
    };
  
    console.log("Payload sent to backend:", payload); // Add this line
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
  
    return this.http.postApi(`/assignLabel`, payload, httpOptions.headers);
  }
  

  //removeLableFromNote
  // Assign Label to a Note
  removeLabelFromNote(noteId: number, labelId: number) 
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };

    // const payload = 
    // {
    //   noteId: noteId,
    //   labelId: labelId
    // };

    return this.http.deleteApi(`/removeLabelFromNote/${noteId}/${labelId}`,  httpOptions.headers);
  }


}
