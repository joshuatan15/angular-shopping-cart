import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productList: any = [];
  cartProductList: any = [];
  productCategory: any = ['All'];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProductListing();
  }

  // To get the product listing by reading a json file
  getProductListing(category?: string) {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        this.productList = data;
        this.productList.forEach((data: any) => {
          const productExistInCart = this.cartProductList.some(({ name }: any) => name === data.name); // find product by name
          data.isDisable = productExistInCart ? data.isDisable = true : data.isDisable = false;
          let i = this.productCategory.findIndex((x: any) => x == data.category);
          if (i <= -1) {
            this.productCategory.push(data.category);
          }
        })
        if (category && category !== 'All') {
          this.productList = this.productList.filter((data: any) => {
            return data.category == category;
          })
        }
      },
      error: (err) => {
        console.log(err, 'error')
      }
    });
  }

  // This will trigger when product is added to cart
  // If product existed in cart, will need to update the product count in cart
  addProductToCart(product: any) {
    if (!product.isDisable) {
      const productExistInCart = this.cartProductList.find(({ name }: any) => name === product.name); // find product by name
      if (!productExistInCart) {
        this.cartProductList.push({ ...product, count: 1 }); // enhance "product" object with "count" property
        this.enableOrDisableCartButton(product, true)
        return;
      }
      this.enableOrDisableCartButton(product, true)
      productExistInCart.count += 1;
    }
  }

  // To determine whether to enable or disable cart button when product is added to cart or remove from cart
  enableOrDisableCartButton(product: any, status: boolean) {
    const index = this.productList.findIndex((data: any) => data.id === product.id);
    if (index > -1) {
      this.productList[index].isDisable = status;
    }
  }

  // This will trigger when product count is zero in shopping cart
  removeProduct(product: any) {
    this.cartProductList = this.cartProductList.filter(({ name }: any) => name !== product.name)
    this.enableOrDisableCartButton(product, false)
  }

  // This is trigger once the user has select a category and it will fetch the product listing based on the category
  selectCategory(category: any) {
    this.getProductListing(category);
  }
}
