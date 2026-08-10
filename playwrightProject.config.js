// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //testDir: './tests/Assignment',
  testDir: './tests/9_PageObjectModel',
  retries: 2,
  timeout: 40 * 1000,
  expect: { timeout: 5 * 1000, },
  reporter: 'html',
  projects: [
    {
      name: "firefox1",
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'on'
      }
    },
    {
      name: "chrome1 headless1",
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        trace: 'on',       
        viewport: { width: 720, height: 720 }     //interview      //we can use viewport feature while need to check web responsive testing by size or mobile/tablet friendly.
        // ignoreHTTPSErrors :true,      // Bypass SSL/TLS certificate errors for this project
        // permissions:['geolocation'],   // Grant permission to access geolocation
      }
    },
    {
      name: "chromeHead",
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
      }
    },
    {
      name: "safari1",
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ...devices['iPhone 14 Plus'],
        //to  check with  mobile device tablet desktop

      }
    },

  ]
});

//interview run  with diff config and specific project
//npx playwright test <testfile name> --config <name of config file> --project=<project name inside config file>
//npx playwright test tests/9_PageObjectModel/UI_9_5_POManager_CustomDataFixture.spec.js --config playwright.config1.js --project=firefox1
//npx playwright test tests/9_PageObjectModel/UI_9_5_POManager_CustomDataFixture.spec.js --config playwrightProject.config.js --project="chrome1 headless1"

//NOTE if no project name is using in execution command then it will run with all options
//npx playwright test <testfile name> --config <name of config file>
//npx playwright test tests/9_PageObjectModel/UI_9_5_POManager_CustomDataFixture.spec.js --config playwright.config1.js



