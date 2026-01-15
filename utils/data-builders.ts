import { faker } from '@faker-js/faker';

/**
 * User Builder - Implements Builder Pattern for creating test users
 */
export class UserBuilder {
  private user: any = {
    email: faker.internet.email(),
    password: 'Test@123456',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
  };

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withPassword(password: string): this {
    this.user.password = password;
    return this;
  }

  withName(firstName: string, lastName: string): this {
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    return this;
  }

  withPhone(phone: string): this {
    this.user.phone = phone;
    return this;
  }

  asPremiumUser(): this {
    this.user.isPremium = true;
    this.user.subscriptionExpiry = faker.date.future();
    return this;
  }

  asAdmin(): this {
    this.user.role = 'admin';
    return this;
  }

  build() {
    return { ...this.user };
  }
}

/**
 * Address Builder - For creating shipping/billing addresses
 */
export class AddressBuilder {
  private address: any = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: 'USA',
  };

  withName(firstName: string, lastName: string): this {
    this.address.firstName = firstName;
    this.address.lastName = lastName;
    return this;
  }

  withEmail(email: string): this {
    this.address.email = email;
    return this;
  }

  withStreet(address: string): this {
    this.address.address = address;
    return this;
  }

  inCity(city: string): this {
    this.address.city = city;
    return this;
  }

  inState(state: string): this {
    this.address.state = state;
    return this;
  }

  withZipCode(zipCode: string): this {
    this.address.zipCode = zipCode;
    return this;
  }

  inCountry(country: string): this {
    this.address.country = country;
    return this;
  }

  asUSAddress(): this {
    this.address.country = 'USA';
    this.address.state = faker.location.state({ abbreviated: true });
    this.address.zipCode = faker.location.zipCode('#####');
    return this;
  }

  asUKAddress(): this {
    this.address.country = 'UK';
    this.address.state = faker.location.county();
    this.address.zipCode = faker.location.zipCode('??# #??');
    return this;
  }

  build() {
    return { ...this.address };
  }
}

/**
 * Product Builder - For creating test products
 */
export class ProductBuilder {
  private product: any = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    category: faker.commerce.department(),
    inStock: true,
    quantity: faker.number.int({ min: 1, max: 100 }),
    imageUrl: faker.image.url(),
    sku: faker.string.alphanumeric(10).toUpperCase(),
  };

  withName(name: string): this {
    this.product.name = name;
    return this;
  }

  withPrice(price: number): this {
    this.product.price = price;
    return this;
  }

  inCategory(category: string): this {
    this.product.category = category;
    return this;
  }

  outOfStock(): this {
    this.product.inStock = false;
    this.product.quantity = 0;
    return this;
  }

  withQuantity(quantity: number): this {
    this.product.quantity = quantity;
    return this;
  }

  withDiscount(discountPercent: number): this {
    this.product.originalPrice = this.product.price;
    this.product.price = this.product.price * (1 - discountPercent / 100);
    this.product.discount = discountPercent;
    return this;
  }

  asFeatured(): this {
    this.product.featured = true;
    return this;
  }

  withRating(rating: number, reviewCount: number): this {
    this.product.rating = rating;
    this.product.reviewCount = reviewCount;
    return this;
  }

  build() {
    return { ...this.product };
  }
}

/**
 * Order Builder - For creating test orders
 */
export class OrderBuilder {
  private order: any = {
    orderId: faker.string.alphanumeric(10).toUpperCase(),
    items: [],
    status: 'pending',
    createdAt: new Date(),
  };

  withOrderId(orderId: string): this {
    this.order.orderId = orderId;
    return this;
  }

  addItem(productId: number, quantity: number = 1, price?: number): this {
    this.order.items.push({
      productId,
      quantity,
      price: price || parseFloat(faker.commerce.price()),
    });
    return this;
  }

  withStatus(status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'): this {
    this.order.status = status;
    return this;
  }

  withShippingAddress(address: any): this {
    this.order.shippingAddress = address;
    return this;
  }

  withPaymentMethod(method: string): this {
    this.order.paymentMethod = method;
    return this;
  }

  withTotal(total: number): this {
    this.order.total = total;
    return this;
  }

  build() {
    // Calculate total if not set
    if (!this.order.total && this.order.items.length > 0) {
      this.order.total = this.order.items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
    }
    return { ...this.order };
  }
}

/**
 * Payment Builder - For creating payment details
 */
export class PaymentBuilder {
  private payment: any = {
    cardNumber: '4242424242424242', // Test card
    cardName: faker.person.fullName(),
    expiryDate: '12/25',
    cvv: '123',
    billingZip: faker.location.zipCode(),
  };

  withCardNumber(cardNumber: string): this {
    this.payment.cardNumber = cardNumber;
    return this;
  }

  withCardName(name: string): this {
    this.payment.cardName = name;
    return this;
  }

  withExpiry(month: string, year: string): this {
    this.payment.expiryDate = `${month}/${year}`;
    return this;
  }

  withCVV(cvv: string): this {
    this.payment.cvv = cvv;
    return this;
  }

  asExpired(): this {
    this.payment.expiryDate = '12/20';
    return this;
  }

  asInvalid(): this {
    this.payment.cardNumber = '1234567890123456';
    return this;
  }

  build() {
    return { ...this.payment };
  }
}

/**
 * Helper functions for quick data generation
 */

export function generateRandomUser() {
  return new UserBuilder().build();
}

export function generateRandomAddress() {
  return new AddressBuilder().build();
}

export function generateRandomProduct() {
  return new ProductBuilder().build();
}

export function generateRandomOrder(itemCount: number = 1) {
  const builder = new OrderBuilder();
  for (let i = 0; i < itemCount; i++) {
    builder.addItem(faker.number.int({ min: 1, max: 100 }));
  }
  return builder.build();
}

export function generateValidPayment() {
  return new PaymentBuilder().build();
}

/**
 * Generate bulk test data
 */
export function generateUsers(count: number) {
  return Array.from({ length: count }, () => generateRandomUser());
}

export function generateProducts(count: number, category?: string) {
  return Array.from({ length: count }, () => {
    const builder = new ProductBuilder();
    if (category) {
      builder.inCategory(category);
    }
    return builder.build();
  });
}

/**
 * Generate realistic product catalog
 */
export function generateProductCatalog() {
  return {
    electronics: generateProducts(10, 'electronics'),
    clothing: generateProducts(10, 'clothing'),
    home: generateProducts(10, 'home'),
    sports: generateProducts(10, 'sports'),
  };
}

/**
 * Generate search test data
 */
export function generateSearchScenarios() {
  return [
    { query: 'laptop', expectedResults: 5, category: 'electronics' },
    { query: 'shirt', expectedResults: 8, category: 'clothing' },
    { query: 'chair', expectedResults: 3, category: 'home' },
    { query: 'ball', expectedResults: 4, category: 'sports' },
    { query: 'nonexistent123xyz', expectedResults: 0, category: null },
  ];
}

/**
 * Generate price range test data
 */
export function generatePriceRanges() {
  return [
    { min: 0, max: 50, label: 'Under $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: 200, label: '$100 - $200' },
    { min: 200, max: 500, label: '$200 - $500' },
    { min: 500, max: 10000, label: 'Over $500' },
  ];
}
