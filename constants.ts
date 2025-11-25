import { Product, Order } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Strider X1',
    price: 129.99,
    category: 'Running',
    description: 'Engineered for the long haul. The Air Strider X1 features responsive cushioning and a breathable mesh upper for maximum comfort during your daily runs.',
    image: 'https://picsum.photos/400/400?random=1',
    sizes: [7, 8, 9, 10, 11, 12]
  },
  {
    id: '2',
    name: 'Urban Glide Low',
    price: 89.50,
    category: 'Casual',
    description: 'Street style meets everyday comfort. Minimalist design with a durable rubber sole, perfect for navigating the city jungle.',
    image: 'https://picsum.photos/400/400?random=2',
    sizes: [6, 7, 8, 9, 10]
  },
  {
    id: '3',
    name: 'Trail Blazer Pro',
    price: 159.00,
    category: 'Hiking',
    description: 'Conquer any terrain. Rugged traction, waterproof lining, and ankle support make the Trail Blazer Pro your best companion on the mountain.',
    image: 'https://picsum.photos/400/400?random=3',
    sizes: [8, 9, 10, 11, 12, 13]
  },
  {
    id: '4',
    name: 'Court King Elite',
    price: 110.00,
    category: 'Basketball',
    description: 'Dominate the court. High-top support with pivot-point traction patterns to enhance your agility and jump height.',
    image: 'https://picsum.photos/400/400?random=4',
    sizes: [9, 10, 11, 12]
  },
  {
    id: '5',
    name: 'Velvet Loafer',
    price: 200.00,
    category: 'Formal',
    description: 'Sophistication redefined. Premium velvet finish with leather lining, ideal for black-tie events and upscale gatherings.',
    image: 'https://picsum.photos/400/400?random=5',
    sizes: [7, 8, 9, 10]
  },
  {
    id: '6',
    name: 'Speed Demon 5',
    price: 145.00,
    category: 'Running',
    description: 'Our lightest racing shoe yet. Carbon fiber plate technology propels you forward with every stride.',
    image: 'https://picsum.photos/400/400?random=6',
    sizes: [6, 7, 8, 9, 10, 11]
  }
];

export const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7782-34',
    userId: '123',
    date: '2023-10-15',
    total: 219.50,
    status: 'Delivered',
    items: [
      {
        productId: '1',
        name: 'Air Strider X1',
        price: 129.99,
        quantity: 1,
        image: 'https://picsum.photos/400/400?random=1',
        selectedSize: 10
      },
      {
        productId: '2',
        name: 'Urban Glide Low',
        price: 89.50,
        quantity: 1,
        image: 'https://picsum.photos/400/400?random=2',
        selectedSize: 9
      }
    ]
  },
  {
    id: 'ORD-9921-11',
    userId: '123',
    date: '2023-11-05',
    total: 159.00,
    status: 'Processing',
    items: [
      {
        productId: '3',
        name: 'Trail Blazer Pro',
        price: 159.00,
        quantity: 1,
        image: 'https://picsum.photos/400/400?random=3',
        selectedSize: 11
      }
    ]
  }
];