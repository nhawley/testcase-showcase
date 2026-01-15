import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Mock login - accept any email with password "Test@123"
    if (password === 'Test@123') {
      onLogin(email);
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>

        {error && (
          <div className="error-message" data-testid="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn" data-testid="login-btn">
            Login
          </button>

          <div className="login-help">
            <p>Test credentials: any email with password "Test@123"</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
