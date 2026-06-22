const {test, expect} = require('@playwright/test');

test('UI Radio button', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await expect(page.locator(".radiotextsty").first()).toBeChecked();
    console.log(await page.locator(".radiotextsty").first().isChecked());

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());

});

