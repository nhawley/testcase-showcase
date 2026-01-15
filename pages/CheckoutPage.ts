import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

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

/**
 * CheckoutPage - Handles checkout flow including shipping and payment
 */
export class CheckoutPage extends BasePage {
  // Shipping form locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateSelect: Locator;
  readonly zipCodeInput: Locator;
  readonly countrySelect: Locator;
  readonly continueToPaymentButton: Locator;

  // Shipping method locators
  readonly standardShipping: Locator;
  readonly expressShipping: Locator;
  readonly overnightShipping: Locator;

  // Payment form locators
  readonly cardNumberInput: Locator;
  readonly cardNameInput: Locator;
  readonly expiryDateInput: Locator;
  readonly cvvInput: Locator;
  readonly billingZipInput: Locator;
  readonly sameAsShippingCheckbox: Locator;
  readonly placeOrderButton: Locator;

  // Order summary locators
  readonly orderSummary: Locator;
  readonly subtotal: Locator;
  readonly shippingCost: Locator;
  readonly tax: Locator;
  readonly totalAmount: Locator;
  readonly promoCodeInput: Locator;
  readonly applyPromoButton: Locator;
  readonly promoDiscount: Locator;

  // Order confirmation locators
  readonly orderConfirmation: Locator;
  readonly orderNumber: Locator;
  readonly confirmationEmail: Locator;
  readonly trackOrderButton: Locator;

  // Error messages
  readonly validationErrors: Locator;
  readonly paymentError: Locator;

  constructor(page: Page) {
    super(page);

    // Shipping form
    this.firstNameInput = page.locator('[data-testid="first-name"]');
    this.lastNameInput = page.locator('[data-testid="last-name"]');
    this.emailInput = page.locator('[data-testid="email"]');
    this.phoneInput = page.locator('[data-testid="phone"]');
    this.addressInput = page.locator('[data-testid="address"]');
    this.cityInput = page.locator('[data-testid="city"]');
    this.stateSelect = page.locator('[data-testid="state"]');
    this.zipCodeInput = page.locator('[data-testid="zip-code"]');
    this.countrySelect = page.locator('[data-testid="country"]');
    this.continueToPaymentButton = page.locator('[data-testid="continue-to-payment"]');

    // Shipping methods
    this.standardShipping = page.locator('[data-testid="shipping-standard"]');
    this.expressShipping = page.locator('[data-testid="shipping-express"]');
    this.overnightShipping = page.locator('[data-testid="shipping-overnight"]');

    // Payment form
    this.cardNumberInput = page.locator('[data-testid="card-number"]');
    this.cardNameInput = page.locator('[data-testid="card-name"]');
    this.expiryDateInput = page.locator('[data-testid="expiry-date"]');
    this.cvvInput = page.locator('[data-testid="cvv"]');
    this.billingZipInput = page.locator('[data-testid="billing-zip"]');
    this.sameAsShippingCheckbox = page.locator('[data-testid="same-as-shipping"]');
    this.placeOrderButton = page.locator('[data-testid="place-order"]');

    // Order summary
    this.orderSummary = page.locator('[data-testid="order-summary"]');
    this.subtotal = page.locator('[data-testid="subtotal"]');
    this.shippingCost = page.locator('[data-testid="shipping-cost"]');
    this.tax = page.locator('[data-testid="tax"]');
    this.totalAmount = page.locator('[data-testid="total-amount"]');
    this.promoCodeInput = page.locator('[data-testid="promo-code"]');
    this.applyPromoButton = page.locator('[data-testid="apply-promo"]');
    this.promoDiscount = page.locator('[data-testid="promo-discount"]');

    // Order confirmation
    this.orderConfirmation = page.locator('[data-testid="order-confirmation"]');
    this.orderNumber = page.locator('[data-testid="order-number"]');
    this.confirmationEmail = page.locator('[data-testid="confirmation-email"]');
    this.trackOrderButton = page.locator('[data-testid="track-order"]');

    // Errors
    this.validationErrors = page.locator('[data-testid="validation-error"]');
    this.paymentError = page.locator('[data-testid="payment-error"]');
  }

  /**
   * Navigate to checkout page
   */
  async navigate() {
    await this.goto('/checkout');
  }

  /**
   * Fill shipping address form - Fluent interface
   */
  async fillShippingAddress(address: ShippingAddress): Promise<this> {
    await this.firstNameInput.fill(address.firstName);
    await this.lastNameInput.fill(address.lastName);
    await this.emailInput.fill(address.email);
    await this.phoneInput.fill(address.phone);
    await this.addressInput.fill(address.address);
    await this.cityInput.fill(address.city);
    await this.stateSelect.selectOption(address.state);
    await this.zipCodeInput.fill(address.zipCode);
    await this.countrySelect.selectOption(address.country);
    
    return this;
  }

