
const base = require('@playwright/test');

exports.customeTest = base.test.extend(
    {
        testDataForOrder: {
            userEmailId: "Akash@abc.com",
            userPswd: "Testing@11111",
            productToAdd: "ZARA COAT 3",
            countrySortName: "ind",
            countryFullName: " India"

        }
    })


