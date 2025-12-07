import { Injectable } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  constructor() { }

  async recognizeImage(image: File): Promise<Product[]> {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(image);
    console.log('Raw OCR Text:', text); // Log raw OCR text
    await worker.terminate();

    const products: Product[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');

    const tableStartIndex = lines.findIndex(line => line.includes('ITEMS') && line.includes('DESCRIPTION') && line.includes('QUANTITY') && line.includes('PRICE') && line.includes('TAX') && line.includes('AMOUNT'));

    if (tableStartIndex !== -1) {
      const tableHeaders = lines[tableStartIndex];
      const headerMap: { [key: string]: number } = {};
      // Simple split, might need regex for more robust column splitting
      const headers = tableHeaders.split(/\s{2,}/).filter(h => h.trim() !== '');
      let currentOffset = 0;
      headers.forEach(header => {
        const index = tableHeaders.indexOf(header, currentOffset);
        if (index !== -1) {
          headerMap[header] = index;
          currentOffset = index + header.length;
        }
      });

      for (let i = tableStartIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        // Stop if we hit NOTES or TOTAL, assuming table ends before these
        if (line.includes('NOTES:') || line.includes('TOTAL')) {
          break;
        }

        // Attempt to parse product data based on column positions
        const itemMatch = line.match(/(Item \d+)/);
        if (itemMatch) {
          const productName = itemMatch[0];
          let description = '';
          let quantity = 0;
          let price = 0;

          const descriptionStart = headerMap['DESCRIPTION'];
          const quantityStart = headerMap['QUANTITY'];
          const priceStart = headerMap['PRICE'];
          const taxStart = headerMap['TAX'];
          const amountStart = headerMap['AMOUNT'];

          if (descriptionStart !== undefined && quantityStart !== undefined) {
            description = line.substring(descriptionStart, quantityStart).trim();
          }
          if (quantityStart !== undefined && priceStart !== undefined) {
            const quantityStr = line.substring(quantityStart, priceStart).trim();
            quantity = parseInt(quantityStr) || 0;
          }
          if (priceStart !== undefined && taxStart !== undefined) {
            const priceStr = line.substring(priceStart, taxStart).replace('$', '').trim();
            price = parseFloat(priceStr) || 0;
          }

          products.push({
            id: Math.random().toString(36).substring(2, 9),
            productName: productName,
            category: 'Scanned',
            quantity: quantity,
            price: price,
            description: description,
          });
        }
      }
    }
    return products;
  }
}
