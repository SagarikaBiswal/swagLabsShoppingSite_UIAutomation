import { Given, When, Then } from '@wdio/cucumber-framework';
// import { expect, $ } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page';
import DashboardPage from '../pageobjects/dashboard.page';
import CheckOutPage from '../pageobjects/checkout.page';
import MenuPage from '../pageobjects/menu.page';
import { UserCredentials } from "../../testData/UserCredentials";
import {itemLists} from "../../testData/itemsList"
import { PersonDetails } from "../../testData/PersonDetails";
import checkoutPage from '../pageobjects/checkout.page';

Given('I am on the Swag Lab login page', async () => {
    await LoginPage.open();
});

Given('I login with valid credentials', async () => {
    await LoginPage.login(UserCredentials.userName, UserCredentials.password)
});

Given('I should be redirected to Swag Lab Dashboard showing {string}', async (message) => {
    try {
        await expect(DashboardPage.productTitle).toBeDisplayed(); 
        await expect(await DashboardPage.productTitle.getText()).toContain(message);
    } catch (error: any) {
        console.log(`Issue in Login: ${error.message}`)
        console.log(`Error Message: ${await LoginPage.errorMessage.getText()} `)
        throw(error)
    }
});

When("I add items to the cart", async () => {
    await DashboardPage.searchAnItemAddToCart(itemLists);
})

When("Click on cart button", async () => {
    await DashboardPage.cartButton.click();
    await DashboardPage.checkOutButton.click();
})

Then('I am in {string} Page', async (message) => {
    await expect(checkoutPage.checkOutTitle).toBeDisplayed();
    await expect(await checkoutPage.checkOutTitle.getText()).toContain(message)
})
Then("I fill up the required personal details in the form and submit", async () => {
    await CheckOutPage.enterPeronalDetails(PersonDetails.FirstName, PersonDetails.LastName, PersonDetails.Zip)
})

Then('I am in {string} page and Click on finish button', async (message) => {
    try {
        await expect(checkoutPage.checkOutOverviewTitle).toBeDisplayed();
        await expect(await checkoutPage.checkOutOverviewTitle.getText()).toContain(message);
        await CheckOutPage.finishButton.click();
    } catch (error: any) {
        console.log(`Issue in Checkout Page: ${error.message}`)
        console.log(`Error Message: ${await CheckOutPage.errorMessage.getText()} `)
        throw(error) 
    }
    
})

Then("I click on Menu Page and click on logout button", async () => {
    await MenuPage.menuButton.click();
    await MenuPage.logOutButton.click()
})




