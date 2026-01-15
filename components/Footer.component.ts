import { Page, Locator } from '@playwright/test';

/**
 * FooterComponent - Reusable footer component
 */
export class FooterComponent {
  readonly page: Page;
  
  // Company links
  readonly aboutUsLink: Locator;
  readonly careersLink: Locator;
  readonly pressLink: Locator;
  readonly contactUsLink: Locator;
  
  // Customer service links
  readonly helpCenterLink: Locator;
  readonly shippingLink: Locator;
  readonly returnsLink: Locator;
  readonly trackOrderLink: Locator;
  readonly faqLink: Locator;
  
  // Legal links
  readonly termsLink: Locator;
  readonly privacyLink: Locator;
  readonly cookiesLink: Locator;
  
  // Social media
  readonly facebookLink: Locator;
  readonly twitterLink: Locator;
  readonly instagramLink: Locator;
  readonly linkedinLink: Locator;
  
  // Newsletter
  readonly newsletterInput: Locator;
  readonly newsletterButton: Locator;
  
  // Copyright
  readonly copyrightText: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Company
    this.aboutUsLink = page.locator('[data-testid="footer-about"]');
    this.careersLink = page.locator('[data-testid="footer-careers"]');
    this.pressLink = page.locator('[data-testid="footer-press"]');
    this.contactUsLink = page.locator('[data-testid="footer-contact"]');
    
    // Customer service
    this.helpCenterLink = page.locator('[data-testid="footer-help"]');
    this.shippingLink = page.locator('[data-testid="footer-shipping"]');
    this.returnsLink = page.locator('[data-testid="footer-returns"]');
    this.trackOrderLink = page.locator('[data-testid="footer-track-order"]');
    this.faqLink = page.locator('[data-testid="footer-faq"]');
    
    // Legal
    this.termsLink = page.locator('[data-testid="footer-terms"]');
    this.privacyLink = page.locator('[data-testid="footer-privacy"]');
    this.cookiesLink = page.locator('[data-testid="footer-cookies"]');
    
    // Social
    this.facebookLink = page.locator('[data-testid="social-facebook"]');
    this.twitterLink = page.locator('[data-testid="social-twitter"]');
    this.instagramLink = page.locator('[data-testid="social-instagram"]');
    this.linkedinLink = page.locator('[data-testid="social-linkedin"]');
    
    // Newsletter
    this.newsletterInput = page.locator('[data-testid="footer-newsletter-input"]');
    this.newsletterButton = page.locator('[data-testid="footer-newsletter-button"]');
    
    // Copyright
    this.copyrightText = page.locator('[data-testid="copyright"]');
  }

  async isVisible(): Promise<boolean> {
    return await this.copyrightText.isVisible();
  }

  async subscribeNewsletter(email: string) {
    await this.newsletterInput.fill(email);
    await this.newsletterButton.click();
  }
}
