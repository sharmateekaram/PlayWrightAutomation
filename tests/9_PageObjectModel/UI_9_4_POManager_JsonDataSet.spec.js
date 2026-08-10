const { test, expect } = require('@playwright/test');
const { POManager } = require('./POManager');
///Json-> string-> js Object
const jsondataset = JSON.parse(JSON.stringify(require('../Utils/placeOrderTestDataSet.json')));



for (const data of jsondataset) 
{
   test(`E2E+Page Object Manager+JSON DATA SET ${data.productToAdd}`, async ({ browser }) => {

      const context = await browser.newContext();
      const page = await context.newPage();

      const pOManager = new POManager(page);

      const loginPage = pOManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(data.userEmailId, data.userPswd);

      const addToCartPage = pOManager.getAddToCartPage();
      await addToCartPage.addCart(data.productToAdd);

      const cartPage = pOManager.getCartPage();
      await cartPage.VerifyAddedToCartDetail(data.productToAdd);
      await cartPage.clickOnCheckout();

      const paymentPage = pOManager.getPaymentPage();
      await paymentPage.fillPaymentDetails(data.countrySortName, data.countryFullName, data.userEmailId);
      await paymentPage.submitPayment();

      const orderConfirmationPage = pOManager.getOrderConfirmationPage();
      const orderID = await orderConfirmationPage.verifyOrderDetails();
      await orderConfirmationPage.clickOnOrderTab();

      const myOrderPage = pOManager.getMyOrderPage();
      await myOrderPage.validateOrderIdOnMyOrderPage(orderID);

   });

}