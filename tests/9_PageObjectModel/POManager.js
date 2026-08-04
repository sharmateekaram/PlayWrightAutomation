const { LoginPage } = require('./LoginPage');
const { AddToCartPage } = require('./AddToCartPage');
const { CartPage } = require('./CartPage');
const { PaymentPage } = require('./PaymentPage');
const { OrderConfirmationPage } = require('./OrderConfirmationPage');
const { OrderPage, MyOrderPage } = require('./MyOrderPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.addToCartPage = new AddToCartPage(page);
        this.cartPage = new CartPage(page);
        this.paymentPage = new PaymentPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.myOrderPage = new MyOrderPage(page);        
    }

    getLoginPage(){ 
        return this.loginPage;
    }
     getAddToCartPage(){ 
        return this.addToCartPage;
    }
     getCartPage(){ 
        return this.cartPage;
    }
     getPaymentPage(){ 
        return this.paymentPage;
    }
     getOrderConfirmationPage(){ 
        return this.orderConfirmationPage;
    }
     getMyOrderPage(){ 
        return this.myOrderPage;
    }
}

module.exports = { POManager };