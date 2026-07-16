const {test, expect} = require('@playwright/test');
const { request } = require('node:http');

test.only('Print all request and response ', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    page.on("request", request=> console.log(request.url()));
    page.on("request", request=> console.log(request.headers()));
//      page.on("request", request=> console.log(request.postData()));

      page.on("response", Response=> console.log(Response.url(), Response.status()));
    
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[name='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    

});

test('abort the Network calls ', async ({browser})=>
{
      const context = await browser.newContext();
    const page = await context.newPage();
    page.route("**/*.{png,jpg,jpeg}", route=>route.abort());
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[name='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    await page.pause();

});

