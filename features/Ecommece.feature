Feature: Ecommerce Valdiation

    Scenario: Placing  order
        Given User login in the Ecom application with "Akash@abc.com" and "Testing@11111"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in cart
        When Enter valid payment details and Place the order with country code "ind", and country Name " India", and username "Akash@abc.com"
        Then Verify order on confirmation page
        And Verify order is present in the Order History