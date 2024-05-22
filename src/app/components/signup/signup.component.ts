// signup.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/signup.service'; // Adjust the path as necessary
import { AuthService } from 'src/app/auth.service'; // Adjust the path as necessary

interface User {
 email: string;
 username: string;
 password: string;
 age?: number;
 gender: string;
 mobile: string;
 address: string;
 role?: string;
}

@Component({
 selector: 'app-signup',
 templateUrl: './signup.component.html',
 styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 user: User = {
    email: '',
    username: '',
    password: '',
    age: undefined,
    gender: '',
    mobile: '',
    address: '',
    role: 'User'
 };

 constructor(private router: Router, private signupService: SignupService, private authService: AuthService) {}

 onSubmit() {
    this.signupService.registerUser(this.user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.authService.signUpSuccess(); // Update authentication status
        this.router.navigate(['/signin']); // Example navigation to signin page
      },
      (error) => {
        console.error('Error registering user:', error);
        // Handle error, e.g., show a message to the user
      }
    );
 }
}
