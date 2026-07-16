const {test, expect} = require('@playwright/test');

const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
// ── Credentials ────────────────────────────────────────────────────────────────
const USER_EMAIL    = 'mrbhardwaj.akash88@gmail.com';// update email and password with your account
const USER_PASSWORD = 'Testing@112233'; 



test('Single ticket booking is eligible for refund', async ({page})=>{

    //   Step 1 — Login -Call your login helper    
    await loginEventHub(page);

    // Step 2 — Book first event with 1 ticket (default)
    console.log("// Step 2 — Book first event with 1 ticket (default)");
    // - Navigate to /events
    await page.goto(`${BASE_URL}/events`);
    // - Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")
    await page.getByTestId("event-card").first().getByTestId('book-now-btn').click();
    // - Fill Full Name, Email (your email), Phone
    await fiilingBookTicketForm(page);
    // - Click confirm button (.confirm-booking-btn)
    await page.getByRole('button', {name:'Confirm Booking'}).click();

    // Step 3 — Navigate to booking detail
    await navigateToBookingDetail(page);

    // Step 4 — Validate booking ref
    // - Read booking ref from page
    await validateBookingRef(page);

    // Step 5 — Check refund eligibility
    await checkRefundEligibility(page)

    // Step 6 — Validate result

    // - Locate result element by id #refund-result
    const refundresultText = await page.locator("#refund-result");
    // - Assert it is visible
    await expect(refundresultText).toBeVisible();
    // - Assert it contains text Eligible for refund
    await expect(refundresultText).toContainText("Eligible for refund");
    // - Assert it contains text Single-ticket bookings qualify for a full refund
    await expect(refundresultText).toContainText("Single-ticket bookings qualify for a full refund");
    console.log(await refundresultText.textContent());

});



test('Group ticket booking is NOT eligible for refund', async ({page})=>{

    //   Step 1 — Login -Call your login helper    
    await loginEventHub(page);

    // Step 2 — after navigating to the event detail page, click the + button twice to increase quantity to 3 before filling the form
    console.log("// Step 2 — after navigating to the event detail page, click the + button twice to increase quantity to 3 before filling the form");
    // - Navigate to /events
    await page.goto(`${BASE_URL}/events`);
    // - Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")
    await page.getByTestId("event-card").first().getByTestId('book-now-btn').click();
     //- Locate the increment button with button:has-text("+") and click it twice
    const incrementButton =  page.locator("button:has-text('+')");
    await incrementButton.click();
    await incrementButton.click();

    // - Fill Full Name, Email (your email), Phone
    await fiilingBookTicketForm(page);
    // - Click confirm button (.confirm-booking-btn)
    await page.getByRole('button', {name:'Confirm Booking'}).click();

    // Step 3 — Navigate to booking detail
    await navigateToBookingDetail(page);

    // Step 4 — Validate booking ref
    await validateBookingRef(page);

    // Step 5 — Check refund eligibility
    await checkRefundEligibility(page)

    // Step 6 — Validate result
    // - Locate result element by id #refund-result
    const refundresultText = await page.locator("#refund-result");
    // - Assert it is visible
    await expect(refundresultText).toBeVisible();
    // -Assert result contains Not eligible for refund
    await expect(refundresultText).toContainText("Not eligible for refund");
    // - Assert result contains Group bookings (3 tickets) are non-refundabled
    await expect(refundresultText).toContainText("Group bookings (3 tickets) are non-refundable");
    console.log(await refundresultText.textContent());

});



//helpler
async function loginEventHub(page) {
    console.log(" Step 1 — Login");
    await page.goto(`${BASE_URL}/login`);
    // Located by placeholder
    await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
    // Located by label
    await page.getByLabel('Password').fill(USER_PASSWORD);
    // Located by id
    await page.locator('#login-btn').click();
    // await expect(page.locator("a span.justify-center")).toHaveText("Browse Events →");
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();    
}

async function navigateToBookingDetail(page) {
     // Step 3 — Navigate to booking detail
     console.log("// Step 3 — Navigate to booking detail");
    // - Click View My Bookings link
    await page.getByRole('button',{name:'View My Bookings'}).click();
    // - Assert URL is /bookings
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    // - Click the first View Details link
    await page.getByText("View Details").first().click();
    // - Assert: text Booking Information is visible on the page
    await expect(page.getByText("Booking Information")).toBeVisible();    
}

async function validateBookingRef(page) {
    // Step 4 — Validate booking ref
    console.log("Step 4 — Validate booking ref");
    // - Read booking ref from page
    const bookingRef = await page.locator("nav.mb-6 span.text-gray-900").textContent();
    // - Read event title from h1
    const eventTitle = await page.locator("div.mb-8 h1").textContent();
    // - Assert validation : "first character of booking ref equals first character of event title"
    await expect(bookingRef.at(0)).toBe(eventTitle.at(0));    
}

async function checkRefundEligibility(page) {
    // Step 5 — Check refund eligibility
    console.log("// Step 5 — Check refund eligibility");
    // - Click the Check Refund Eligibility button
    await page.getByTestId("check-refund-btn").click();
    // - Assert: spinner element (#refund-spinner) is immediately visible
    await expect(page.locator("[aria-label='Loading']")).toBeVisible();
    // - Assert: spinner is no longer visible within 6 seconds
    await expect(page.locator("[aria-label='Loading']")).toBeHidden({timeout:6000});   
}

async function fiilingBookTicketForm(page) {
     // - Fill Full Name, Email (your email), Phone
    await page.getByLabel("Full Name").fill("Akash");
    await page.locator("#customer-email").fill("akash@akash.com");
    await page.getByPlaceholder("+91 98765 43210").fill("1234567891");      
}