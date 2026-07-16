

const { test, expect, request } = require('@playwright/test');
const loginPayload = { email: "abc1@yahoo.com", password: "Pswd@1234" };
//const bookingPayload = {customerName: "akash", customerEmail: "abc1@gmail.com", customerPhone: "1234543233", quantity:1,eventId:3};
const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
const USER_EMAIL = 'mrbhardwaj.akash88@gmail.com';// update email and password with your account
const USER_PASSWORD = 'Testing@112233';

//helpler
async function loginEventHub(page) {
    console.log(" Gmail user Login");
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
    await page.getByLabel('Password').fill(USER_PASSWORD);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();    
}


test.only('place order', async ({ page }) => {
    console.log("Step 1 — Login as Yahoo user via API");
    // - Use request.post() to call POST /api/auth/login - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Auth/post_auth_login)
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            // - Pass { email, password } as the request body under the data key
            data: loginPayload
        });

    // - Assert the response is OK (loginRes.ok() is truthy)
    expect(loginResponse.ok()).toBeTruthy;
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    // - Parse the JSON response and extract token — you will use this for all subsequent API calls
    const tokenVal = loginResponseJson.token;
    console.log(tokenVal);


    console.log("Step 2 — Fetch events via API to get a valid event ID");
    // - Use request.get() to call GET /api/events - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Events/get_events)
    const eventResponse = await apiContext.get("https://api.eventhub.rahulshettyacademy.com/api/events/2",
        {
            // - Pass Authorization: Bearer <token> in the request headers
            headers: {
                'Authorization': `Bearer ${tokenVal}`,
                'Content-Type': 'application/json'
            },
        });
    // - Assert the response is OK  
    expect(eventResponse.ok()).toBeTruthy;
    const eventResponseJson = await eventResponse.json();
    console.log(eventResponseJson);
    // - Parse the JSON, read data[0].id — store this as eventId
    const eventIdVal = eventResponseJson.data.id;
    console.log(eventIdVal);

    console.log("Step 3 — Create a booking via API as Yahoo user");
    // - Use request.post() to call POST /api/bookings  - (Refer below API Doc link to construct )-
    // https://api.eventhub.rahulshettyacademy.com/api/docs/#/Bookings/post_bookings
    const bookingResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
        {
            // - Pass Authorization: Bearer <token> in headers
            data: { customerName: "akash", customerEmail: "abc1@gmail.com", customerPhone: "1234543233", quantity: 1, eventId: eventIdVal },
            headers: {
                'Authorization': `Bearer ${tokenVal}`,
                'Content-Type': 'application/json'
            },
            // - Pass the booking payload in data:
            // - eventId — from Step 2
            // - customerName — any name e.g. 'Yahoo User'
            // - customerEmail — Yahoo user's email
            // - customerPhone — any 10-digit number
            // - quantity — 1

        });
    // - Assert the response is OK
    expect(bookingResponse.ok()).toBeTruthy();
    const bookingResponseJson = await bookingResponse.json();
    console.log(bookingResponseJson);
    // - Parse the JSON and extract data.id — store as yahooBookingId
    const yahooBookingId = bookingResponseJson.data.id;
    console.log(yahooBookingId);


    console.log("Step 4 — Login as Gmail user via browser UI");
    // - Call your loginAs(page, GMAIL_USER) helper
    await loginEventHub(page);


    console.log("Step 5 — Navigate to Yahoo's booking URL as Gmail user");

    // - Navigate directly to / bookings / ${ yahooBookingId }
      await page.goto(`${BASE_URL}/bookings/${yahooBookingId}` , { waitUntil: 'networkidle' });  
    // - Pass { waitUntil: 'networkidle' } as the navigation option so the page fully resolves before asserting
    
    console.log("Step 6 — Validate Access Denied");
    // - Assert text Access Denied is visible
    await expect(page.locator("h3:has-text('Access Denied')")).toBeVisible();
    // - Assert text You are not authorized to view this booking is visible
    await expect(page.locator("p:has-text('You are not authorized to view this booking.')")).toBeVisible();

});