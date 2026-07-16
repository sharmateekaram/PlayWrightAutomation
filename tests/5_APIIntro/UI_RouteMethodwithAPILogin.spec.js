
const { test, expect, request } = require('@playwright/test');
const { APILoginOrderUtils } = require('./Utils/APILoginOrderUtils');


const loginPayload = { userEmail: "Akash@abc.com", userPassword: "Testing@11111" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APILoginOrderUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);

});

test('Intercept Resposne- Understand the playwright route method and its parameters in intercepting ', async ({ page }) => {
  const userEmailId = "Akash@abc.com"

  page.addInitScript(value => {
    window.localStorage.setItem("token", value);
  }, response.token);

  //click on orders tab
  await page.goto("https://rahulshettyacademy.com/client");
  //const getOderURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a343b3e17ee3e78baebc855";
  const getOrderURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";


  await page.route(getOrderURL,
    async route => {
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
      const repsonse1 = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);  //interview converting java script objec tinto json object
      route.fulfill(
        {
          repsonse1,
          body,
        })
    }

  );

  await page.locator("button[routerlink*='/myorders']").click();
  //await page.pause();
  await page.waitForResponse(getOrderURL);
  console.log(page.locator(".mt-4").textContent());



});

