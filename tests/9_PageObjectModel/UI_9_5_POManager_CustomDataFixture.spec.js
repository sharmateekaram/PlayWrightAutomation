const { expect} = require('@playwright/test');
const { POManager } = require('./POManager');


const { customeTest}= require('../Utils/customTest-data')


customeTest('E2E + PO Manager + Custom Data', async ({browser,testDataForOrder})=>
 {    
    const context = await browser.newContext();
    const page = await context.newPage();
    const pOManager = new POManager(page);

    const loginPage = pOManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userEmailId, testDataForOrder.userPswd);       
  
    const addToCartPage = pOManager.getAddToCartPage();
   await addToCartPage.addCart(testDataForOrder.productToAdd);

    const cartPage = pOManager.getCartPage();
    await cartPage.VerifyAddedToCartDetail(testDataForOrder.productToAdd);
    await cartPage.clickOnCheckout();

    const paymentPage = pOManager.getPaymentPage();
    await paymentPage.fillPaymentDetails(testDataForOrder.countrySortName, testDataForOrder.countryFullName, testDataForOrder.userEmailId );
    await paymentPage.submitPayment();

    const orderConfirmationPage = pOManager.getOrderConfirmationPage();
    const orderID = await orderConfirmationPage.verifyOrderDetails();
    await orderConfirmationPage.clickOnOrderTab();

    const myOrderPage = pOManager.getMyOrderPage();
    await myOrderPage.validateOrderIdOnMyOrderPage(orderID);

 });
