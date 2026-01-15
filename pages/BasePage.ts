import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/Header.component';
import { FooterComponent } from '../components/Footer.component';

/**
 * BasePage - Foundation for all page objects
 * Contains common functionality and shared components
 */
export class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Take a screenshot
   */
  async screenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for a specific element to be visible
   */
  async waitForElement(locator: Locator, timeout: number = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Reload the current page
   */
  async reload() {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  /**
   * Go back in browser history
   */
  async goBack() {
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  /**
   * Accept browser dialog (alert, confirm, prompt)
   */
  async acceptDialog() {
    this.page.on('dialog', dialog => dialog.accept());
  }

  /**
   * Dismiss browser dialog
   */
  async dismissDialog() {
    this.page.on('dialog', dialog => dialog.dismiss());
  }

  /**
   * Get element text content
   */
  async getTextContent(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for navigation after action
   */
  async waitForNavigation(action: () => Promise<void>) {
    await Promise.all([
      this.page.waitForNavigation(),
      action()
    ]);
  }

  /**
   * Hover over element
   */
  async hover(locator: Locator) {
    await locator.hover();
  }
}
