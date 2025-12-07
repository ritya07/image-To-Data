import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Import MatSlideToggleModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule, CurrencyPipe } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';
import { Product, MOCK_PRODUCTS } from '../../models/product.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule, // Add MatCardModule here
    MatSlideToggleModule, // Add MatSlideToggleModule here
    FormsModule, // Add FormsModule here
    CommonModule, // Add CommonModule here
    CurrencyPipe
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['productName', 'category', 'quantity', 'price'];
  dataSource = new MatTableDataSource<Product>([]);
  isGridView: boolean = false; // Property to control the view toggle

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    const products = this.dataService.getProducts();
    if (products && products.length > 0) {
      this.dataSource.data = products;
    } else {
      // Fallback to mock data if no data from OCR, for initial development/testing
      // this.router.navigate(['/upload']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClicked(row: Product) {
    this.router.navigate(['/products', row.id]);
  }

  totalProducts(): number {
    return this.dataSource.filteredData.length;
  }

  totalInventoryValue(): number {
    return this.dataSource.filteredData.reduce((acc, product) => acc + (product.quantity * product.price), 0);
  }

  numberOfCategories(): number {
    const categories = new Set<string>();
    this.dataSource.filteredData.forEach(product => categories.add(product.category));
    return categories.size;
  }

  downloadCsv(): void {
    const header = ['Product Name', 'Category', 'Quantity', 'Price', 'Description'];
    const rows = this.dataSource.filteredData.map(p => [
      p.productName,
      p.category,
      p.quantity,
      p.price,
      p.description || ''
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + header.join(',') + '\n';
    rows.forEach(rowArray => {
      let row = rowArray.join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
