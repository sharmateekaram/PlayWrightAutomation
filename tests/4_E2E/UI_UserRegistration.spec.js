const {test, expect} = require('@playwright/test');
const path = require('node:path');

test('User Registration Form', async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".text-reset").click();
    console.log(await page.url());
    await expect(page.url()).toContain("register");
    const userEmailId =  "Akash@abc3.com"
    const userPswd = "Testing@11111"
    await page.locator("[type='firstName']").fill("Akash");
    await page.locator("[type='lastName']").fill("Bhardwaj");
    await page.locator("#userEmail").fill(userEmailId);
    await page.locator("#userMobile").fill("9876543210");
    //select dropdown
    const occDropdown = await page.locator("[formcontrolname='occupation']");
    await occDropdown.selectOption("3: Engineer");
    const selectedText = await occDropdown.evaluate(el => el.options[el.selectedIndex].text);
    console.log(selectedText);
    //click on radio button male
    await page.locator(".col-md-6 [value='Male']").click();
    await page.locator("#userPassword").fill(userPswd);
    await page.locator("#confirmPassword").fill(userPswd);
    //click checkbox
    await page.locator("[formcontrolname='required']").check();
    //await page.pause();
    await page.locator("[type='submit']").click();

    //verify 'Account Created Successfully'
    const successfulLabel = await page.locator("h1.headcolor")
    console.log(await page.locator("h1.headcolor").textContent());
    //await page.pause();
    await expect(successfulLabel).toContainText("Account Created Successfully");
    await expect(successfulLabel).toHaveText("Account Created Successfully");

    //click on login page on successful page
    await page.locator("button.btn-primary").click();
     console.log(await page.locator("h1.login-title").textContent()); //

   // await page.pause();
    await expect(page.locator("h1.login-title")).toHaveText("Log in")



});
