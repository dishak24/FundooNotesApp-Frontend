import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService 
{
  token: any;
  constructor( private http: HttpService) 
  {
    //to retrive token first from local storage
    this.token = localStorage.getItem('Token');
    //to check if token is present or not
    console.log('Token:', this.token);

  }

  //create note 
  addNote(payload: any)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    
    return this.http.postApi('/addNote', payload, httpOption.headers);
  }


  // addNote(payload: any) {
  //   const headers = this.http.getHeaderToken();
  //   return this.http.postApi('/addNote', payload, headers);
  // }
  
//get all notes
  getAllNotes()
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.getApi('/getAllNotes', httpOption.headers);
  }

  //to archive note
  archiveNote(noteId: any)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.putApi(`/archive/${noteId}`,noteId, httpOption.headers);
  }

  trashNote(noteId: any)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.putApi(`/trash/${noteId}`,noteId, httpOption.headers);
  }

  //to delete note
  deleteNote(noteId: any)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.deleteApi(`/deleteNote/${noteId}`, httpOption.headers);
  }

  //update note
  updateNote(noteId: any, payload: any)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.putApi(`/updateNote/${noteId}`, payload, httpOption.headers);
  }

  //to add colour
  addColour(noteId: any, payload: any)
  {
    let httpOption = {
      headers: new HttpHeaders(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    console.log('Headers:', httpOption);
    return this.http.putApi(`/addColour/${noteId}`, payload, httpOption.headers);
  }

}
