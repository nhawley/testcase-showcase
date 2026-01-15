import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

/**
 * Playwright configuration with multiple projects, parallel execution,
 * and comprehensive reporting setup
 */
export default defineConfig({
  testDir: './tests',

  // Maximum time one test can run
  timeout: 30 * 1000,
  
  // Maximum time for expect() assertions
  expect: {
    timeout: 5000,
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 4 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
    ['./reports/custom-reporter.ts']
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://demo.playwright.dev/demo-ecommerce',
    
    // Screenshot and trace settings
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,
    
    // Retry on network issues
    testIdAttribute: 'data-testid',
  },

  // Test match patterns
  testMatch: ['**/*.spec.ts'],

  // Projects for cross-browser testing
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth-state.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'auth.json'
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: 'auth.json'
      },
      dependencies: ['setup'],
    },
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
        storageState: 'auth.json'
      },
      dependencies: ['setup'],
    },
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
  ],
  });
