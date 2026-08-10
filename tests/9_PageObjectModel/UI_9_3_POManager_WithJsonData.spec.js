const { test, expect } = require('@playwright/test');
const { POManager } = require('./POManager');
///Json-> string-> js Object
const jsondata = JSON.parse(JSON.stringify(require('../Utils/placeOrderTestData.json')));

test('E2E + page object WITH Page Object Manager + JSON  data', async ({ browser }) => {

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
