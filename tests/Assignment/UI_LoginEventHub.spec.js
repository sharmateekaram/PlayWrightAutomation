const {test,expect }  =require('@playwright/test');
//import { login } from './Helpers/UI_LoginMethod';

const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'

test('Assignment1', async({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com");
    //other way await page.goto(`${BASE_URL}/login`);

   // await login(page, username, password);

    // Step 1 — Login
    // - Navigate to /login
    // - Fill email field (locate by placeholder you@email.com)
    // - Fill password field (locate by label Password)
    // - Click the login button (locate by id #login-btn)
    // // - Assert: link with text Browse Events → is visible (confirms login success) 
    console.log("-----------", await page.url());
    console.log("Step 1 — Login");   
    await page.getByPlaceholder("you@email.com").fill("mrbhardwaj.akash88@gmail.com");
    await page.getByLabel("Password").fill("Testing@112233");
    await page.locator("#login-btn").click();
    console.log(await page.locator("a span.justify-center").textContent());
    await expect(page.locator("a span.justify-center")).toHaveText("Browse Events →");
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();        //other way


// Step 2 — Create a new event
// - Navigate to /admin/events
// - Generate a unique event title using Test Event ${Date.now()} — store this in a variable, you will need it throughout the test
// - Fill Title field (locate by id #event-title-input)
// - Fill Description textarea (locate using #admin-event-form textarea)
// - Fill City field (locate by label City)
// - Fill Venue field (locate by label Venue)
// - Fill Event Date & Time field (locate by label Event Date & Time) — use your futureDateValue() helper
// - Fill Price ($) field (locate by label Price ($)) — use any number e.g. 100
// - Fill Total Seats field (locate by label Total Seats) — use 50
// - Click the submit button (locate by id #add-event-btn)
// - Assert: toast message Event created! is visible

await page.locator("button:has-text('Admin')").click();
await page.locator(".relative  a[href='/admin/events']").click();
console.log("-----------", await page.url());
console.log("Step 2 — Create a new event");
// if (expect(await page.locator(".mx-1").first()).toBeVisible()){
//         if(expect(await page.locator(".mx-1").first()).toHaveText("9 bookings")){
//             await page.getByRole("button",{name:"Add New Event"}).click();
//         }
// }
await page.locator("div .mb-2").waitFor();
console.log(await page.locator("div .mb-2").textContent());
const titleName = Date.now().toString();
await page.locator("#event-title-input").fill(titleName);
await page.locator("#admin-event-form textarea").fill("DescriptionDescriptionTest");
await page.getByLabel("City").fill("Delhi");
await page.getByLabel("Venue").fill("VenueDwarkaF23");
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate()+5);
                futureDate.toISOString();
                // const firstIndex = futureDate.indexOf(":");
                // const secondIndex = futureDate.indexOf(":", firstIndex + 1);
                console.log(futureDate);
await page.locator("[type='datetime-local']").click();
//await page.getByLabel("Event Date & Time").fill(String(futureDate));
await page.getByLabel("Event Date & Time").fill("2028-09-09T14:02");
await page.getByLabel("Price ($)").fill("103");
await page.getByLabel("Total Seats").fill("50");
await page.getByLabel("Price ($)").fill("103");
await page.locator("#add-event-btn").click();
await expect(page.locator("p:has-text('Event created!')")).toBeVisible();
await expect(page.getByText('Event created!')).toBeVisible();  //other way


// Step 3 — Find the event card and capture seats
// - Navigate to /events
// - Get all event cards (locate by data-testid="event-card")
// - Assert the first card is visible (confirms page loaded)
// - From all cards, filter for the one that contains your event title text
// - Assert the matched card is visible (timeout 5 seconds)
// - Read the seat count text from that card (locate element containing text seat, 
        // parse integer from   its inner text) — store this as seatsBeforeBooking

    //const titleName = "1782841050503";
    let seatsBeforeBooking;
    await page.locator('.items-center a[href="/events"]').click();
    console.log("-----------", await page.url());
    console.log("Step 3 — Find the event card and capture seats");

    const allEventCards = page.locator("#event-card");
    await allEventCards.first().waitFor();
    await expect(allEventCards.first()).toBeVisible();   
    
    console.log(await allEventCards.allTextContents());
    console.log("All event card's' count is : ", await allEventCards.count());
    for(let i=0;i<await allEventCards.count(); i++){
            const eventCardName = await allEventCards.nth(i).locator("h3").textContent();
            console.log(i, "th event name is : ", eventCardName);
            if(eventCardName===titleName){
                console.log(i, "th Event is matched with expected : ", eventCardName);
                await expect(allEventCards.nth(i).locator("h3")).toBeVisible({ timeout: 5000 });
                const seatsBeforeBookingtext = await allEventCards.nth(i).locator(".items-center span").textContent();
                console.log(seatsBeforeBookingtext);
                seatsBeforeBooking = Number(seatsBeforeBookingtext.split(" ")[0]);  
                console.log(seatsBeforeBooking); 
               
                // Step 4 — Start booking
                // - On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" inside the card)
                console.log("-----------", await page.url());
                console.log("Step 4 — Start booking");
                await allEventCards.nth(i).locator("#book-now-btn").click();

                break;
            }
    }


   

    

// Step 5 — Fill booking form
// - Assert: element with id #ticket-count has text 1 (default quantity)
// - Fill Full Name (locate by label Full Name)
// - Fill Email (locate by id #customer-email)
// - Fill Phone (locate by placeholder +91 98765 43210)
// - Click the confirm button (locate by CSS class .confirm-booking-btn)
await page.locator("h2:has-text('Book Tickets')").waitFor();
console.log("-----------", await page.url());
console.log("Step 5 — Fill booking form");
console.log(await page.locator("#ticket-count").textContent());
    //Interview The expression await expect(Number(page.locator('#ticket-count').textContent())).toBe(1); will fail in Playwright. 
    // The textContent() method is asynchronous, and Number() will evaluate to NaN before the promise resolves
    //await expect(Number(page.locator("#ticket-count").textContent())).toBe(1);
await expect(page.locator('#ticket-count')).toHaveText('1');
const countText = await page.locator('#ticket-count').textContent();
expect(Number(countText)).toBe(1);   
await page.getByLabel("Full Name").fill("Akash");
await page.locator("#customer-email").fill("akash@akash.com");
await page.getByPlaceholder("+91 98765 43210").fill("1234567891");
await page.locator(".confirm-booking-btn").click();


// Step 6 — Verify booking confirmation
// - Locate the booking reference element (locate by CSS class .booking-ref, take .first())
// - Assert it is visible
// - Read its inner text, trim it — store as bookingRef
console.log("-----------", await page.url());
console.log("Step 6 — Verify booking confirmation");
await expect(page.locator("h3.mb-1")).toContainText("Booking Confirmed!");
const bookingRefloc = page.locator("");
await expect(bookingRefloc).toBeVisible();
console.log(await bookingRefloc.textContent());
const bookingRef = (await bookingRefloc.textContent()).trim();
console.log(`Booking confirmed. Ref: ${bookingRef}`);


// Step 7 — Verify in My Bookings
// - Click the link View My Bookings
// - Assert: URL is BASE_URL/bookings
// - Get all booking cards (locate by id #booking-card)
// - Assert the first booking card is visible
// - Filter booking cards for the one that contains an element with class  matching your bookingRef text
// - Assert that matched card is visible
// - Assert that matched card contains your eventTitle text
await page.locator("a[href='/bookings'] button").click();
console.log("-----------", await page.url());
console.log("Step 7 — Verify in My Bookings");
await expect(page).toHaveURL(/bookings/);
const allBookingCards = page.locator("#booking-card");
await allBookingCards.first().waitFor();
    console.log(await allBookingCards.allTextContents());
    console.log(await allBookingCards.allInnerTexts());
    await expect(allBookingCards.filter({hasText:bookingRef})).toBeVisible();
    await expect(page.getByText(bookingRef)).toBeVisible();
for(let i=0;i<await allBookingCards.count();i++){
    const bookingrefMyBooking = await allBookingCards.nth(i).locator(".booking-ref").textContent();
    console.log(await allBookingCards.nth(i).locator(".booking-ref").textContent());
    if(bookingrefMyBooking===bookingRef){
        console.log("booking ref number is found  inside my booking");
        console.log("Event Title is :",await allBookingCards.nth(i).locator(".min-w-0 h3").textContent())
        await expect(allBookingCards.nth(i).locator(".min-w-0 h3")).toBeVisible();
        await expect(allBookingCards.nth(i).locator(".min-w-0 h3")).toHaveText(titleName);
        break;
    }
}



// Step 8 — Verify seat reduction
// - Navigate back to /events
// - Assert the first event card is visible
// - Filter cards again using hasText: eventTitle
// - Assert the card is visible
// - Read the seat count text again (same as Step 3) — store as seatsAfterBooking
// - Assert: seatsAfterBooking === seatsBeforeBooking - 1
    await page.locator('.items-center a[href="/events"]').click();
    const allEventCardsAgain = page.locator("#event-card");
    await allEventCardsAgain.first().waitFor();
    console.log("-----------", await page.url());
    console.log("Step 8 — Verify seat reduction");
    await expect(allEventCardsAgain.first()).toBeVisible();
   
    let seatsAfterBooking;
    console.log(await allEventCardsAgain.allTextContents());
    console.log("All event card's' count is : ", await allEventCardsAgain.count());
    for(let i=0;i<await allEventCardsAgain.count(); i++){
            const eventCardName = await allEventCardsAgain.nth(i).locator("h3").textContent();
            console.log(i, "th event name is : ", eventCardName);
            if(eventCardName===titleName){
                console.log(i, "th Event is matched with expected : ", eventCardName);
                await expect(allEventCardsAgain.nth(i).locator("h3")).toBeVisible({ timeout: 5000 });
                const seatsBeforeBookingtext = await allEventCardsAgain.nth(i).locator(".items-center span").textContent();
                console.log(seatsBeforeBookingtext);
                seatsAfterBooking = Number(seatsBeforeBookingtext.split(" ")[0]);  
                console.log(seatsAfterBooking);  
                expect(seatsAfterBooking).toBe(seatsBeforeBooking-1);
                break;
            }
    }





});



