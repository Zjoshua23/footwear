export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: number[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: OrderItem[];
}

export enum AppView {
  HOME = 'HOME',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ORDER_HISTORY = 'ORDER_HISTORY'
}