// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //testDir: './tests',
  testDir: './tests',
  timeout : 40*1000,
  //workers :5,
  expect : { timeout : 5*1000, },
  // reporter : [
  //   ['html',{open: 'never'}],
  //   ['allure-playwright']
  // ],
  reporter : 'html',
  use: {
    browserName : 'chromium',
    headless : true,
    screenshot : 'on',
    trace : 'on'
  },

});

