const {test, expect} = require('@playwright/test');

test('UI Dropdown - traditional HTML <select> and <option> tags', async ({browser})=>
{

        // <select class="form-control" data-style="btn-info">
        //     <option value="stud">Student</option>
        //     <option value="teach">Teacher</option>
        //     <option value="consult">Consultant</option>
        // </select>


    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("akash");
    const userTypeDropdown =  page.locator("select.form-control");
    await expect(userTypeDropdown).toHaveValue("stud");
    
    await userTypeDropdown.selectOption("teach");   
    const selectedText = await userTypeDropdown.evaluate(el => el.options[el.selectedIndex].text);
    console.log(selectedText)
    
    // 1. Select by visible text (Label)
    await userTypeDropdown.selectOption({label:"Student"});
    console.log(await userTypeDropdown.evaluate(el => el.options[el.selectedIndex].text));

    // 2. Select by value attribute (e.g., <option value="consult">)
    await userTypeDropdown.selectOption({value:"consult"});
    console.log(await userTypeDropdown.evaluate(el => el.options[el.selectedIndex].text));

    // 3. Select by Index (0-based)
    await userTypeDropdown.selectOption({index:1});
    //// Extracts the UI text 
    console.log(await userTypeDropdown.evaluate(el => el.options[el.selectedIndex].text));

    // Extracts the value attribute (e.g., "teach")
    console.log("----", await userTypeDropdown.evaluate(el => el.value));   //teach

});



test('UI Dropdown custom dropdown menu components (such as React-Select, Ant Design, or Bootstrap)', async ({browser})=>
{



    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://practice.expandtesting.com/bookstore");

   
    const userTypeDropdown =  page.locator("div.filter_sort-select");
    await page.getByRole('link').filter({ hasText: 'Sort By DESC' }).click();
    await page.pause();
    await page.getByRole('link').filter({ hasText: 'Sort By ASC' }).click();

    
    // const selectedText = await userTypeDropdown.evaluate(el => el.options[el.selectedIndex].text);
    // console.log(selectedText)
    

});


