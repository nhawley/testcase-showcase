import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 79.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: 2,
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with 360° sound',
    price: 49.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    inStock: true,
    rating: 4.3,
    reviewCount: 89,
  },
  {
    id: 3,
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 199.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    inStock: true,
    rating: 4.7,
    reviewCount: 256,
  },
  {
    id: 4,
    name: 'Laptop Backpack',
    description: 'Water-resistant backpack with USB charging port',
    price: 39.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    inStock: true,
    rating: 4.4,
    reviewCount: 67,
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    description: 'RGB gaming keyboard with Cherry MX switches',
    price: 129.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
    inStock: true,
    rating: 4.8,
    reviewCount: 342,
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 29.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    inStock: true,
    rating: 4.2,
    reviewCount: 156,
  },
  {
    id: 7,
    name: 'USB-C Hub',
    description: '7-in-1 USB-C adapter with HDMI, USB 3.0, and SD card reader',
    price: 34.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    inStock: true,
    rating: 4.6,
    reviewCount: 94,
  },
  {
    id: 8,
    name: 'Webcam 1080p',
    description: 'Full HD webcam with auto-focus and dual microphones',
    price: 59.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
    inStock: false,
    rating: 4.5,
    reviewCount: 178,
  },
  {
    id: 9,
    name: 'Phone Stand',
    description: 'Adjustable aluminum phone holder for desk',
    price: 19.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500',
    inStock: true,
    rating: 4.1,
    reviewCount: 45,
  },
  {
    id: 10,
    name: 'Laptop Sleeve',
    description: 'Padded 15.6" laptop case with extra pocket',
    price: 24.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
    inStock: true,
    rating: 4.3,
    reviewCount: 83,
  },
  {
    id: 11,
    name: 'Wireless Charger',
    description: 'Fast charging wireless pad for smartphones',
    price: 22.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1591290619762-c588aaf1171e?w=500',
    inStock: true,
    rating: 4.4,
    reviewCount: 112,
  },
  {
    id: 12,
    name: 'Cable Organizer',
    description: 'Set of 5 cable clips for desk management',
    price: 9.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    inStock: true,
    rating: 4.0,
    reviewCount: 34,
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};
