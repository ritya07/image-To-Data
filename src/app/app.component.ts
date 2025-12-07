import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageToDataComponent } from './components/image-to-data/image-to-data';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailsComponent } from './components/product-details/product-details';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImageToDataComponent, ProductListComponent, ProductDetailsComponent],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  title = 'picture-to-data';
}
