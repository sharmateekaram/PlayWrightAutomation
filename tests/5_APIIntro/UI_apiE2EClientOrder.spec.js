const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail:"Akash@abc.com",userPassword:"Testing@11111"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token, orderID;


test.beforeAll( async ()=>
{

   //login api
   const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
      {
         data:loginPayload
      })
      expect(loginResponse.ok()).toBeTruthy;
   const loginResponseJson = await loginResponse.json();
   console.log(loginResponseJson);
   token = loginResponseJson.token;
   console.log(token);

   //create  order api
   const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
         data : orderPayload,
         headers:{
                     'Authorization' : token,
                     'Content-Type'  : 'application/json'
                  },
      });
      const orderResponseJson = await orderResponse.json();
      console.log(orderResponseJson);
      orderID = orderResponseJson.orders[0];

});


test('place order', async ({browser})=>
 {
    const userEmailId =  "Akash@abc.com"
    const context = await browser.newContext();
    const page = await context.newPage();

    //login api
     //  const userPswd = "Testing@11111"
   //  const userEmailTextbox = page.locator("#userEmail");
   //  const passwordTextbox =  page.locator("#userPassword");   
   //  const signInBtn = page.locator("#login");
   //  await userEmailTextbox.fill(userEmailId);
   //  await passwordTextbox.fill(userPswd);
   //  await signInBtn.click();
   //  await page.locator(".card-body b").first().waitFor();
    page.addInitScript(value => {
      window.localStorage.setItem("token",value);
    },token  );


    //create order     
  
   //  const products = page.locator(".card-body");
   //  const productToAdd = "ZARA COAT 3";
   //  await page.goto("https://rahulshettyacademy.com/client");
   //  console.log(await products.allTextContents());
   //  console.log(await page.locator(".card-body b").allTextContents());

   //  const productCount = await products.count();

   //  for(let i=0; i<productCount; i++){
   //       const productName = await products.nth(i).locator("b").textContent();
   //       console.log(productName);
   //       if(productName===productToAdd){
   //          await products.nth(i).locator("button:has-text(' Add To Cart')").click();
   //          //await products.nth(i).locator("text= Add To Cart").click();
   //          break;
   //       }
   //  }

   //  await page.locator("[routerlink*='cart']").click();
   // // await page.pause();
   //  await page.locator(".cartSection h3").first().waitFor();
   //  console.log(await page.locator(".cartSection h3").allTextContents());

   //  expect(await page.locator("h3:has-text('ZARA COAT 3')").isVisible()).toBeTruthy();
   //  expect(await page.locator(".cartSection h3").isVisible()).toBeTruthy();

   //  await page.locator("text=Checkout").click();


   //  await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150});
   //  const countryAutoSuggestlist = await page.locator(".ta-results");
   //  await countryAutoSuggestlist.waitFor();
   //  const countryAutoSuggestlistCount = await countryAutoSuggestlist.locator("button").count();
   //  console.log(countryAutoSuggestlistCount);

   //  for(let i=0; i<countryAutoSuggestlistCount;i++){
   //       const actCountryName = await countryAutoSuggestlist.locator("button").nth(i).textContent();
   //       console.log(actCountryName);
   //      // await page.pause();
   //       if(actCountryName===" India"){
   //          console.log("find ittttttttttttttttt");
   //          await countryAutoSuggestlist.locator("button").nth(i).click();
   //          break;
   //       }
   //  }


   //  expect(await page.locator('[style*="lightgray"]')).toHaveText(userEmailId);
   //  expect(await page.locator(".user__name [type='text']").first()).toHaveText(userEmailId);

   //  //click on placeorder
   //  await page.locator(".action__submit").click();
   //  console.log(await page.locator(".hero-primary").textContent());
   //  expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   //  const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
   // // await page.pause();
   //  console.log(orderID);





    //click on orders tab
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='/myorders']").click();
    await page.locator(".table-bordered tbody tr").first().waitFor();

    const tableRow = await page.locator(".table-bordered tbody tr");
    console.log("Count of table's Rows : ",await tableRow.count());
    //const tableRow = await page.locator(".table-bordered .ng-star-inserted");
    for(let i=0;i<await tableRow.count();i++){
       const currentRowOrder = await tableRow.nth(i).locator("th").textContent();
       //await page.pause();
       if(orderID.includes(currentRowOrder)){
         console.log("Order is found on orders tab as :",currentRowOrder );
         //expect(await tableRow.locator("th")).toHaveText(orderID); 
         await tableRow.nth(i).locator("button:has-text('View')").click();
         break;
       }
    }

   //await page.locator(".col-md- .col-text").waitFor()
   const orderIdDetail = await page.locator(".col-md-6 .col-text").textContent();
   console.log("Order id on order summary :",orderIdDetail );
   await page.pause();
   await expect(orderID.includes(orderIdDetail)).toBeTruthy();


   

 });
