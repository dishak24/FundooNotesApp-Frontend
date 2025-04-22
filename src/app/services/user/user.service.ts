import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
//

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpService) { }

  register(payload: any)
  {
   //return this.http.postApi('https://localhost:44326/register', payload);
   return this.http.postApi('/register', payload);
  }

  login(payload: any)
  {
   //return this.http.postApi('https://localhost:44326/register', payload);
   return this.http.postApi('/login', payload);
  }

  addNote(payload: any)
  {
    //to retrive token first from local storage
    const token = localStorage.getItem('Token');
    //to check if token is present or not
    console.log('Token:', token); 
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.postApi('/addNote', payload);
  }

  getAllNotes()
  {
    return this.http.getApi('/notes/getAllNotes');
  }
  

}

