
class LoginPage {

    constructor(page){
        this.page = page;
        this.userEmailTextbox = page.locator("#userEmail");
        this.passwordTextbox =  page.locator("#userPassword");   
        this.signInBtn = page.locator("#login");
    }

    goTo(){
        this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userEmailId, userPswd){
        await this.userEmailTextbox.fill(userEmailId);
        await this.passwordTextbox.fill(userPswd);
        await this.signInBtn.click();
        
    }
}
module.exports = {LoginPage};

