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

  // addNote(payload: any)
  // {
  //   let headers = {
  //     headers: new HttpHeaders(
  //     {
  //       'Authorization': `Bearer ${this.token}`,
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   console.log('Headers:', headers);
    
  //   return this.http.postApiToken('/addNote', payload, true, headers);
  // }


  addNote(payload: any) {
    const headers = this.http.getHeaderToken();
    return this.http.postApi('/addNote', payload, headers);
  }
  

  getAllNotes()
  {
    return this.http.getApi('/notes/getAllNotes');
  }

}
