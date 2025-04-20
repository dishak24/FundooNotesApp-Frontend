import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: FormGroup;
  hidePassword = true;
  //constructor(private router: Router) {}
  constructor(private fb: FormBuilder, private router: Router) {
    this.login = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() 
  {
    console.log(this.login.value);
  }

  onCreateAccount()
  {
    console.log('Create Account');
    this.router.navigate(['/register']);
  }
}
