import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class ProductService {
 private apiUrl = 'https://localhost:7171/api/Admin';

 constructor(private http: HttpClient) { }

 
 getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`);
 }

 
 
 // Add this method to fetch categories
getCategories(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getCategories`);
 }
 
 // Assuming the backend API accepts category names
 getProductsByCategory(categoryName: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/products/category/${categoryName}`)
     .pipe(
       catchError(error => {
         console.error('Error fetching products:', error);
         return throwError(error);
       })
     );
 }
  
}
