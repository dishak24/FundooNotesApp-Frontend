import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

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

    days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

    months = 
      [
          { value: 1, name: 'January' },
          { value: 2, name: 'February' },
          { value: 3, name: 'March' },
          { value: 4, name: 'April' },
          { value: 5, name: 'May' },
          { value: 6, name: 'June' },
          { value: 7, name: 'July' },
          { value: 8, name: 'August' },
          { value: 9, name: 'September' },
          { value: 10, name: 'October' },
          { value: 11, name: 'November' },
          { value: 12, name: 'December' }
      ];

    years: number[] = [];

    ngOnInit(): void 
    {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) 
      {
        this.years.push(i);
      }
      
    }

    constructor(private fb: FormBuilder, 
                private router: Router, 
                private user: UserService) 
    {
      this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        //dob: ['', Validators.required],
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, 
      { validator: this.passwordMatchValidator });
    
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

    //constructor(private router: Router) {}

    onCreateAccount() 
    {
      if (this.registerForm.valid)
      {
        const formData = this.registerForm.value;
        const dob = `${formData.day}-${formData.month}-${formData.year}`;

        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: dob,
          gender : formData.gender,
          email: formData.email,
          password: formData.password

        };

        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data saved to local storage:', userData);

        console.log("this.registerForm.value == ",this.registerForm.value);


        const payload = {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          //dob: this.registerForm.value.year + '-' + this.registerForm.value.month + '-' + this.registerForm.value.day,
          dob: new Date(this.registerForm.value.year, this.registerForm.value.month - 1, this.registerForm.value.day).toISOString(),
          gender: this.registerForm.value.gender,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        }

        //for checking payload values:
        console.log('Payload:', payload);

        this.user.register(payload).subscribe(
          {
          next: (result) => 
            {
            console.log('User registered successfully:', result);
            alert('User Registration  successfully !');
            // Navigate to the login page
            this.router.navigate(['login']);
           },
          error: (err) => 
            {
            console.error('Registering user Failed:', err);
            alert('Registering user Failed !!!!!');
            }
        })
      }
      
      // Navigate to the login page
      //this.router.navigate(['/login']);
    }

    

}
