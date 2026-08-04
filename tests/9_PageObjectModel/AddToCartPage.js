
class AddToCartPage{

    constructor(page){
        this.cartItem = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.cartTab = page.locator("[routerlink*='cart']")

    }

    async addCart(productToAdd){
        await this.cartItem.first().waitFor();
        console.log(await this.cartItem.allTextContents());
        const productCount = await this.products.count();
        for(let i=0; i<productCount; i++){
            const productName = await this.products.nth(i).locator("b").textContent();
            console.log(productName);
            if(productName===productToAdd){
                await this.products.nth(i).locator("button:has-text(' Add To Cart')").click();
                break;
            }
        }
        await this.cartTab.click();
    }
}

module.exports = {AddToCartPage};