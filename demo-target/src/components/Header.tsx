import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  cartItemCount: number;
  isLoggedIn: boolean;
  userEmail: string;
  onLogout: () => void;
}

function Header({ cartItemCount, isLoggedIn, userEmail, onLogout }: HeaderProps) {
  return (
    <header className="header" data-testid="header">
      <div className="header-container">
        <Link to="/" className="logo" data-testid="logo">
          <h1>TechStore</h1>
        </Link>

        <nav className="nav" data-testid="nav">
          <Link to="/" className="nav-link" data-testid="nav-home">
            Home
          </Link>
          <Link to="/" className="nav-link" data-testid="nav-shop">
            Shop
          </Link>
          <div className="nav-link" data-testid="nav-categories">
            Categories
          </div>
          <Link to="/" className="nav-link" data-testid="nav-deals">
            Deals
          </Link>
        </nav>

        <div className="header-actions">
          <div className="search-icon" data-testid="search-icon">
            🔍
          </div>

          <div className="account-section" data-testid="account-section">
            {isLoggedIn ? (
              <div className="account-dropdown">
                <span data-testid="user-greeting">Hi, {userEmail.split('@')[0]}</span>
                <div className="dropdown-menu" data-testid="account-dropdown">
                  <Link to="/account" data-testid="my-account-link">
                    My Account
                  </Link>
                  <Link to="/orders" data-testid="orders-link">
                    Orders
                  </Link>
                  <button onClick={onLogout} data-testid="logout-link">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-link" data-testid="login-link">
                Login
              </Link>
            )}
          </div>

          <Link to="/cart" className="cart-icon" data-testid="cart-icon">
            🛒
            {cartItemCount > 0 && (
              <span className="cart-count" data-testid="cart-count">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
