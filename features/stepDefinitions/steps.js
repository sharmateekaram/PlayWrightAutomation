const { Given, When, Then } = require('@cucumber/cucumber');
//const { POManager } = require('../../tests/9_PageObjectModel/POManager');

let orderID;

Given('User login in the Ecom application with {string} and {string}', { timeout: 100 * 1000 }, async function (user_Name, user_Password) {
    const loginPage = this.pOManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(user_Name, user_Password);
});

When('Add {string} to cart', async function (valueToAdd) {
    const addToCartPage = this.pOManager.getAddToCartPage();
    await addToCartPage.addCart(valueToAdd);
});

Then('Verify {string} is displayed in cart', async function (valueToAdd) {
    const cartPage = this.pOManager.getCartPage();
    await cartPage.VerifyAddedToCartDetail(valueToAdd);
    await cartPage.clickOnCheckout();
});

When('Enter valid payment details and Place the order with country code {string}, and country Name {string}, and username {string}', { timeout: 100 * 1000 }, async function (countrySortName, countryFullName, user_Name) {
    const paymentPage = this.pOManager.getPaymentPage();
    await paymentPage.fillPaymentDetails(countrySortName, countryFullName, user_Name);
    await paymentPage.submitPayment();

});

Then('Verify order on confirmation page', async function () {
    const orderConfirmationPage = this.pOManager.getOrderConfirmationPage();
    orderID = await orderConfirmationPage.verifyOrderDetails();
    await orderConfirmationPage.clickOnOrderTab();

});

Then('Verify order is present in the Order History', async function () {
    const myOrderPage = this.pOManager.getMyOrderPage();
    await myOrderPage.validateOrderIdOnMyOrderPage(orderID);
});


Given('User login in the Ecom2 application with {string} and {string}', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Verify error message is displayed', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


