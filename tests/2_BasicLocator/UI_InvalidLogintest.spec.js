const {test, expect} = require('@playwright/test');


test('Browser login page Invalid username and password', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("akash");
    await page.locator("[name='password']").fill("learning");
    await page.locator("#signInBtn").click();
    const IncorrectidpswdError = await page.locator("[style*='block']");
    console.log(await IncorrectidpswdError.textContent());
    await expect(IncorrectidpswdError).toContainText("Incorrect");
    await expect(IncorrectidpswdError).toHaveText("Incorrect username/password."); 
   // await expect(IncorrectidpswdError).toHaveText("Incorrect username");   //will fail as it  expect whole text
   //await expect(IncorrectidpswdError).toContainText("Incorrecttt");

});


