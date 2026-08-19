Feature: Ecommerce Valdiation

    @Login @InvalidLogin
    Scenario: Invalid Login 1
        Given User login in the Ecom2 application with "Akash11@abc.com" and "Testing@11111"
        Then  Verify error message is displayed

     @InvalidLogin
    Scenario: Invalid Login 2
        Given User login in the Ecom2 application with "Akash22@abc.com" and "Testing@11111"
        Then  Verify error message is displayed

    @Login @Regression
    Scenario: Invalid Login 3
        Given User login in the Ecom2 application with "Akash33@abc.com" and "Testing@11111"
        Then  Verify error message is displayed

    
    Scenario: Invalid Login 4
        Given User login in the Ecom2 application with "Akash44@abc.com" and "Testing@11111"
        Then  Verify error message is displayed
