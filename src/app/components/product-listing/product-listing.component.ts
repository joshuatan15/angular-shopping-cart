import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  @Input() productCategory: any[];
  @Input() products: any[];
  @Output() productAdded = new EventEmitter();
  @Output() categorySelection = new EventEmitter();

  ngOnInit():void {
    
  }

  // To emit the product detail to parent component which the product is added to cart
  addProductToCart(product: any) {
    this.productAdded.emit(product);
  }

  // To emit the category selection to parent component based on what the user has chose
  selectCategory(category: any) {
    this.categorySelection.emit(category);
  }

}
