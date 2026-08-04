const { expect } = require('@playwright/test');

class PaymentPage{
    constructor(page){
        this.selectCountDropdown = page.getByPlaceholder("Select Country");
        this.countryAutoSuggestlist  = page.locator(".ta-results");
        this.emailText = page.locator('[style*="lightgray"]');
        this.submit = page.locator(".action__submit");
    }

    async fillPaymentDetails(selectCountryNamesort, selectCountryName,userEmailId ){        
            await this.selectCountDropdown.pressSequentially(`${selectCountryNamesort}`, {delay:150});
            // await this.selectCountDropdown.pressSequentially("ind", {delay:150});
            //const countryAutoSuggestlist = await this.CountryAuto;
            await this.countryAutoSuggestlist.waitFor();
            const countryAutoSuggestlistCount = await this.countryAutoSuggestlist.locator("button").count();
            console.log(countryAutoSuggestlistCount);        
            for(let i=0; i<countryAutoSuggestlistCount;i++){
                 const actCountryName = await this.countryAutoSuggestlist.locator("button").nth(i).textContent();
                 console.log(actCountryName);
                 if(actCountryName ===`${selectCountryName}`){
                    console.log("find ittttttttttttttttt");
                    await this.countryAutoSuggestlist.locator("button").nth(i).click();
                    break;
                 }
            }      
            await expect(this.emailText).toHaveText(userEmailId);
    }

    async submitPayment(){
        //click on placeorder
        await this.submit.click();

    }


}

module.exports = {PaymentPage};