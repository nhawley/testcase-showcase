# TechStore - Demo E-Commerce Application

A fully functional demo e-commerce app built with React + TypeScript + Vite.
Designed as a testing target for the Testcase Showcase project.

## Quick Start

```bash
npm install
npm run dev
```

App available at: `http://localhost:5173`

## Test Credentials

- **Login**: Any email + password `Test@123`
- **Promo Codes**: `SAVE10` (10% off), `SAVE20` (20% off)

## Features

- Product browsing with search/filter/sort
- Shopping cart management
- Multi-step checkout flow
- User authentication
- Form validation
- All elements have `data-testid` attributes for testing

## Key Testing Selectors

### Homepage
- `search-input`, `search-button`
- `product-card`, `product-name`, `product-price`
- `quick-add-to-cart`
- `loading-spinner`, `no-results`

### Cart
- `cart-item`, `item-quantity`
- `increase-quantity`, `decrease-quantity`, `remove-item`
- `checkout-btn`

### Checkout
- Personal: `first-name`, `last-name`, `email`, `phone`
- Address: `address`, `city`, `state`, `zip-code`
- Shipping: `shipping-standard`, `shipping-express`, `shipping-overnight`
- Payment: `card-number`, `card-name`, `expiry-date`, `cvv`
- `promo-code`, `apply-promo`, `place-order`

### Order Confirmation
- `order-confirmation`, `order-number`
- `confirmation-email`, `track-order`

## Use with QA Automation

1. Start this app: `npm run dev`
2. Update playwright config: `baseURL: 'http://localhost:5173'`
3. Run tests from testcase-showcase project

Perfect for practicing test automation with realistic e-commerce flows!

## Technologies

React 18 | TypeScript | Vite | React Router | Pure CSS

## License

MIT - Free for learning and testing
