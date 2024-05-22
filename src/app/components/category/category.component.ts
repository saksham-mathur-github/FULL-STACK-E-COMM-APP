import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { ProductService } from 'src/app/product.service';

interface Product {
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = '';
  sortOptions = ['High to Low', 'Low to High']; // Array of sorting options
  selectedSort: string = this.sortOptions[0]; // Default sort option

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedCategory = params.get('category') || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProductsByCategory(this.selectedCategory).subscribe(products => {
      this.products = products;
    }, error => {
      console.error('Error fetching products:', error);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addProduct(product.productName, product.imageUrl, product.price);
  }

  sortProducts(event: any): void {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = this.sortOptions[selectedIndex];

    if (selectedOption === 'High to Low') {
      this.products.sort((a, b) => b.price - a.price); // Sort descending
    } else if (selectedOption === 'Low to High') {
      this.products.sort((a, b) => a.price - b.price); // Sort ascending
    }
  }
}
