import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  token: any;
    constructor( private http: HttpService) 
    {
      //to retrive token first from local storage
      this.token = localStorage.getItem('Token');
      console.log('Token:', this.token);
  
    }

    //create note 
      addCollaborator(noteId: any, payload: any)
      {
        let httpOption = {
          headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          })
        };
        console.log('Headers:', httpOption);
        
        return this.http.postApi(`/addCollaborator/${noteId}`, payload, httpOption.headers);
      }
}
