export async function login(page, username, password) {
  // Navigate to the login page
   await page.getByPlaceholder("you@email.com").fill("mrbhardwaj.akash88@gmail.com");
    await page.getByLabel("Password").fill("Testing@112233");
    await page.locator("#login-btn").click();
    console.log(await page.locator("a span.justify-center").textContent());
    await expect(page.locator("a span.justify-center")).toHaveText("Browse Events →");


}