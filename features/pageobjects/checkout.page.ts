import Page from "./page";

class CheckOutPage extends Page {

    get checkOutTitle() { return $('.title'); }
    get checkOutOverviewTitle() { return $('.title'); }
    get fNameTextBox(): ChainablePromiseElement{ return $('#first-name') }
    get lNameTextBox(): ChainablePromiseElement{ return $('#last-name') }
    get zipTextBox(): ChainablePromiseElement{ return $('#postal-code') }
    get continueButton(): ChainablePromiseElement{ return $('#continue') }
    get finishButton(): ChainablePromiseElement{ return $('#finish') }

    public async enterPeronalDetails(fName:string, lName: string, zip: string){
        await this.fNameTextBox.clearValue();
        await this.fNameTextBox.setValue(fName);

        await this.lNameTextBox.clearValue();
        await this.lNameTextBox.setValue(lName);

        await this.zipTextBox.clearValue();
        await this.zipTextBox.setValue(zip);

        await this.continueButton.click();
    }
}
export default new CheckOutPage()