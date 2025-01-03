Feature: Login into Swag Lab Shopping Website, add items to cart and checkout

    Background:
        Given I am on the Swag Lab login page
        And I login with valid credentials
        And I should be redirected to Swag Lab Dashboard showing "Products"
    
    Scenario Outline:
        When I click on Filter DropDown and DropDown Opens

        Then I click on "<items>" sort
        And the items are sorted as per selection
        
        Examples:
        |items          |
        |Name (A to Z)  |
        |Name (Z to A)  |
    