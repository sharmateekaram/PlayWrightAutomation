const {test, expect} = require('@playwright/test');
const {POManager} = require('./POManager')

test.only('E2E order using page object WITH Page Object Manager', async ({browser})=>
 {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmailId =  "Akash@abc.com"
    const userPswd = "Testing@11111"

    const pOManager = new POManager(page);

    const loginPage = pOManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userEmailId, userPswd);       
  
    const productToAdd = "ZARA COAT 3";
    const addToCartPage = pOManager.getAddToCartPage();
   await addToCartPage.addCart(productToAdd);

    const cartPage = pOManager.getCartPage();
    await cartPage.VerifyAddedToCartDetail(productToAdd);
    await cartPage.clickOnCheckout();

    const paymentPage = pOManager.getPaymentPage();
    await paymentPage.fillPaymentDetails("ind"," India", userEmailId );
    await paymentPage.submitPayment();

    const orderConfirmationPage = pOManager.getOrderConfirmationPage();
    const orderID = await orderConfirmationPage.verifyOrderDetails();
    await orderConfirmationPage.clickOnOrderTab();

    const myOrderPage = pOManager.getMyOrderPage();
    await myOrderPage.validateOrderIdOnMyOrderPage(orderID);

 });
