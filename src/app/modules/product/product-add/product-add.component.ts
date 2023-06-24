import { Component, Inject, Optional } from '@angular/core';
import { Product } from '../Models/Product';
import { ProductService } from '../Services/ProductService';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  productForm!: FormGroup;
  product: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService, 
    private router: Router, 
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) {
      if(data){
        this.product=data;
      }
    }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [this.product?.id],
      name: [this.product?.name, Validators.required],
      description: [this.product?.description, Validators.required],

    });
  }

  onSubmit() {
    const product = this.productForm.value as Product;
    
    if (product.id) {
      this.productService.updateProduct(product).subscribe(
        () => console.log('Product updated successfully'),
        err => console.error(err)
      );
    } else {
      this.productService.addProduct(product).subscribe(
        () => console.log('Product added successfully'),
        err => console.error(err)
      );
    }
    this.router.navigate(['product/product-list']);
    this.productForm.reset();
  }

}
