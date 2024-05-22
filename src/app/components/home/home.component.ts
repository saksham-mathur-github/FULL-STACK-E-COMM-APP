import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentImageIndex = 0;
  images = [
    'https://picsum.photos/id/1084/1920/1080',
    'https://picsum.photos/id/218/1920/1080',
    'https://picsum.photos/id/203/1920/1080'
  ];

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 10000); // Change image every 10 seconds (adjust as needed)
  }

  showECommerceInfo() {
    // Add code here to display E-Commerce website information
    console.log('Display E-Commerce website information');
  }
}
