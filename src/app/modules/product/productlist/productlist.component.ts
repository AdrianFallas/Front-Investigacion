import { Component } from '@angular/core';
import { Product } from '../Models/Product';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductService } from '../Services/ProductService';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  product: Product[] = [];

  constructor(private dialog: MatDialog, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProduct().subscribe(
      data => this.product = data,
      err => console.error(err)
    );
  }

  editProduct(product: Product) {
    console.log(product.id);
    const dialogRef = this.dialog.open(ProductAddComponent, { data: product });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProduct();
      }
    });
  }

  deleteProduct(product: Product) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.loadProduct();
        },
        (        err: any) => console.error(err)
      );
    }
  }
}
