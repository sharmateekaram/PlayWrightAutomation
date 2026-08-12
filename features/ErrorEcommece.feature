Feature: Ecommerce Valdiation

    Scenario: Placing  order
        Given User login in the Ecom2 application with "Akash@abc.com" and "Testing@11111"
        Then  Verify error message is displayed
