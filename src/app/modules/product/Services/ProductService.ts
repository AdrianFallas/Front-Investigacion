import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private product: Product[] = [
    
  ];

  private readonly products$ = new BehaviorSubject<Product[]>(this.product);

  getProduct() {
    return this.products$.asObservable();
  }

  addProduct(product: Product) {
    const id = this.product.length + 1;
    product.id=id;
    this.product.push({ ...product, id });
    this.products$.next(this.product);
    return this.products$.asObservable();
  }

  updateProduct(product: Product) {
    const index = this.product.findIndex(product => product.id === product.id);
    this.product[index] = product;
    this.products$.next(this.product);
    return this.products$.asObservable();
  }

  deleteProduct(id: number) {
    this.product = this.product.filter(product => product.id !== id);
    this.products$.next(this.product);
    return this.products$.asObservable();
  }
}
