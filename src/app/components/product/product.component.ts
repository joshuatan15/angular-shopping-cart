import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Output() productAdded = new EventEmitter();

  constructor(public dialog: MatDialog) {

  }

  ngOnInit():void {
  }

  // Emit an event to tell parent that a product is added to cart
  addProductToCart(product: any) {
    this.productAdded.emit(product);
  }

  // To open a dialog pop up to show the rating of the product
  viewRating(product: any) {
    const dialogRef = this.dialog.open(RatingComponent, {
      width: '500px',
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
