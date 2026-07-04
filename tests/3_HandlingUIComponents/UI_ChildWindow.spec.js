const {test, expect} = require('@playwright/test')


test('UI child window', async ({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const usernameTextbox = page.locator("#username");
    const passwordTextbox =  page.locator("[name='password']"); 
    const blinkingText_DocReq = page.locator("[href*='documents-request']");
    

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingText_DocReq.click()   
    ])

    const redParaText = await newPage.locator(".red").textContent();
    console.log(redParaText);
    //await  page.pause();
    const arrayTest = redParaText.split("@");
    console.log(arrayTest);
    const domainName = arrayTest[1].split(" ")[0];
    console.log(domainName);
    console.log(redParaText.split("@")[1].split(" ")[0]);

    await usernameTextbox.fill(domainName);
   // await  page.pause();
    console.log("username value is  : ", await usernameTextbox.inputValue());



    // const blinkingText_SmartHire = page.locator("[href*='techsmarthire']");
    const blinkingText_SmartHire = page.locator('a:has-text("Get Shortlisted by Recruiters")');
            //blinkingText_SmartHire.click({ force: true });
    await blinkingText_SmartHire.waitFor({ state: 'attached' });
    await blinkingText_SmartHire.click();
     const [newPage2] = await Promise.all([
        context.waitForEvent('page'),
        blinkingText_SmartHire.click()   
    ])

    const techSamrtText = await newPage2.locator("p.mb-4").textContent();
    console.log(techSamrtText);
    
    


});