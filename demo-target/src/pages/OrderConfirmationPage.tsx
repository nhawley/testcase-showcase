import { useParams, Link } from 'react-router-dom';
import './OrderConfirmationPage.css';

function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="order-confirmation-page" data-testid="order-confirmation">
      <div className="confirmation-content">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase</p>

        <div className="order-details">
          <div className="order-number" data-testid="order-number">
            Order Number: {orderId}
          </div>

          <p data-testid="confirmation-email">
            A confirmation email has been sent to your email address.
          </p>

          <div className="order-status">
            <h3>What's Next?</h3>
            <ul>
              <li>You'll receive a shipping confirmation email once your order ships</li>
              <li>Track your order in the Orders section of your account</li>
              <li>Estimated delivery: 5-7 business days</li>
            </ul>
          </div>

          <div className="confirmation-actions">
            <Link to="/orders" className="track-order-btn" data-testid="track-order">
              Track Order
            </Link>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
