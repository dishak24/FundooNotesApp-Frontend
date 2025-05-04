import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private snackBar: MatSnackBar
  ) 
  {
    this.login = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) // Basic email regex
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character
      ]]
    });
    
  }

  onSubmit() 
  {

    if (this.login.invalid) {
      const emailControl = this.login.get('email');
      const passwordControl = this.login.get('password');
  
      // Show specific snackbar message based on what’s wrong
      if (emailControl?.hasError('required')) 
      {
        this.snackBar.open('Email is required.', 'Close', 
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } 
      else if (emailControl?.hasError('pattern')) 
      {
        this.snackBar.open('Enter a valid email address.', 'Close', 
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } 
      else if (passwordControl?.hasError('required')) 
      {
        this.snackBar.open('Password is required.', 'Close', 
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } 
      else if (passwordControl?.hasError('pattern')) 
      {
        this.snackBar.open(
          'Password must be 8+ characters, with uppercase, lowercase, number, and special character.',
          'Close',
          {
            duration: 4000,
            panelClass: ['error-snackbar']
          }
        );
      }
      return;
    }
    console.log("Login data:", this.login.value);

    const payload = 
    {
      email: this.login.value.email,
      password: this.login.value.password
    };

    this.user.login(payload).subscribe({
      next: (result: any) => 
      {
        console.log('Login successful:', result);

        //Normalize token to ensure "Bearer " prefix
        // Clean token and store it in localStorage
        let token = result.data;
        if (token.startsWith('Bearer ')) 
        {
          token = token.replace('Bearer ', '');
        }
      // Store the token in localStorage
        localStorage.setItem('Token', token);

        this.snackBar.open('Login successful!', 'Close', 
        {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);

        this.snackBar.open('Login failed!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onCreateAccount() {
    console.log('Create Account');
    this.router.navigate(['/register']);
  }
}
