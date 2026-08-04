const {test, expect} = require('@playwright/test');
//const path = require('node:path');


test.only('Visual', async ({page})=>
{

   await page.goto("https://www.google.com/");
   expect(await page.screenshot()).toMatchSnapshot("landing.png")


});


test('screenshort', async ({page})=>
{

    await page.goto("https://www.google.com/");

    // Way 1 - Captures the visible screen area and saves it to a file
    await page.screenshot({path:"ScreenshotsFolder/screenshot1.png"});
    await page.screenshot({path:"ScreenshotsFolder/screenshot2.jpg"});
    await page.screenshot({path:"ScreenshotsFolder/screenshot3.jpeg"});

    // Way 2 - Captures only the matching element (e.g., a header or button)
    await page.locator("#LS8OJ").screenshot({path:"ScreenshotsFolder/screenshot3.jpeg"}); //it will repalce old one
    await page.locator("#LS8OJ").screenshot({path:"ScreenshotsFolder/screenshot4.jpeg"});

    await page.goto("https://www.makemytrip.com/" , { timeout:45000 });
    // Way 3 - Scrolls and captures the entire page layout
    await page.screenshot({ path: 'ScreenshotsFolder/fullpage.png', fullPage: true });

    // Way 4 - customize your image file
    await page.screenshot(
        {
            path: 'ScreenshotsFolder/custom.jpg',
            type: 'jpeg',            // Supports 'png' or 'jpeg'
            quality: 80,             // Quality scale 0-100 (JPEG only)
            omitBackground: true,    // Hides default white background for transparency
            clip: { x: 0, y: 0, width: 500, height: 400 } // Captures a targeted pixel coordinate box
        });


    // Way 5 - Instead of saving directly to a file, you can save the screenshot to an in-memory buffer to process or upload to cloud storage   
    const buffer = await page.screenshot();
    // Convert to a base64 string if needed
    const base64Image = buffer.toString('base64');  
})