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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() 
  {
    console.log("Login data:", this.login.value);

    const payload = {
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
