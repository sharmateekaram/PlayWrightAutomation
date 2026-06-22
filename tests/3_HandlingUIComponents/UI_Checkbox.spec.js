const {test,expect} = require('@playwright/test');

test('UI blinking text', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkingText_DocReq = page.locator("[href*='documents-request']");
    await expect(blinkingText_DocReq).toHaveAttribute("class","blinkingText");

    const blinkingText_SmartHire = page.locator("[href*='smarthire']");
    await expect(blinkingText_SmartHire).toHaveAttribute("class","blinkingText");
    
});


test('UI checkbox', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const chekboxTerm = page.locator("#terms");
     
    expect(await chekboxTerm.isChecked()).toBeFalsy();
     
    console.log("Check the checkbox")
    await chekboxTerm.click();
    console.log(await chekboxTerm.isChecked());
    expect(await chekboxTerm).toBeChecked();
    expect(await chekboxTerm.isChecked()).toBeTruthy();

    console.log("UN-Check the checkbox")
    await chekboxTerm.uncheck();
    console.log(await chekboxTerm.isChecked());
    expect(await chekboxTerm.isChecked()).toBeFalsy();

    console.log("Again Check the checkbox")
    await chekboxTerm.check();
    console.log(await chekboxTerm.isChecked());
    expect(await chekboxTerm).toBeChecked();
   


});