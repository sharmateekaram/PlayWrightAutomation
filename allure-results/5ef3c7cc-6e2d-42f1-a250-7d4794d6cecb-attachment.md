# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 7_Screenshot&visual\UI_Screenshot&visual.spec.js >> @web screenshort
- Location: tests\7_Screenshot&visual\UI_Screenshot&visual.spec.js:15:1

# Error details

```
Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.makemytrip.com/
Call log:
  - navigating to "https://www.makemytrip.com/", waiting until "load"

```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | //const path = require('node:path');
  3  | 
  4  | 
  5  | test('Visual', async ({page})=>
  6  | {
  7  | 
  8  |    await page.goto("https://www.google.com/");
  9  |    expect(await page.screenshot()).toMatchSnapshot("landing.png")
  10 | 
  11 | 
  12 | });
  13 | 
  14 | 
  15 | test('@web screenshort', async ({page})=>
  16 | {
  17 | 
  18 |     await page.goto("https://www.google.com/");
  19 | 
  20 |     // Way 1 - Captures the visible screen area and saves it to a file
  21 |     await page.screenshot({path:"ScreenshotsFolder/screenshot1.png"});
  22 |     await page.screenshot({path:"ScreenshotsFolder/screenshot2.jpg"});
  23 |     await page.screenshot({path:"ScreenshotsFolder/screenshot3.jpeg"});
  24 | 
  25 |     // Way 2 - Captures only the matching element (e.g., a header or button)
  26 |     await page.locator("#LS8OJ").screenshot({path:"ScreenshotsFolder/screenshot3.jpeg"}); //it will repalce old one
  27 |     await page.locator("#LS8OJ").screenshot({path:"ScreenshotsFolder/screenshot4.jpeg"});
  28 | 
> 29 |     await page.goto("https://www.makemytrip.com/" , { timeout:45000 });
     |                ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.makemytrip.com/
  30 |     // Way 3 - Scrolls and captures the entire page layout
  31 |     await page.screenshot({ path: 'ScreenshotsFolder/fullpage.png', fullPage: true });
  32 | 
  33 |     // Way 4 - customize your image file
  34 |     await page.screenshot(
  35 |         {
  36 |             path: 'ScreenshotsFolder/custom.jpg',
  37 |             type: 'jpeg',            // Supports 'png' or 'jpeg'
  38 |             quality: 80,             // Quality scale 0-100 (JPEG only)
  39 |             omitBackground: true,    // Hides default white background for transparency
  40 |             clip: { x: 0, y: 0, width: 500, height: 400 } // Captures a targeted pixel coordinate box
  41 |         });
  42 | 
  43 | 
  44 |     // Way 5 - Instead of saving directly to a file, you can save the screenshot to an in-memory buffer to process or upload to cloud storage   
  45 |     const buffer = await page.screenshot();
  46 |     // Convert to a base64 string if needed
  47 |     const base64Image = buffer.toString('base64');  
  48 | })
```