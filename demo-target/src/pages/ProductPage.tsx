import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import type { Product } from '../types';
import './ProductPage.css';

interface ProductPageProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

function ProductPage({ onAddToCart }: ProductPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(Number(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-image-large">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details">
          <h1 data-testid="product-name">{product.name}</h1>
          
          <div className="product-rating" data-testid="product-rating">
            ⭐ {product.rating} ({product.reviewCount} reviews)
          </div>

          <p className="product-price" data-testid="product-price">
            ${product.price.toFixed(2)}
          </p>

          <div
            className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
            data-testid="stock-status"
          >
            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </div>

          <p className="product-description" data-testid="product-description">
            {product.description}
          </p>

          <div className="product-category" data-testid="product-category">
            Category: {product.category}
          </div>

          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              data-testid="quantity-input"
            />
          </div>

          <button
            className="add-to-cart-btn"
            data-testid="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="product-features">
        <h2>Features</h2>
        <ul>
          <li>High quality materials</li>
          <li>1 year warranty</li>
          <li>Free shipping on orders over $50</li>
          <li>30-day return policy</li>
        </ul>
      </div>
    </div>
  );
}

export default ProductPage;
