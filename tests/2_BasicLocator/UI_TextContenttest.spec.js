const {test, expect} = require('@playwright/test');


test( 'Browser Login Page element text', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log('Get username text  :: ', await page.locator("[for='username']").textContent());
    console.log('Get password text  :: ', await page.locator("[for='password']").textContent());
    console.log('Get first radio button text  :: ', await page.locator(".radiotextsty").first().textContent());
    console.log('Get second radio button text  :: ', await page.locator(".radiotextsty").nth(1).textContent());
    console.log('Get dropdown text  :: ', await page.locator("[data-style='btn-info']").textContent());
    console.log('Get term and condition full line text  :: ',await page.locator("span.termsText").textContent());
    console.log('Get term and condition text  :: ', await page.locator("[href='#']").textContent());
    console.log('Get last line text  :: ', await page.locator("p.text-white").textContent());
   
});

