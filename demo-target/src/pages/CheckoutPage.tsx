import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem, ShippingAddress, PaymentDetails } from '../types';
import './CheckoutPage.css';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

function CheckoutPage({ cartItems, onOrderComplete }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingZip: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'standard' ? 0 : shippingMethod === 'express' ? 15 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax - discount;

  const validateShipping = (): boolean => {
    const newErrors: string[] = [];

    if (!shippingAddress.firstName) newErrors.push('First name is required');
    if (!shippingAddress.lastName) newErrors.push('Last name is required');
    if (!shippingAddress.email) newErrors.push('Email is required');
    if (!shippingAddress.email.includes('@')) newErrors.push('Email must be valid');
    if (!shippingAddress.address) newErrors.push('Address is required');
    if (!shippingAddress.city) newErrors.push('City is required');
    if (!shippingAddress.zipCode) newErrors.push('ZIP code is required');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: string[] = [];

    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 16) {
      newErrors.push('Valid card number is required');
    }
    if (!paymentDetails.cardName) newErrors.push('Cardholder name is required');
    if (!paymentDetails.expiryDate) newErrors.push('Expiry date is required');
    if (!paymentDetails.cvv || paymentDetails.cvv.length !== 3) {
      newErrors.push('Valid CVV is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setStep('payment');
      setErrors([]);
    }
  };

  const handlePlaceOrder = () => {
    if (validatePayment()) {
      // Simulate order processing
      const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
      onOrderComplete();
      navigate(`/order-confirmation/${orderId}`);
    }
  };

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode === 'SAVE20') {
      setDiscount(subtotal * 0.2);
    } else {
      alert('Invalid promo code');
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-content">
        <div className="checkout-forms">
          {step === 'shipping' ? (
            <div className="shipping-form">
              <h2>Shipping Information</h2>

              {errors.length > 0 && (
                <div className="validation-errors">
                  {errors.map((error, i) => (
                    <div key={i} className="validation-error" data-testid="validation-error">
                      {error}
                    </div>
                  ))}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    data-testid="first-name"
                    value={shippingAddress.firstName}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    data-testid="last-name"
                    value={shippingAddress.lastName}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  data-testid="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  data-testid="phone"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  id="address"
                  data-testid="address"
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, address: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    data-testid="city"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    data-testid="state"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  >
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    id="zipCode"
                    data-testid="zip-code"
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select
                    id="country"
                    data-testid="country"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, country: e.target.value })
                    }
                  >
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>

              <div className="shipping-methods">
                <h3>Shipping Method</h3>
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    data-testid="shipping-standard"
                  />
                  Standard (5-7 days) - Free
                </label>
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    data-testid="shipping-express"
                  />
                  Express (2-3 days) - $15.00
                </label>
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    value="overnight"
                    checked={shippingMethod === 'overnight'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    data-testid="shipping-overnight"
                  />
                  Overnight - $25.00
                </label>
              </div>

              <button
                className="continue-btn"
                onClick={handleContinueToPayment}
                data-testid="continue-to-payment"
              >
                Continue to Payment
              </button>
            </div>
          ) : (
            <div className="payment-form">
              <h2>Payment Information</h2>

              {errors.length > 0 && (
                <div className="validation-errors">
                  {errors.map((error, i) => (
                    <div key={i} className="validation-error" data-testid="payment-error">
                      {error}
                    </div>
                  ))}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  id="cardNumber"
                  data-testid="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                  }
                  maxLength={16}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Cardholder Name *</label>
                <input
                  id="cardName"
                  data-testid="card-name"
                  value={paymentDetails.cardName}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cardName: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    id="expiryDate"
                    data-testid="expiry-date"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                    }
                    maxLength={5}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    id="cvv"
                    data-testid="cvv"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="billingZip">Billing ZIP Code *</label>
                <input
                  id="billingZip"
                  data-testid="billing-zip"
                  value={paymentDetails.billingZip}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, billingZip: e.target.value })
                  }
                />
              </div>

              <label className="same-as-shipping">
                <input type="checkbox" data-testid="same-as-shipping" />
                Billing address same as shipping
              </label>

              <div className="checkout-actions">
                <button onClick={() => setStep('shipping')} className="back-btn">
                  Back to Shipping
                </button>
                <button
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  data-testid="place-order"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="order-summary" data-testid="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.product.id} className="summary-item">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="promo-code">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              data-testid="promo-code"
            />
            <button onClick={applyPromoCode} data-testid="apply-promo">
              Apply
            </button>
          </div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span data-testid="subtotal">${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span data-testid="shipping-cost">${shippingCost.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax:</span>
            <span data-testid="tax">${tax.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row discount">
              <span>Discount:</span>
              <span data-testid="promo-discount">-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-row total">
            <span>Total:</span>
            <span data-testid="total-amount">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
