import './Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company</h3>
          <a href="/about" data-testid="footer-about">About Us</a>
          <a href="/contact" data-testid="footer-contact">Contact</a>
          <a href="/careers" data-testid="footer-careers">Careers</a>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <a href="/help" data-testid="footer-help">Help Center</a>
          <a href="/shipping" data-testid="footer-shipping">Shipping</a>
          <a href="/returns" data-testid="footer-returns">Returns</a>
          <a href="/faq" data-testid="footer-faq">FAQ</a>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <a href="/terms" data-testid="footer-terms">Terms of Service</a>
          <a href="/privacy" data-testid="footer-privacy">Privacy Policy</a>
          <a href="/cookies" data-testid="footer-cookies">Cookie Policy</a>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" data-testid="social-facebook">Facebook</a>
            <a href="https://twitter.com" data-testid="social-twitter">Twitter</a>
            <a href="https://instagram.com" data-testid="social-instagram">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p data-testid="copyright">© 2024 TechStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
