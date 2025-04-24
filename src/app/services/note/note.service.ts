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

}
