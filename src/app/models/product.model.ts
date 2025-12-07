export interface Product {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  price: number;
  description?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', productName: 'Laptop', category: 'Electronics', quantity: 10, price: 1200, description: 'Powerful laptop for everyday use.' },
  { id: '2', productName: 'Mouse', category: 'Electronics', quantity: 50, price: 25, description: 'Ergonomic wireless mouse.' },
  { id: '3', productName: 'Keyboard', category: 'Electronics', quantity: 30, price: 75, description: 'Mechanical keyboard with RGB lighting.' },
  { id: '4', productName: 'Monitor', category: 'Electronics', quantity: 15, price: 300, description: '27-inch 4K monitor.' },
  { id: '5', productName: 'Webcam', category: 'Electronics', quantity: 20, price: 60, description: 'Full HD webcam.' },
  { id: '6', productName: 'Desk', category: 'Furniture', quantity: 5, price: 250, description: 'Spacious office desk.' },
  { id: '7', productName: 'Chair', category: 'Furniture', quantity: 8, price: 150, description: 'Comfortable office chair.' },
  { id: '8', productName: 'Headphones', category: 'Audio', quantity: 40, price: 100, description: 'Noise-cancelling headphones.' },
  { id: '9', productName: 'Microphone', category: 'Audio', quantity: 25, price: 80, description: 'USB condenser microphone.' },
  { id: '10', productName: 'Speaker', category: 'Audio', quantity: 18, price: 120, description: 'Portable Bluetooth speaker.' },
];
