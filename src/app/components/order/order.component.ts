import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { HttpClient } from '@angular/common/http';

interface CartItem {
 productName: string;
 imageUrl: string;
 price: number;
 quantity: number;
}

@Component({
 selector: 'app-order',
 templateUrl: './order.component.html',
 styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
 cartItems: CartItem[] = [];
 totalValue: number = 0;
 showConfirmation: boolean = false;

 constructor(private cartService: CartService, private http: HttpClient) {}

 ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalValue = this.cartService.getTotalValue();
 }

 adjustQuantity(productName: string, quantity: number): void {
    this.cartService.adjustQuantity(productName, quantity);
    this.cartItems = this.cartService.getCartItems();
    this.totalValue = this.cartService.getTotalValue();
 }

 placeOrder(): void {
    this.showConfirmation = true;
 }

 confirmOrder(): void {
    this.showConfirmation = false;
    this.submitOrder();
 }

 cancelOrder(): void {
    this.showConfirmation = false;
 }

 private submitOrder(): void {
    const orderDetails = this.cartItems.map(item => {
      return {
        ProductId: 1, // Assuming a static ProductId for all products
        ProductName: item.productName,
        Quantity: item.quantity
      };
    });

    this.http.post('https://localhost:7171/api/Admin/Orders', orderDetails, { responseType: 'text' }).subscribe(
       response => {
         alert(response); 
         this.cartService.clearCart();
       },
       error => {
         alert('Failed to place order');
         console.error(error);
       }
    );
 }
}
