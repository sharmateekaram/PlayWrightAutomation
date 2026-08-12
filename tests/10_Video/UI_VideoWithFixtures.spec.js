const { test, expect } = require('@playwright/test');

  //interview IF CONFIG FILE HAS  video:'retain-on-failure',/'on' etc then it work only with  page and  Context fixture 
  // and for browser fixture you need to mention explicitly



test('Video with browser fixture', async ({ browser }) => {
   
   /// Interview :If you are using manual browser context creation, your code block should look exactly like this to ensure videos consistently show up in your reports:
     // 1. Manually create the context and explicitly pass the video record settings


     //ques: does video will save  with below code even if video:'on' not mentioned in config file
     //Ans : Yes, the video will still save.When you pass the recordVideo object directly inside browser.newContext(), it completely overrides and bypasses your global configuration file.
     //In Playwright, inline settings passed directly into constructor functions (like browser.newContext()) have the highest priority. Playwright will ignore the fact that video: 'on' is missing from your playwright.config.ts file because you explicitly commanded that specific browser context to record video.

   const context = await browser.newContext({
      recordVideo: {
         dir: 'test-results/videos/', // Where raw videos are stored
         size: { width: 720, height: 720 }
      }
   });

   const page = await context.newPage();   
   const products = page.locator(".card-body");
   const productToAdd = "ZARA COAT 3";
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("Akash@abc.com");
   await page.locator("#userPassword").fill("Testing@11111");
   await page.locator("#login").click();

   await page.locator(".card-body b").first().waitFor();
   console.log(await products.allTextContents());
   console.log(await page.locator(".card-body b").allTextContents());

   const productCount = await products.count();

   for (let i = 0; i < productCount; i++) {
      const productName = await products.nth(i).locator("b").textContent();
      console.log(productName);
      if (productName === productToAdd) {
         await products.nth(i).locator("button:has-text(' Add To Cart')").click();
         //await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   await page.locator("[routerlink*='cart']").click();


   // Interview 2. CRITICAL: This close() guarantees the video finishes writing to disk

   //ques :  video is saving evenwithout await context.close()
   //Ans: You are seeing the video save successfully because the test runner automatically cleans up and
   //  closes open contexts behind the scenes when a test block finishes executing.
   // While manual scripts require explicit closures, @playwright/test manages the process dynamically within its lifecycle framework.
   // Why It Saves Without await context.close()
   //    1.Fixtures Lifecycle Auto-Teardown: When using the default @playwright/test runner, Playwright manages fixtures via a built-in lifecycle. As soon as a test('...', async ({ ... }) => {}) block reaches its final line or encounters a failure, Playwright invokes a teardown function.
   //    2.Implicit Framework Cleanup: This teardown sequence automatically executes an implicit context.close() and browser.close() behind the scenes to prevent memory leaks. This action flushes out the video buffer, finalizes the .webm file container, and attaches it cleanly to your HTML report.
   // 
   //Why Explicitly Declaring await context.close() Remains Best PracticeDespite the framework's fallback safety net, explicitly closing manual contexts is highly recommended for two key operational reasons:
   // 1.Instantaneous File Generation: Playwright only commits the active media recording buffer directly to your disk array at the exact moment the context closes. Invoking await context.close() inside your test allows you to parse, rename, move, or process the .webm file via standard file system operations within the same test block.
   // 2.Prevention of Test-Hangs: If a test script hangs inside a complex loop or encounters an unhandled asynchronous edge case, the framework-level auto-teardown might delay or fail entirely. Utilizing a structural try...finally block guarantees that video files finish writing immediately, regardless of failure states.
   await context.close();


   //ques: How to Ensure It Appears in the ReportIf you want to manually create contexts like this but still want the video linked inside your HTML reports,
   // ans: you can attach it manually right before closing the context:
   const videoPath = await page.video()?.path();
   if (videoPath) {
   // Manually attach the file to the Playwright HTML test report
   await test.info().attach('test-video', {
      path: videoPath,
      contentType: 'video/webm',
   });
   }

});


//interview
//Playwright’s automatic configuration injection (video: 'on') only applies to the built-in page and context fixtures. 
//If you create a brand new context manually inside your test, Playwright does not automatically inherit the video settings
  // Playwright automatically handles video capture on this page object

test('Video with Page fixture', async ({ page }) => {
    
   const products = page.locator(".card-body");
   const productToAdd = "ZARA COAT 3";
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("Akash@abc.com");
   await page.locator("#userPassword").fill("Testing@11111");
   await page.locator("#login").click();

   await page.locator(".card-body b").first().waitFor();
   console.log(await products.allTextContents());
   console.log(await page.locator(".card-body b").allTextContents());

   const productCount = await products.count();

   for (let i = 0; i < productCount; i++) {
      const productName = await products.nth(i).locator("b").textContent();
      console.log(productName);
      if (productName === productToAdd) {
         await products.nth(i).locator("button:has-text(' Add To Cart')").click();
         //await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   await page.locator("[routerlink*='cart121']").click();

});


test('Video with Context fixture', async ({ context }) => {
    
   const page = await context.newPage();
   const products = page.locator(".card-body");
   const productToAdd = "ZARA COAT 3";
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("Akash@abc.com");
   await page.locator("#userPassword").fill("Testing@11111");
   await page.locator("#login").click();

   await page.locator(".card-body b").first().waitFor();
   console.log(await products.allTextContents());
   console.log(await page.locator(".card-body b").allTextContents());

   const productCount = await products.count();

   for (let i = 0; i < productCount; i++) {
      const productName = await products.nth(i).locator("b").textContent();
      console.log(productName);
      if (productName === productToAdd) {
         await products.nth(i).locator("button:has-text(' Add To Cart')").click();
         //await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   await page.locator("[routerlink*='cart']").click();

});



//Ques :In Playwright, video: 'on' is added from your playwright.config.ts file and explicitly commanded that specific browser context to record video.
//but  It is Missing From Your HTML Report
//ans : If you have video: 'on' enabled in your global playwright.config.ts file, but the video is still completely missing from the HTML report, it means you are hitting a known Playwright architectural boundary.
// The Playwright HTML Reporter only maps video tracks to the built-in, isolated { page } fixture context. If you break that native link in your test code, the video records to your disk but the reporter drops the reference


//ques: if  video: 'on' is added from your playwright.config.ts file then how it will appear in HTML Report
//ans: sue Page or Context Fixture

//ques: if want browser fixture and need to record video
//ans: then  use below code and video will save  it mentioned path
      // const context = await browser.newContext({
      //       recordVideo: {
      //          dir: 'test-results/videos/', // Where raw videos are stored
      //          size: { width: 720, height: 720 }
      //       }
      //    });
      // await context.close();


 ////ques: if want browser fixture and need to record video in HTML report
      //ans: then  use below code and video will save  it in mentioned path as well as in HTML report
      // const context = await browser.newContext({
      //       recordVideo: {
      //          dir: 'test-results/videos/', // Where raw videos are stored
      //          size: { width: 720, height: 720 }
      //       }
      //    });
         // await context.close();
         // const videoPath = await page.video()?.path();
         //    if (videoPath) {
         //    // Manually attach the file to the Playwright HTML test report
         //    await test.info().attach('test-video', {
         //       path: videoPath,
         //       contentType: 'video/webm',
         //    });
         //    }