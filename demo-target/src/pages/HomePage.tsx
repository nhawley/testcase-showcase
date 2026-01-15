import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, searchProducts } from '../data/products';
import type { Product } from '../types';
import './HomePage.css';

interface HomePageProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

function HomePage({ onAddToCart }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      const results = searchQuery ? searchProducts(searchQuery) : products;
      setFilteredProducts(results);
      setIsLoading(false);
    }, 500);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredProducts];
    
    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    
    setFilteredProducts(sorted);
  };

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, 1);
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Added to cart!';
    notification.setAttribute('data-testid', 'cart-notification');
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h2>Welcome to TechStore</h2>
        <p>Find the best tech products at great prices</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          data-testid="search-input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="search-button"
          data-testid="search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="filters-section">
        <select
          className="sort-dropdown"
          data-testid="sort-dropdown"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
        </select>

        <select
          className="category-filter"
          data-testid="category-filter"
          onChange={(e) => {
            const category = e.target.value;
            setFilteredProducts(
              category ? products.filter((p) => p.category === category) : products
            );
          }}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {isLoading ? (
        <div className="loading-spinner" data-testid="loading-spinner">
          Loading...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-results" data-testid="no-results">
          No products found matching your search.
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card" data-testid="product-card">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </Link>
              <div className="product-info">
                <h3 className="product-name" data-testid="product-name">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="product-price" data-testid="product-price">
                  ${product.price.toFixed(2)}
                </p>
                <div className="product-rating" data-testid="product-rating">
                  ⭐ {product.rating} ({product.reviewCount})
                </div>
                <div
                  className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
                  data-testid="stock-status"
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
                <button
                  className="quick-add-btn"
                  data-testid="quick-add-to-cart"
                  onClick={() => handleQuickAdd(product)}
                  disabled={!product.inStock}
                >
                  Quick Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
