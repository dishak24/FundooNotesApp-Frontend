import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

// interface LoginResponse {
//   success: boolean;
//   message: string;
//   data: string; // JWT token
// }


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  login: FormGroup;
  hidePassword = true;
  //constructor(private router: Router) {}
  constructor(private fb: FormBuilder, 
              private router: Router,
              private user: UserService) {
    this.login = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() 
  {
    console.log("Login data:",this.login.value);

    const payload={
      email: this.login.value.email,
      password : this.login.value.password
    }
    
    // For example, you can call a service to authenticate the user
    this.user.login(payload).subscribe( {
      next : (result) => {
        console.log('Login successful:', result);
        
        //To store token in local storage
        //const token = result.data; 
        //localStorage.setItem('authToken', token);

        alert('Login successful !');
        this.router.navigate(['/dashboard']);
      },
      error : (error)=>
      {
        console.error('Login failed:', error);
        alert('Login failed !!!!');
      }

    })


    //to store token in laocal storage
    // Assuming 'response' is your login response
    //const token = response.data; // or response['data']
    //localStorage.setItem('authToken', token);

  }

  onCreateAccount()
  {
    console.log('Create Account');
    this.router.navigate(['/register']);
  }
}
