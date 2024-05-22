import { Injectable } from '@angular/core';

interface CartItem {
 productName: string;
 imageUrl: string;
 price: number;
 quantity: number;
}

@Injectable({
 providedIn: 'root'
})
export class CartService {
 private cartItems: CartItem[] = [];
 private cartKey = 'cartItems';

 constructor() {
    this.loadCartItems();
 }

 // addProduct Method
addProduct(productName: string, imageUrl: string, price: number): void {
   const existingItem = this.cartItems.find(item => item.productName === productName);
   if (existingItem) {
     existingItem.quantity++;
   } else {
     this.cartItems.push({ productName, imageUrl, price, quantity: 1 });
   }
   this.saveCartItems();
}

 getCartItems(): CartItem[] {
    return this.cartItems;
 }

 getTotalValue(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
 }

 adjustQuantity(productName: string, quantity: number): void {
    const item = this.cartItems.find(item => item.productName === productName);
    if (item) {
      item.quantity = quantity;
    }
    this.saveCartItems();
 }

 clearCart(): void {
    this.cartItems = [];
    this.saveCartItems();
 }

 private saveCartItems(): void {
   localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
 }

 private loadCartItems(): void {
   const savedCartItems = localStorage.getItem(this.cartKey);
   if (savedCartItems) {
     this.cartItems = JSON.parse(savedCartItems);
   }
 }
}