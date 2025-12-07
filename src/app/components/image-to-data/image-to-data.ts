import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OcrService } from '../../services/ocr.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-image-to-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './image-to-data.html',
  styleUrl: './image-to-data.css'
})
export class ImageToDataComponent {
  imageForm: FormGroup;
  selectedFile: File | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private router: Router, private ocrService: OcrService, private dataService: DataService) {
    this.imageForm = new FormGroup({
      image: new FormControl(null)
    });
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.errorMessage = null;
    }
  }

  async convertToTable() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image first.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    try {
      const products = await this.ocrService.recognizeImage(this.selectedFile);
      this.dataService.setProducts(products);
      this.router.navigate(['/products']);
    } catch (error) {
      this.errorMessage = 'Error converting image to data. Please try again.';
      console.error('OCR Error:', error);
    } finally {
      this.loading = false;
    }
  }
}
