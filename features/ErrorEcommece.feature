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


    @Parameter1
    Scenario Outline:  Invalid Login 4
        Given User login in the Ecom2 application with "<Username_Val" and "<Passowrd_Val"
        Then  Verify error message is displayed
        Example:
            | Username_Val    | Passowrd_Val  |
            | Akash44@abc.com | Testing@11111 |

    @Parameter1
    Scenario Outline:  Invalid Login 5
        Given User login in the Ecom2 application with "<Username_Val" and "<Passowrd_Val"
        Then  Verify error message is displayed
        Examples:
            | Username_Val    | Passowrd_Val  |
            | Akash44@abc.com | Testing@11111 |
            | Akash45@abc.com | Testing@11111 |


#it will execute only first row
 @Parameter1
    Scenario Outline:  Invalid Login 6
        Given User login in the Ecom2 application with "<Username_Val" and "<Passowrd_Val"
        Then  Verify error message is displayed   
        Example:              
            | Username_Val    | Passowrd_Val  |
            | Akash44@abc.com | Testing@11111 |
            | Akash45@abc.com | Testing@11111 |




   
    Scenario Outline:  Invalid Login 7
        Given User login in the Ecom2 application with "<Username_Val" and "<Passowrd_Val"
        Then  Verify error message is displayed   
        @RowTag @RowTag1
        Examples:              
            | Username_Val    | Passowrd_Val  |
            | Akash44@abc.com | Testing@11111 |

       @RowTag @RowTag2
        Examples:              
            | Username_Val    | Passowrd_Val  |
            | Akash55@abc.com | Testing@11111 |     