const { expect } = require('@playwright/test');

class MyOrderPage {
    constructor(page) {
        this.tableRow = page.locator(".table-bordered tbody tr");
        this.orderId_MyOrder = page.locator(".col-md-6 .col-text");

    }

    async validateOrderIdOnMyOrderPage(orderID) {
        await this.tableRow.first().waitFor();

        // const tableRow = await page.locator(".table-bordered tbody tr");
        console.log("Count of table's Rows : ", await this.tableRow.count());
        for (let i = 0; i < await this.tableRow.count(); i++) {
            const currentRowOrder = await this.tableRow.nth(i).locator("th").textContent();
            if (orderID.includes(currentRowOrder)) {
                console.log("Order is found on orders tab as :", currentRowOrder);
                await this.tableRow.nth(i).locator("button:has-text('View')").click();
                break;
            }
        }
        const orderIdDetail = await this.orderId_MyOrder.textContent();
        console.log("Order id on order summary :", orderIdDetail);
        await expect(orderID.includes(orderIdDetail)).toBeTruthy();

    }
}

module.exports = { MyOrderPage };