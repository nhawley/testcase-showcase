import { Page, Locator } from '@playwright/test';

/**
 * HeaderComponent - Reusable header navigation component
 * Appears on all pages
 */
export class HeaderComponent {
  readonly page: Page;
  
  // Logo and branding
  readonly logo: Locator;
  
  // Navigation menu
  readonly homeLink: Locator;
  readonly shopLink: Locator;
  readonly categoriesDropdown: Locator;
  readonly dealsLink: Locator;
  readonly aboutLink: Locator;
  readonly contactLink: Locator;
  
  // Search
  readonly searchIcon: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  
  // User account
  readonly accountIcon: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly accountDropdown: Locator;
  readonly myAccountLink: Locator;
  readonly ordersLink: Locator;
  readonly wishlistLink: Locator;
  readonly logoutLink: Locator;
  readonly userGreeting: Locator;
  
  // Shopping cart
  readonly cartIcon: Locator;
  readonly cartCount: Locator;
  readonly cartDropdown: Locator;
  readonly viewCartLink: Locator;
  readonly checkoutLink: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Logo
    this.logo = page.locator('[data-testid="logo"]');
    
    // Navigation
    this.homeLink = page.locator('[data-testid="nav-home"]');
    this.shopLink = page.locator('[data-testid="nav-shop"]');
    this.categoriesDropdown = page.locator('[data-testid="nav-categories"]');
    this.dealsLink = page.locator('[data-testid="nav-deals"]');
    this.aboutLink = page.locator('[data-testid="nav-about"]');
    this.contactLink = page.locator('[data-testid="nav-contact"]');
    
    // Search
    this.searchIcon = page.locator('[data-testid="search-icon"]');
    this.searchInput = page.locator('[data-testid="header-search-input"]');
    this.searchButton = page.locator('[data-testid="header-search-button"]');
    
    // User account
    this.accountIcon = page.locator('[data-testid="account-icon"]');
    this.loginLink = page.locator('[data-testid="login-link"]');
    this.registerLink = page.locator('[data-testid="register-link"]');
    this.accountDropdown = page.locator('[data-testid="account-dropdown"]');
    this.myAccountLink = page.locator('[data-testid="my-account-link"]');
    this.ordersLink = page.locator('[data-testid="orders-link"]');
    this.wishlistLink = page.locator('[data-testid="wishlist-link"]');
    this.logoutLink = page.locator('[data-testid="logout-link"]');
    this.userGreeting = page.locator('[data-testid="user-greeting"]');
    
    // Cart
    this.cartIcon = page.locator('[data-testid="cart-icon"]');
    this.cartCount = page.locator('[data-testid="cart-count"]');
    this.cartDropdown = page.locator('[data-testid="cart-dropdown"]');
    this.viewCartLink = page.locator('[data-testid="view-cart-link"]');
    this.checkoutLink = page.locator('[data-testid="checkout-link"]');
  }

  /**
   * Navigate to home page
   */
  async goToHome() {
    await this.logo.click();
    await this.page.waitForURL('**/');
  }

  /**
   * Navigate to shop page
   */
  async goToShop() {
    await this.shopLink.click();
    await this.page.waitForURL('**/shop');
  }

  /**
   * Search for products from header
   */
  async search(query: string) {
    await this.searchIcon.click();
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForURL('**/search**');
  }

  /**
   * Navigate to category
   */
  async goToCategory(category: string) {
    await this.categoriesDropdown.hover();
    await this.page.locator(`[data-testid="category-${category.toLowerCase()}"]`).click();
  }

  /**
   * Navigate to deals page
   */
  async goToDeals() {
    await this.dealsLink.click();
    await this.page.waitForURL('**/deals');
  }

  /**
   * Open account dropdown
   */
  async openAccountDropdown() {
    await this.accountIcon.hover();
    await this.accountDropdown.waitFor({ state: 'visible' });
  }

  /**
   * Navigate to login page
   */
  async goToLogin() {
    await this.openAccountDropdown();
    await this.loginLink.click();
    await this.page.waitForURL('**/login');
  }

  /**
   * Navigate to registration page
   */
  async goToRegister() {
    await this.openAccountDropdown();
    await this.registerLink.click();
    await this.page.waitForURL('**/register');
  }

  /**
   * Navigate to my account
   */
  async goToMyAccount() {
    await this.openAccountDropdown();
    await this.myAccountLink.click();
    await this.page.waitForURL('**/account');
  }

  /**
   * Navigate to orders page
   */
  async goToOrders() {
    await this.openAccountDropdown();
    await this.ordersLink.click();
    await this.page.waitForURL('**/orders');
  }

  /**
   * Navigate to wishlist
   */
  async goToWishlist() {
    await this.openAccountDropdown();
    await this.wishlistLink.click();
    await this.page.waitForURL('**/wishlist');
  }

  /**
   * Logout user
   */
  async logout() {
    await this.openAccountDropdown();
    await this.logoutLink.click();
    await this.page.waitForURL('**/');
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.userGreeting.isVisible();
  }

  /**
   * Get logged in username
   */
  async getUsername(): Promise<string> {
    const greeting = await this.userGreeting.textContent();
    return greeting?.replace('Hi, ', '') || '';
  }

  /**
   * Get cart item count
   */
  async getCartCount(): Promise<number> {
    const countText = await this.cartCount.textContent();
    return parseInt(countText || '0');
  }

  /**
   * Open cart dropdown
   */
  async openCartDropdown() {
    await this.cartIcon.hover();
    await this.cartDropdown.waitFor({ state: 'visible' });
  }

  /**
   * Navigate to cart page
   */
  async goToCart() {
    await this.openCartDropdown();
    await this.viewCartLink.click();
    await this.page.waitForURL('**/cart');
  }

  /**
   * Navigate to checkout from cart dropdown
   */
  async goToCheckout() {
    await this.openCartDropdown();
    await this.checkoutLink.click();
    await this.page.waitForURL('**/checkout');
  }

  /**
   * Verify header is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  /**
   * Get cart items from dropdown (mini cart preview)
   */
  async getCartDropdownItems() {
    await this.openCartDropdown();
    const items = await this.cartDropdown.locator('[data-testid="cart-item"]').all();
    
    return await Promise.all(
      items.map(async (item) => ({
        name: await item.locator('[data-testid="item-name"]').textContent(),
        price: await item.locator('[data-testid="item-price"]').textContent(),
        quantity: await item.locator('[data-testid="item-quantity"]').textContent(),
      }))
    );
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    const count = await this.getCartCount();
    return count === 0;
  }

  /**
   * Verify all main navigation links are visible
   */
  async verifyNavigationLinksVisible(): Promise<boolean> {
    const links = [
      this.homeLink,
      this.shopLink,
      this.categoriesDropdown,
      this.dealsLink,
    ];
    
    for (const link of links) {
      if (!await link.isVisible()) {
        return false;
      }
    }
    
    return true;
  }
}
