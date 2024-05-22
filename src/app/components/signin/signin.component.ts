// signin.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

interface Credentials {
 email: string;
 password: string;
}

@Component({
 selector: 'app-signin',
 templateUrl: './signin.component.html',
 styleUrls: ['./signin.component.css']
})
export class SigninComponent {
 credentials: Credentials = {
    email: '',
    password: ''
 };
 message: string = '';

 constructor(private router: Router, private authService: AuthService) {}

 onSubmit() {
    this.authService.signIn(this.credentials).subscribe(
      (response: string) => {
        if (response === 'Signin Successful') {
          this.message = 'Signin Successful';
          this.router.navigate(['/dashboard']);
        } else {
          this.message = 'Signin failed due to Incorrect Details';
        }
      },
      (error) => {
        console.error('Error signing in:', error);
        this.message = 'Signin failed due to Incorrect Details';
      }
    );
 }

 signOut() {
    this.authService.signOut().subscribe(
      (response: string) => {
        if (response === 'Signout Successful') {
          this.router.navigate(['/signin']);
        }
      },
      (error) => {
        console.error('Error signing out:', error);
      }
    );
 }
}
