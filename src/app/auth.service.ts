// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 private apiUrlSignIn = 'https://localhost:7171/api/User/signin';
 private apiUrlSignOut = 'https://localhost:7171/api/User/signout';
 private apiUrlDeleteUser = 'https://localhost:7171/api/User/delete'; // Add this line
 private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
 public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

 constructor(private http: HttpClient) { }

  signIn(credentials: { email: string, password: string }): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    };
    return this.http.post<string>(this.apiUrlSignIn, credentials, httpOptions).pipe(
      tap(response => {
        if (response === 'Signin Successful') {
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

 // Method to handle sign-up success
 signUpSuccess(): void {
  this.isAuthenticatedSubject.next(true);
}

 signOut(): Observable<string> {
  return this.http.post<string>(this.apiUrlSignOut, {}).pipe(
    tap(response => {
      if (response === 'Signout Successful') {
        this.isAuthenticatedSubject.next(false);
      }
    })
  );
}

deleteUser(): Observable<string> {
  // Retrieve the JWT token from local storage or cookies
  const token = localStorage.getItem('token'); // Ensure this matches how you store the token
 
  // Include the token in the request headers
  const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}` // Include the token in the Authorization header
     })
  };
 
  // Use DELETE method and include the httpOptions
  return this.http.delete<string>(this.apiUrlDeleteUser, httpOptions).pipe(
     tap(response => {
       if (response === 'User Deleted Successfully') {
         this.isAuthenticatedSubject.next(false);
       }
     })
  );
  }
  
 }