import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - E-commerce homepage with product listings
 */
export class HomePage extends BasePage {
  // Locators
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly categoryFilter: Locator;
  readonly sortDropdown: Locator;
  readonly productCards: Locator;
  readonly loadingSpinner: Locator;
  readonly noResultsMessage: Locator;
  readonly newsletterInput: Locator;
  readonly newsletterSubmit: Locator;
  readonly featuredProducts: Locator;
  readonly saleItems: Locator;
  readonly newArrivals: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.categoryFilter = page.locator('[data-testid="category-filter"]');
    this.sortDropdown = page.locator('[data-testid="sort-dropdown"]');
    this.productCards = page.locator('[data-testid="product-card"]');
    this.loadingSpinner = page.locator('[data-testid="loading-spinner"]');
    this.noResultsMessage = page.locator('[data-testid="no-results"]');
    this.newsletterInput = page.locator('[data-testid="newsletter-email"]');
    this.newsletterSubmit = page.locator('[data-testid="newsletter-submit"]');
    this.featuredProducts = page.locator('[data-testid="featured-products"]');
    this.saleItems = page.locator('[data-testid="sale-items"]');
    this.newArrivals = page.locator('[data-testid="new-arrivals"]');
  }

  /**
   * Navigate to homepage
   */
  async navigate() {
    await this.goto('/');
    await this.waitForProductsToLoad();
  }

  /**
   * Wait for products to finish loading
   */
  async waitForProductsToLoad() {
    await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
    await this.productCards.first().waitFor({ state: 'visible' });
  }

  /**
   * Search for products
   */
  async searchProducts(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.waitForProductsToLoad();
  }

  /**
   * Filter by category
   */
  async filterByCategory(category: string) {
    await this.categoryFilter.selectOption(category);
    await this.waitForProductsToLoad();
  }

  /**
   * Sort products
   */
  async sortProducts(sortOption: 'price-low' | 'price-high' | 'newest' | 'popular') {
    await this.sortDropdown.selectOption(sortOption);
    await this.waitForProductsToLoad();
  }

  /**
   * Get all visible product cards
   */
  async getProductCards() {
    return await this.productCards.all();
  }

  /**
   * Get count of visible products
   */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Click on a specific product by index
   */
  async clickProductByIndex(index: number) {
    await this.productCards.nth(index).click();
  }

  /**
   * Click on a product by name
   */
  async clickProductByName(name: string) {
    await this.page.locator(`[data-testid="product-card"]:has-text("${name}")`).click();
  }

  /**
   * Get product info by index
   */
  async getProductInfo(index: number) {
    const productCard = this.productCards.nth(index);
    
    return {
      name: await productCard.locator('[data-testid="product-name"]').textContent(),
      price: await productCard.locator('[data-testid="product-price"]').textContent(),
      rating: await productCard.locator('[data-testid="product-rating"]').textContent(),
    };
  }

  /**
   * Check if "no results" message is displayed
   */
  async hasNoResults(): Promise<boolean> {
    return await this.noResultsMessage.isVisible();
  }

  /**
   * Subscribe to newsletter
   */
  async subscribeToNewsletter(email: string) {
    await this.newsletterInput.fill(email);
    await this.newsletterSubmit.click();
  }

  /**
   * Verify newsletter subscription success
   */
  async verifyNewsletterSuccess(): Promise<boolean> {
    const successMessage = this.page.locator('[data-testid="newsletter-success"]');
    return await successMessage.isVisible();
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts() {
    const featured = await this.featuredProducts.locator('[data-testid="product-card"]').all();
    return featured;
  }

  /**
   * Navigate to sale items
   */
  async goToSaleItems() {
    await this.saleItems.click();
    await this.waitForProductsToLoad();
  }

  /**
   * Navigate to new arrivals
   */
  async goToNewArrivals() {
    await this.newArrivals.click();
    await this.waitForProductsToLoad();
  }

  /**
   * Quick add to cart (without going to product page)
   */
  async quickAddToCart(productIndex: number) {
    const addButton = this.productCards.nth(productIndex).locator('[data-testid="quick-add-to-cart"]');
    await addButton.click();
    
    // Wait for cart notification
    await this.page.locator('[data-testid="cart-notification"]').waitFor({ state: 'visible' });
  }

  /**
   * Add multiple products to cart
   */
  async addMultipleProductsToCart(count: number) {
    for (let i = 0; i < count; i++) {
      await this.quickAddToCart(i);
      await this.page.waitForTimeout(500); // Small delay between additions
    }
  }

  /**
   * Filter products by price range
   */
  async filterByPriceRange(min: number, max: number) {
    await this.page.locator('[data-testid="price-min"]').fill(min.toString());
    await this.page.locator('[data-testid="price-max"]').fill(max.toString());
    await this.page.locator('[data-testid="apply-price-filter"]').click();
    await this.waitForProductsToLoad();
  }

  /**
   * Check if a specific product is in stock
   */
  async isProductInStock(productIndex: number): Promise<boolean> {
    const stockBadge = this.productCards.nth(productIndex).locator('[data-testid="stock-status"]');
    const stockText = await stockBadge.textContent();
    return stockText?.includes('In Stock') || false;
  }

  /**
   * Get all product prices
   */
  async getAllProductPrices(): Promise<number[]> {
    const priceElements = await this.productCards.locator('[data-testid="product-price"]').all();
    const prices = await Promise.all(
      priceElements.map(async (el) => {
        const text = await el.textContent();
        return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
      })
    );
    return prices;
  }

  /**
   * Verify products are sorted correctly
   */
  async verifyProductsSortedByPrice(ascending: boolean = true): Promise<boolean> {
    const prices = await this.getAllProductPrices();
    
    for (let i = 0; i < prices.length - 1; i++) {
      if (ascending && prices[i] > prices[i + 1]) return false;
      if (!ascending && prices[i] < prices[i + 1]) return false;
    }
    
    return true;
  }
}
