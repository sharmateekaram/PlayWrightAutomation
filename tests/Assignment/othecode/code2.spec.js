

import { test, expect } from '@playwright/test';

test.beforeEach('Login Function', async ({ page, context, browser }) => {
    const BaseURL = 'https://eventhub.rahulshettyacademy.com/';
    await page.goto(BaseURL);
    const emailBox = page.getByPlaceholder("you@email.com"); // page.locator("#email");
    await emailBox.click();
    await emailBox.fill('ajay123@yopmail.com');
    const passwordBox = page.locator("#password");
    await passwordBox.click();
    await passwordBox.fill('Bob@1234');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

});

let eventTitle="PlayWrightBOB02";
let eventSeats=124;
test('Step-1: Create An Event', async ({ page }) => {
    const AdminNav=page.getByRole('button', { name: 'Admin' });

    await AdminNav.click();

    const ManageEventNav=page.getByRole('navigation').getByRole('link', { name: 'Manage Events' });

    await ManageEventNav.click();
    const Title=page.locator('#event-title-input')
    const Description=page.getByPlaceholder('Describe the event…' );
    const City=page.locator('#city');
    const Category=page.locator('#category');
    const Venue=page.locator('#venue');
    const DateTime = page.locator("#event-date-\\&-time"); //Notice the double backslash (\\) because JavaScript strings require escaping the backslash.
    const Price=page.locator('#price-\\(\\$\\)');
    const TotalSeats=page.locator('#total-seats')
    const AddEventBtn=page.locator('#add-event-btn');

    await Title.click();
    await Title.fill(eventTitle);
    await Description.click();
    await Description.fill('BOB01');
    await City.click();
    await City.fill('Bangalore');
    await Category.selectOption('Workshop');
    await Venue.click();
    await Venue.fill('Near Majestic');

    await DateTime.fill('2027-10-31T12:34');
    await Price.click();
    await Price.fill('124');
    await TotalSeats.click();
    await TotalSeats.fill(eventSeats.toString());
     
    await AddEventBtn.click();
    await expect(page.getByText('Event created!')).toBeVisible();
});


test('Step4:',async({page})=>{
await page.getByTestId('nav-events').click();
const eventCards = page.locator("#event-card");
await expect(eventCards.first()).toBeVisible();
const eventCard = eventCards.filter({
  hasText: eventTitle,
});
//await expect(eventCard).toBeVisible({ timeout: 5000 });
const seatText = await eventCard.locator("text=/seat/i").innerText();

const seatsBeforeBooking = parseInt(seatText.match(/\d+/)[0], 10);
await expect(seatsBeforeBooking).toBe(eventSeats);

await eventCard.locator("#book-now-btn").click();


await expect(page.locator('#ticket-count')).toHaveText('1');
await page.getByLabel('Full Name').fill('ajay1234');
await page.locator('#customer-email').fill('ajay1234@yopmail.com');
await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
await page.locator('.confirm-booking-btn').click();
const bookingRefElement = page.locator('.booking-ref').first();
await expect(bookingRefElement).toBeVisible();
const bookingRef = (await bookingRefElement.innerText()).trim();

console.log("Booking Reference:", bookingRef);

await page.getByRole('button', { name: 'View My Bookings' }).click();
const bookingCard = page.getByTestId('booking-card').filter({ hasText: bookingRef });
await expect(bookingCard).toBeVisible();
const displayedBookingRef = await bookingCard.locator('.booking-ref').innerText();
await expect(displayedBookingRef.trim()).toBe(bookingRef);

// Get all event cards
//const eventCards = page.locator('event-card');
await page.getByTestId('nav-events').click();
// Assert page loaded
await expect(eventCards.first()).toBeVisible();

// Find your event card
const eventCardAfterBooking = eventCards.filter({
    hasText: eventTitle
});

// Assert matched card visible
await expect(eventCardAfterBooking).toBeVisible({ timeout: 5000 });

// Read seat count again
const seatTextAfterBooking = await eventCardAfterBooking
    .locator("text=/seat/i")
    .innerText();

const seatsAfterBooking = parseInt(seatTextAfterBooking.match(/\d+/)[0], 10);
// Verify seat reduction
await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

console.log("AfterBooking",seatsAfterBooking,"/",seatsBeforeBooking);

});