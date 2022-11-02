import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() item: any;
  @Output() productRemoved = new EventEmitter();
  totalAmount = 0;

  ngOnInit():void {
    this.getTotalAmountPerItem();
  }

  // To check the quanity of an item added to the cart, once quantity is 0, emit an event to parent in order to remove from cart
  countChanged() {
     if (this.item.count === 0) {
      this.productRemoved.emit(this.item)
     }
     this.getTotalAmountPerItem();
  }

  // To calculate the total price based on te total quantity of an item
  getTotalAmountPerItem() {
    this.totalAmount = this.item.count * this.item.price;
  }
}
