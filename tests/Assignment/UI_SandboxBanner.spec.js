
const { test, expect, request } = require('@playwright/test');

const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
const USER_EMAIL    = 'mrbhardwaj.akash88@gmail.com';// update email and password with your account
const USER_PASSWORD = 'Testing@112233'; 

const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};


async function loginAndGoToEvents(page) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
    await page.getByLabel('Password').fill(USER_PASSWORD);
    await page.locator('#login-btn').click();
    //await page.goto(`${BASE_URL}/events`);
    await page.locator('.items-center a[href="/events"]').click();
}




test('Test 1 — Banner IS visible when 6 events are returned', async ({ page }) => {
    // Step 1 — Set up the API mock
    // - Intercept all requests matching **/api/events** using page.route()
    // - In the handler, call route.fulfill() with status 200, content type application/json, and body set to JSON.stringify(SIX_EVENTS_RESPONSE)
    // - The mock must be registered before navigating to the events page
    await page.route('**/api/events**', async (route) => {
        await route.fulfill(
            {
            status      :  200,
            contentType :  'application/json',
            body        :  JSON.stringify(SIX_EVENTS_RESPONSE),
        });
    });

    //  Step 2 — Login and navigate
    // - Call your loginAndGoToEvents(page) helper
    await loginAndGoToEvents(page);

    
    //   Step 3 — Verify cards loaded from mock
    // - Get all event cards by data-testid="event-card"
    const allEventCards = await page.getByTestId("event-card")
    console.log(await allEventCards.allTextContents());
    
    // - Assert first card is visible
    await expect(allEventCards.first()).toBeVisible();
    
    // - Assert card count equals exactly 6
    await expect(allEventCards).toHaveCount(6);
    


    //     Step 4 — Verify banner is visible
    // - Locate the banner using a case-insensitive text regex: /sandbox holds up to/i
    const banner = page.getByText(/sandbox holds up to/i);
    console.log(await banner.textContent());
    // - Assert it is visible
    await expect(banner).toBeVisible();
    // - Assert it contains text 9 bookings
    await expect(banner).toContainText("9 bookings");
    await page.pause();
});


test('Test 2 - Banner is NOT visible when 4 events are returned', async({page})=>
{

// Step 1 — Set up the API mock
    // - Intercept all requests matching **/api/events** using page.route()
    // - In the handler, call route.fulfill() with status 200, content type application/json, and body set to JSON.stringify(SIX_EVENTS_RESPONSE)
    // - The mock must be registered before navigating to the events page

    await page.route("**/api/events**", async(route)=>{
        await route.fulfill({
            status      :  200,
            contentType : 'application/json',
            body        : JSON.stringify(FOUR_EVENTS_RESPONSE)
        })
    });


    //  Step 2 — Login and navigate
    // - Call your loginAndGoToEvents(page) helper
    await loginAndGoToEvents(page);

    
    //   Step 3 — Verify cards loaded from mock
    // - Get all event cards by data-testid="event-card"
    const allEventCards = await page.getByTestId("event-card")
    console.log(await allEventCards.allTextContents());
      
    // - Assert first card is visible
    await expect(allEventCards.first()).toBeVisible();
    
    // - Assert card count equals exactly 6
    await expect(allEventCards).toHaveCount(4);
    

    //     Step 4 — Verify banner is visible
    // - Locate the banner using a case-insensitive text regex: /sandbox holds up to/i
    const banner = page.getByText(/sandbox holds up to/i);
    //console.log(await banner.textContent());
    // - Assert it is not visible
    await expect(banner).not.toBeVisible();
     

});