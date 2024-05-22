// signup.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'https://localhost:7171/api/Admin/adduser';

@Injectable({
 providedIn: 'root'
})
export class SignupService {
 constructor(private http: HttpClient) { }

 registerUser(user: any) {
    return this.http.post<any>(apiUrl, user);
 }
}
