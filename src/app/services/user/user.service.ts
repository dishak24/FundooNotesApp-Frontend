import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

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

}

