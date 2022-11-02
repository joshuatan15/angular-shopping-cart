import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  currentRate = 0;

  constructor(
    public dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  // Close dialog box
  dismiss(): void {
    this.dialogRef.close();
  }

  // To calculate the average stars based on the total rating received for the a product
  calculateAverageStars() {
    return (this.data?.rating.reduce((acc: any, prod: any) => acc+= prod.stars ,0) / this.data?.rating.length).toFixed(2);
  }

}
