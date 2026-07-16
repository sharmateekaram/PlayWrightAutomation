
const { test, expect, request } = require('@playwright/test');
const fakePayLoadOrders = { data: [], message: "No Orders" };

test(' ABC Intercept Resposne- Understand the playwright route method and its parameters in intercepting ', async ({ page }) => {


    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("Akash@abc.com");
    await page.locator("#userPassword").fill("Testing@11111");
    await page.locator("#login").click();
    //await page.waitForLoadState("networkidle");
    //await page.locator(".card-body b").first().waitFor();

    //const getOderURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a343b3e17ee3e78baebc855";
    const getOrderURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";
    await page.route(getOrderURL,
        async route => {
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
            const response1 = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);  //interview converting java script objec tinto json object
            route.fulfill(
                {
                    response1,
                    body,
                })
        }

    );

    await page.locator("button[routerlink*='/myorders']").click();
    await page.waitForResponse(getOrderURL);
    console.log(page.locator(".mt-4").textContent());



});

