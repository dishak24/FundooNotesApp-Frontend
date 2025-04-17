import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component(
  {
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })

export class RegisterComponent 
{
    registerForm: FormGroup;
    hidePassword = true;
    hideConfirm = true;

    constructor(private fb: FormBuilder) 
    {
      this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

      
    }

    passwordMatchValidator(form: FormGroup) {
      const pass = form.get('password')?.value;
      const confirm = form.get('confirmPassword')?.value;
      return pass === confirm ? null : { mismatch: true };
    }
    

    onSubmit() 
    {
      if (this.registerForm.valid)
      {
        console.log('Form submitted:', this.registerForm.value);
      }
    }
}