const { expect } = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.thankLabel = page.locator(".hero-primary");
        this.orderIDs = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderTab = page.locator("button[routerlink*='/myorders']");
    }


    async verifyOrderDetails() {
        console.log(await this.thankLabel.textContent());
        expect(await this.thankLabel).toHaveText(" Thankyou for the order. ");
        const orderID = await this.orderIDs.first().textContent();
        console.log(orderID);
        return orderID;
    }

    async clickOnOrderTab() {
        await this.orderTab.click();
    }
}

module.exports = { OrderConfirmationPage };