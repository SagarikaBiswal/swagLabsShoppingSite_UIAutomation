Feature: Login into Swag Lab Shopping Website, add items to cart and checkout

    Background:
        Given I am on the Swag Lab login page

    Scenario Outline: 
        Given I login with valid credentials
        And I should be redirected to Swag Lab Dashboard showing "Products"
    
        When I add items to the cart
        And Click on cart button
    
        Then I am in "Checkout" Page
        And I fill up the required personal details in the form and submit
        And I am in "Overview" page and Click on finish button
        And I click on Menu Page and click on logout button
    
        
    