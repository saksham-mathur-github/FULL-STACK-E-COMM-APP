import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and RoutesIMP 
import { HttpClientModule } from '@angular/common/http'; // For API calls
import { FormsModule } from '@angular/forms';
import { NewsService } from './news.service';
import { SignupService } from './signup.service';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ClubComponent } from './components/club/club.component';
import { NewsComponent } from './components/news/news.component';
import { CategoryComponent } from './components/category/category.component';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route to HomeComponent
  { path: 'nav', component: NavComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'aboutus', component: AboutusComponent, canActivate: [AuthGuard] },
  { path: 'club', component: ClubComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'category/:category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] }
    
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SignupComponent,
    SigninComponent,
    AboutusComponent,
    ClubComponent,
    NewsComponent,
    CategoryComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
    
  ],
  providers: [NewsService, SignupService, CartService, ProductService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
