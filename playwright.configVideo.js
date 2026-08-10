// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //testDir: './tests/Assignment',
  testDir: './tests/10_Video',
  timeout : 40*1000,
  expect : { timeout : 5*1000, },
  reporter : 'html',
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    video:'on',
    trace : 'on'
  },

});


//interview run with diff config
//npx playwright test <testfile name> --config <name of config file>
//npx playwright test tests/9_PageObjectModel/UI_9_5_POManager_CustomDataFixture.spec.js --config playwright.config1.js



