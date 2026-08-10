// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //testDir: './tests/Assignment',
  testDir: './tests',
  timeout : 40*1000,
  workers :5,
  expect : { timeout : 5*1000, },
  reporter : 'html',
  use: {
    browserName : 'firefox',
    headless : false,
    screenshot : 'on',
    trace : 'on'
  },

});

