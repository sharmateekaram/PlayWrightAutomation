const { test, expect } = require('@playwright/test');
const { POManager } = require('./POManager');
///Json-> string-> js Object
const jsondata = JSON.parse(JSON.stringify(require('../Utils/placeOrderTestData.json')));


test.describe.configure({mode:"parallel"});  //test within a file will run  in parallel mode
//test.describe.configure({mode:"serial"});  //Tests within a file will execute one by one but if any of the test is failed then remaining test will not  execute

test(' @web 1 E2E + page object WITH Page Object Manager + JSON  data', async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   const pOManager = new POManager(page);

   const loginPage = pOManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(jsondata.userEmailId, jsondata.userPswd);

   const addToCartPage = pOManager.getAddToCartPage();
   await addToCartPage.addCart(jsondata.productToAdd);

   const cartPage = pOManager.getCartPage();
   await cartPage.VerifyAddedToCartDetail(jsondata.productToAdd);
   await cartPage.clickOnCheckout();

   const paymentPage = pOManager.getPaymentPage();
   await paymentPage.fillPaymentDetails(jsondata.countrySortName, jsondata.countryFullName, jsondata.userEmailId);
   await paymentPage.submitPayment();

   const orderConfirmationPage = pOManager.getOrderConfirmationPage();
   const orderID = await orderConfirmationPage.verifyOrderDetails();
   await orderConfirmationPage.clickOnOrderTab();

   const myOrderPage = pOManager.getMyOrderPage();
   await myOrderPage.validateOrderIdOnMyOrderPage(orderID);

});


test('2 E2E + page object WITH Page Object Manager + JSON  data', async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   const pOManager = new POManager(page);

   const loginPage = pOManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(jsondata.userEmailId, jsondata.userPswd);

   const addToCartPage = pOManager.getAddToCartPage();
   await addToCartPage.addCart(jsondata.productToAdd);

   const cartPage = pOManager.getCartPage();
   await cartPage.VerifyAddedToCartDetail(jsondata.productToAdd);
   await cartPage.clickOnCheckout();

   const paymentPage = pOManager.getPaymentPage();
   await paymentPage.fillPaymentDetails(jsondata.countrySortName, jsondata.countryFullName, jsondata.userEmailId);
   await paymentPage.submitPayment();

   const orderConfirmationPage = pOManager.getOrderConfirmationPage();
   const orderID = await orderConfirmationPage.verifyOrderDetails();
   await orderConfirmationPage.clickOnOrderTab();

   const myOrderPage = pOManager.getMyOrderPage();
   await myOrderPage.validateOrderIdOnMyOrderPage(orderID);

});


test('3 E2E + page object WITH Page Object Manager + JSON  data', async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   const pOManager = new POManager(page);

   const loginPage = pOManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(jsondata.userEmailId, jsondata.userPswd);

   const addToCartPage = pOManager.getAddToCartPage();
   await addToCartPage.addCart(jsondata.productToAdd);

   const cartPage = pOManager.getCartPage();
   await cartPage.VerifyAddedToCartDetail(jsondata.productToAdd);
   await cartPage.clickOnCheckout();

   const paymentPage = pOManager.getPaymentPage();
   await paymentPage.fillPaymentDetails(jsondata.countrySortName, jsondata.countryFullName, jsondata.userEmailId);
   await paymentPage.submitPayment();

   const orderConfirmationPage = pOManager.getOrderConfirmationPage();
   const orderID = await orderConfirmationPage.verifyOrderDetails();
   await orderConfirmationPage.clickOnOrderTab();

   const myOrderPage = pOManager.getMyOrderPage();
   await myOrderPage.validateOrderIdOnMyOrderPage(orderID);

});


//interview to  run with tag
//npx playwright test --config playwright.config2.js --grep "@web" 
//npx playwright test --grep "@web" 