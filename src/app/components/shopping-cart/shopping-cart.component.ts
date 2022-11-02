import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() products: any[];
  @Output() productRemoved = new EventEmitter();

  ngOnInit():void {
    
  }

  // Calculate the total item in cart
  calcTotal() {
    return this.products.reduce((acc, prod) => acc+= prod.count ,0)
  }

  // Calculate the total price amount of product
  calcAmountTotal() {
    return this.products.reduce((acc, prod) => acc+= (prod.price * prod.count) ,0)
  }

  // To remove the product from cart 
  removeProduct(product: any) {
    this.productRemoved.emit(product)
  }
}
