const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;
        this.cartSectionHeading = page.locator(".cartSection h3")
        this.checkOutlink = page.locator("text=Checkout");
    }

    async VerifyAddedToCartDetail(productName) {
        await this.cartSectionHeading.first().waitFor();
        console.log(await this.cartSectionHeading.allTextContents());
        await expect( this.cartSectionHeading.isVisible()).toBeTruthy();
        await expect( this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
      //  await expect( this.page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

    }

    async clickOnCheckout() {
        await this.checkOutlink.click();
    }
}
module.exports = { CartPage };

