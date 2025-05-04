import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    constructor(
                private fb: FormBuilder, 
                private router: Router, 
                private user: UserService,
                private snackBar: MatSnackBar) 
    {
      this.registerForm = this.fb.group({
        firstName: ['', [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/) // only letters
        ]],
        lastName: ['', [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/) // only letters
        ]],
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ]],
        password: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
        ]],
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

    onCreateAccount() 
    {
      if (this.registerForm.invalid) 
      {
        const controls = this.registerForm.controls;
    
        if (controls['firstName'].errors?.['required']) 
        {
          this.snackBar.open('First name is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['firstName'].errors?.['pattern']) 
        {
          this.snackBar.open('First name should contain only letters.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['lastName'].errors?.['required']) 
        {
          this.snackBar.open('Last name is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['lastName'].errors?.['pattern']) 
        {
          this.snackBar.open('Last name should contain only letters.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['email'].errors?.['required']) 
        {
          this.snackBar.open('Email is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['email'].errors?.['pattern']) 
        {
          this.snackBar.open('Enter a valid email address.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['password'].errors?.['required']) 
        {
          this.snackBar.open('Password is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['password'].errors?.['pattern']) 
        {
          this.snackBar.open('Password must be 8+ characters with uppercase, lowercase, number, and special character.', 'Close', { duration: 4000, panelClass: ['error-snackbar'] });
        } 
        else if (controls['confirmPassword'].errors?.['required']) 
        {
          this.snackBar.open('Please confirm your password.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (this.registerForm.errors?.['mismatch']) 
        {
          this.snackBar.open('Passwords do not match.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (!controls['day'].value || !controls['month'].value || !controls['year'].value) 
        {
          this.snackBar.open('Complete your date of birth.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        } 
        else if (!controls['gender'].value) 
        {
          this.snackBar.open('Gender is required.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        }
        return;
      }
      
    
        const formData = this.registerForm.value;
        const dob = `${formData.day}-${formData.month}-${formData.year}`;
    
        const userData = 
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: dob,
          gender: formData.gender,
          email: formData.email,
          password: formData.password
        };
    
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data saved to local storage:', userData);
    
        const payload = 
        {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          dob: new Date(this.registerForm.value.year, this.registerForm.value.month - 1, this.registerForm.value.day).toISOString(),
          gender: this.registerForm.value.gender,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        };
    
        // Checking payload values
        console.log('Payload:', payload);
    
        this.user.register(payload).subscribe(
        {
          next: (result) => 
          {
            console.log('User registered successfully!', result);
            
            // Show success Snackbar
            this.snackBar.open('Registration successful !', 'Close', 
            {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
    
            // Navigate to the login page
            this.router.navigate(['login']);
          },
          error: (err) => {
            console.error('Registering user Failed !!', err);
          
            let errorMsg = 'Registration failed. Please try again.';
          
            if (err?.error?.message?.includes('Email already exist')) {
              errorMsg = 'This email is already registered. Please use another one.';
            }
          
            this.snackBar.open(errorMsg, 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
          
        });
      
    }
    

    

}
