/**
 * Test data fixtures for consistent test data across the suite
 */

export const testData = {
  users: {
    validUser: {
      email: 'testuser@example.com',
      password: 'Test@123456',
      firstName: 'Test',
      lastName: 'User',
    },
    premiumUser: {
      email: 'premium@example.com',
      password: 'Premium@123',
      firstName: 'Premium',
      lastName: 'Member',
    },
    adminUser: {
      email: 'admin@example.com',
      password: 'Admin@123',
      firstName: 'Admin',
      lastName: 'User',
    },
  },

  shipping: {
    validAddress: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-123-4567',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    ukAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+44-20-1234-5678',
      address: '45 Baker Street',
      city: 'London',
      state: 'Greater London',
      zipCode: 'NW1 6XE',
      country: 'UK',
    },
    invalidAddress: {
      firstName: '',
      lastName: '',
      email: 'invalid-email',
      phone: '123',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  },

  payment: {
    validCard: {
      cardNumber: '4242424242424242',
      cardName: 'John Doe',
      expiryDate: '12/25',
      cvv: '123',
      billingZip: '10001',
    },
    invalidCard: {
      cardNumber: '1234567890123456',
      cardName: 'Test User',
      expiryDate: '01/20',
      cvv: '999',
      billingZip: '00000',
    },
    expiredCard: {
      cardNumber: '4242424242424242',
      cardName: 'John Doe',
      expiryDate: '12/20',
      cvv: '123',
      billingZip: '10001',
    },
  },

  products: {
    electronics: [
      {
        id: 1,
        name: 'Wireless Headphones',
        category: 'electronics',
        price: 79.99,
        inStock: true,
      },
      {
        id: 2,
        name: 'Bluetooth Speaker',
        category: 'electronics',
        price: 49.99,
        inStock: true,
      },
      {
        id: 3,
        name: 'Smart Watch',
        category: 'electronics',
        price: 199.99,
        inStock: false,
      },
    ],
    clothing: [
      {
        id: 10,
        name: 'Cotton T-Shirt',
        category: 'clothing',
        price: 19.99,
        inStock: true,
      },
      {
        id: 11,
        name: 'Denim Jeans',
        category: 'clothing',
        price: 59.99,
        inStock: true,
      },
    ],
  },

  promoCodes: {
    valid: 'SAVE10',
    expired: 'EXPIRED2023',
    invalid: 'NOTREAL',
    premium: 'PREMIUM20',
  },

  searchQueries: {
    popular: ['laptop', 'phone', 'headphones', 'watch'],
    niche: ['mechanical keyboard', 'noise cancelling', 'wireless charging'],
    noResults: ['xyzabc123nonexistent'],
  },
};

/**
 * API endpoint configurations
 */
export const apiEndpoints = {
  products: '/products',
  productById: (id: number) => `/products/${id}`,
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh-token',
    me: '/auth/me',
  },
  orders: '/orders',
  orderById: (id: number) => `/orders/${id}`,
  cart: '/cart',
  wishlist: '/wishlist',
};

/**
 * Test timeouts
 */
export const timeouts = {
  short: 5000,
  medium: 10000,
  long: 30000,
  apiCall: 5000,
  pageLoad: 15000,
};

/**
 * Error messages for validation
 */
export const errorMessages = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidCard: 'Invalid card number',
  paymentFailed: 'Payment processing failed',
  outOfStock: 'This item is currently out of stock',
  promoInvalid: 'Invalid promo code',
  promoExpired: 'This promo code has expired',
};

/**
 * Success messages
 */
export const successMessages = {
  addedToCart: 'Item added to cart',
  orderPlaced: 'Order placed successfully',
  accountCreated: 'Account created successfully',
  passwordReset: 'Password reset email sent',
};
