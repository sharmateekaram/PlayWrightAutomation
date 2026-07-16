
const { test, expect } = require('@playwright/test');

test('UI Intercept Network Request', async ({ page }) => {

    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("Akash@abc.com");
    await page.locator("#userPassword").fill("Testing@11111");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='/myorders']").click();

    const requestURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*";
    const fakeRequestURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=123a56762385b2329b49e9e989";

    //Intercept Network Request
    await page.route(requestURL,
        route => route.continue({ url: fakeRequestURL })
    )

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");


});



