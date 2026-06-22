const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage() ;
        await page.goto("https://rahulshettyacademy.com/");
        const title =  await page.title();
        console.log(title);
        await expect(page).toHaveTitle('Rahul Shetty Academy | QA Automation, Playwright, AI Testing & Online Training');
        
    });

test('Page Playwright test', async ({page})=>
{
    await page.goto("https://google.com");
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle('Google');
});



test.only('Title, URL', async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    console.log(await page.url());
    await expect(page).toHaveTitle("Let's Shop");
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/login");

     // Asserts the URL contains 'login'
    await expect(page).toHaveURL(/\/login/);

     // Asserts the URL contains 'login'
    await expect(page).toHaveURL(/login/);

    // // Asserts that the URL ends with /login
    // await expect(page).toHaveURL('**/login*');

    // Asserts the string contains 'login'
    await expect(page.url()).toContain("login");


    await page.locator(".text-reset").click();
    console.log(await page.title());
    console.log(await page.url());
    await expect(page.url()).toContain("register");



});

//https://rahulshettyacademy.com/loginpagePractise/

