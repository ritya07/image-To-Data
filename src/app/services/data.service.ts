import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private extractedProducts: Product[] = [];

  constructor() { }

  setProducts(products: Product[]) {
    this.extractedProducts = products;
  }

  getProducts(): Product[] {
    return this.extractedProducts;
  }
}
