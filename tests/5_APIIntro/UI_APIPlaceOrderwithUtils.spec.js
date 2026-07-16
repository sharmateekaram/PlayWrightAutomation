
const { test, expect, request } = require('@playwright/test');
const { APILoginOrderUtils } = require('./Utils/APILoginOrderUtils');


const loginPayload = { userEmail: "Akash@abc.com", userPassword: "Testing@11111" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APILoginOrderUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);

});

test('UI API place order', async ({ page }) => {
  const userEmailId = "Akash@abc.com"

  page.addInitScript(value => {
    window.localStorage.setItem("token", value);
  }, response.token);

  //click on orders tab
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='/myorders']").click();
  await page.locator(".table-bordered tbody tr").first().waitFor();

  const tableRow = await page.locator(".table-bordered tbody tr");
  console.log("Count of table's Rows : ", await tableRow.count());
  //const tableRow = await page.locator(".table-bordered .ng-star-inserted");
  for (let i = 0; i < await tableRow.count(); i++) {
    const currentRowOrder = await tableRow.nth(i).locator("th").textContent();
    //await page.pause();
    if (response.orderID.includes(currentRowOrder)) {
      console.log("Order is found on orders tab as :", currentRowOrder);
      //expect(await tableRow.locator("th")).toHaveText(orderID); 
      await tableRow.nth(i).locator("button:has-text('View')").click();
      break;
    }
  }

  //await page.locator(".col-md- .col-text").waitFor()
  const orderIdDetail = await page.locator(".col-md-6 .col-text").textContent();
  console.log("Order id on order summary :", orderIdDetail);
  //await page.pause();
  await expect(response.orderID.includes(orderIdDetail)).toBeTruthy();


});

