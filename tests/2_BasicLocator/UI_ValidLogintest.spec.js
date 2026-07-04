const {test, expect} = require('@playwright/test');

test('Browser login page Invalid to valid username and password', async ({browser})=>
{
  
    const context = await browser.newContext();
    const page = await context.newPage();
    const usernameTextbox = page.locator("#username");
    const passwordTextbox =  page.locator("[name='password']");   
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-title a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await usernameTextbox.fill("akash");
    await passwordTextbox.fill("learning");
    await signInBtn.click();
    await usernameTextbox.fill("rahulshettyacademy");
    await passwordTextbox.fill("Learning@830$3mK2");
    await signInBtn.click();
    console.log(await page.locator(".card-title").first().textContent());
    console.log(await cardTitles.allInnerTexts());
    console.log(await cardTitles.allTextContents());
    console.log(await cardTitles.all());
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.last().textContent());
    console.log(await cardTitles.nth(0).textContent());
    console.log(await cardTitles.nth(1).textContent());


});

//handlingUI components
//dropdown66*
//radiobutton
//checkbox
//childwindows



//do assignemnt -.//https://rahulshettyacademy.com/client/#/auth/login


