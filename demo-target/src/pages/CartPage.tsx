import { Link } from 'react-router-dom';
import type { CartItem } from '../types';
import './CartPage.css';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

function CartPage({ cartItems, onUpdateQuantity, onRemove }: CartPageProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart" data-testid="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product.id} className="cart-item" data-testid="cart-item">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h3 data-testid="item-name">{item.product.name}</h3>
                <p className="item-price" data-testid="item-price">
                  ${item.product.price.toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <label>Quantity:</label>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    data-testid="decrease-quantity"
                  >
                    -
                  </button>
                  <span data-testid="item-quantity">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    data-testid="increase-quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.product.id)}
                  data-testid="remove-item"
                >
                  Remove
                </button>
              </div>

              <div className="item-total" data-testid="item-total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span data-testid="subtotal">${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span data-testid="shipping">$0.00</span>
          </div>

          <div className="summary-row">
            <span>Tax:</span>
            <span data-testid="tax">$0.00</span>
          </div>

          <div className="summary-row total">
            <span>Total:</span>
            <span data-testid="total">${subtotal.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-btn" data-testid="checkout-btn">
            Proceed to Checkout
          </Link>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
