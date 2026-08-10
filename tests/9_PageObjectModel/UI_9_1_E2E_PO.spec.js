const {test, expect} = require('@playwright/test');
const {LoginPage} = require('./LoginPage');
const {AddToCartPage} = require('./AddToCartPage');
const {CartPage} = require('./CartPage');
const {PaymentPage} = require('./PaymentPage');
const {OrderConfirmationPage} = require('./OrderConfirmationPage');
const {OrderPage, MyOrderPage} = require('./MyOrderPage');

test('E2E order using page object without Page Object Manager', async ({browser})=>
 {
      
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmailId =  "Akash@abc.com"
    const userPswd = "Testing@11111"

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(userEmailId, userPswd);       
  
    const productToAdd = "ZARA COAT 3";
    const addToCartPage = new AddToCartPage(page);
   await addToCartPage.addCart(productToAdd);

    const cartPage = new CartPage(page);
    await cartPage.VerifyAddedToCartDetail(productToAdd);
    await cartPage.clickOnCheckout();

    const paymentPage = new PaymentPage(page);
    await paymentPage.fillPaymentDetails("ind"," India", userEmailId );
    await paymentPage.submitPayment();

    const orderConfirmationPage = new OrderConfirmationPage(page);
    const orderID = await orderConfirmationPage.verifyOrderDetails();
    await orderConfirmationPage.clickOnOrderTab();

    const myOrderPage = new MyOrderPage(page);
    await myOrderPage.validateOrderIdOnMyOrderPage(orderID);

 });