  /**
   * Select shipping method - Fluent interface
   */
  async selectShippingMethod(method: 'standard' | 'express' | 'overnight'): Promise<this> {
    switch (method) {
      case 'standard':
        await this.standardShipping.click();
        break;
      case 'express':
        await this.expressShipping.click();
        break;
      case 'overnight':
        await this.overnightShipping.click();
        break;
    }
    
    // Wait for shipping cost to update
    await this.page.waitForTimeout(500);
    return this;
  }

  /**
   * Continue to payment - Fluent interface
   */
  async continueToPayment(): Promise<this> {
    await this.continueToPaymentButton.click();
    await this.page.waitForURL('**/checkout/payment');
    return this;
  }

  /**
   * Fill payment details - Fluent interface
   */
  async fillPaymentDetails(payment: PaymentDetails): Promise<this> {
    await this.cardNumberInput.fill(payment.cardNumber);
    await this.cardNameInput.fill(payment.cardName);
    await this.expiryDateInput.fill(payment.expiryDate);
    await this.cvvInput.fill(payment.cvv);
    await this.billingZipInput.fill(payment.billingZip);
    
    return this;
  }

  /**
   * Use same address for billing - Fluent interface
   */
  async useSameAddressForBilling(): Promise<this> {
    await this.sameAsShippingCheckbox.check();
    return this;
  }

  /**
   * Apply promo code - Fluent interface
   */
  async applyPromoCode(code: string): Promise<this> {
    await this.promoCodeInput.fill(code);
    await this.applyPromoButton.click();
    
    // Wait for discount to be applied
    await this.page.waitForTimeout(1000);
    return this;
  }

  /**
   * Place order - Fluent interface
   */
  async placeOrder(): Promise<this> {
    await this.placeOrderButton.click();
    
    // Wait for order processing
    await this.page.waitForURL('**/order-confirmation/**', { timeout: 30000 });
    return this;
  }

  /**
   * Complete entire checkout flow - Fluent chaining example
   */
  async completeCheckout(
    address: ShippingAddress,
    payment: PaymentDetails,
    shippingMethod: 'standard' | 'express' | 'overnight' = 'standard',
    promoCode?: string
  ): Promise<string> {
    await this.fillShippingAddress(address);
    await this.selectShippingMethod(shippingMethod);
    await this.continueToPayment();
    await this.fillPaymentDetails(payment);
    await this.useSameAddressForBilling();
    
    if (promoCode) {
      await this.applyPromoCode(promoCode);
    }
    
    await this.placeOrder();
    
    return await this.getOrderNumber();
  }

  /**
   * Get order summary details
   */
  async getOrderSummary() {
    return {
      subtotal: await this.getAmount(this.subtotal),
      shipping: await this.getAmount(this.shippingCost),
      tax: await this.getAmount(this.tax),
      total: await this.getAmount(this.totalAmount),
      discount: await this.getAmount(this.promoDiscount),
    };
  }

  /**
   * Helper to extract amount from locator
   */
  private async getAmount(locator: Locator): Promise<number> {
    try {
      const text = await locator.textContent();
      return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
    } catch {
      return 0;
    }
  }

  /**
   * Verify order confirmation is displayed
   */
  async verifyOrderConfirmation(): Promise<boolean> {
    return await this.orderConfirmation.isVisible();
  }

  /**
   * Get order number from confirmation page
   */
  async getOrderNumber(): Promise<string> {
    const text = await this.orderNumber.textContent();
    return text?.replace(/[^0-9]/g, '') || '';
  }

  /**
   * Get confirmation email
   */
  async getConfirmationEmail(): Promise<string> {
    return await this.confirmationEmail.textContent() || '';
  }

  /**
   * Click track order button
   */
  async trackOrder() {
    await this.trackOrderButton.click();
  }

  /**
   * Get validation errors
   */
  async getValidationErrors(): Promise<string[]> {
    const errors = await this.validationErrors.all();
    return await Promise.all(errors.map(e => e.textContent())) as string[];
  }

  /**
   * Check if payment error is displayed
   */
  async hasPaymentError(): Promise<boolean> {
    return await this.paymentError.isVisible();
  }

  /**
   * Get payment error message
   */
  async getPaymentErrorMessage(): Promise<string> {
    return await this.paymentError.textContent() || '';
  }

  /**
   * Verify total is calculated correctly
   */
  async verifyTotalCalculation(): Promise<boolean> {
    const summary = await this.getOrderSummary();
    const expectedTotal = summary.subtotal + summary.shipping + summary.tax - summary.discount;
    const actualTotal = summary.total;
    
    // Allow for small rounding differences
    return Math.abs(expectedTotal - actualTotal) < 0.01;
  }

  /**
   * Check if checkout can be completed (all required fields filled)
   */
  async canCompleteCheckout(): Promise<boolean> {
    return await this.placeOrderButton.isEnabled();
  }

  /**
   * Get selected shipping method and cost
   */
  async getSelectedShippingMethod(): Promise<{ method: string; cost: number }> {
    const selectedRadio = this.page.locator('input[name="shipping"]:checked');
    const method = await selectedRadio.getAttribute('value') || '';
    const cost = await this.getAmount(this.shippingCost);
    
    return { method, cost };
  }
}
