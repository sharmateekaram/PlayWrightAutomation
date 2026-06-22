const {test, expect} = require('@playwright/test')


test.only('UI Dynaamically find prodcut', async ({browser})=>
 {
       
    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmailId =  "Akash@abc.com"
    const userPswd = "Testing@11111"
    const userEmailTextbox = page.locator("#userEmail");
    const passwordTextbox =  page.locator("#userPassword");   
    const signInBtn = page.locator("#login");
    const cardTitles = page.locator(".card-title a");

    await page.goto("https://rahulshettyacademy.com/client");
    await userEmailTextbox.fill(userEmailId);
    await passwordTextbox.fill(userPswd);
    await signInBtn.click();


 });
