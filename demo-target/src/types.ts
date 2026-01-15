export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  billingZip: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  createdAt: string;
}
