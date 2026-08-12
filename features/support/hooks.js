
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require('../../tests/9_PageObjectModel/POManager');
const { chromium } = require('playwright');
const path = require("node:path");

Before(async function(){
    this.browser = await chromium.launch({
        headless: false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.pOManager = new POManager(this.page);
})


BeforeStep(function(scenario){
   console.log(`-------------------Before  scenario: ${scenario.pickleStep.name}`);
})


AfterStep(async function ({result}){
    if(result.status === Status.FAILED){ 
         console.log(`-----------Faileddddddd`);
         const screenshotPath = `cucumberfailed_step_${Date.now()}.png`;       
        await this.page.screenshot({path:screenshotPath});
    }    
})





After(async function (scenario) {
    console.log(`Finished scenario: ${scenario.pickle.name} with status: ${scenario.result.status}`);

    try {
        if (this.page) {
            console.log("Page  is closed");
            await this.page.close();
        }
        if (this.context) {
            console.log("context  is closed");
            await this.context.close();
        }
        if (this.browser) {
            console.log("Browser  is closed");
            await this.browser.close();
        }
    } catch (error) {
        console.error("Error during browser teardown:", error);
    }

});