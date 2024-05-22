import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
 selector: 'app-nav',
 templateUrl: './nav.component.html',
 styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
 categories: any[] = [];
 isAuthenticated: boolean | undefined;
 unsubscribe$ = new Subject<void>();

 constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
 ) {}

 ngOnInit(): void {
    this.loadCategories();
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
 }

 ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
 }

 loadCategories(): void {
    this.productService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(categories => {
        this.categories = categories;
      });
 }

 signOut() {
    // Use JavaScript's confirm dialog for simple confirmation
    if (confirm('Do you want to sign-out from current UserID?')) {
      this.authService.deleteUser().subscribe(
        (response: string) => {
          if (response === 'User Deleted Successfully') {
            this.authService.signOut()
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe(
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
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
 }
}
