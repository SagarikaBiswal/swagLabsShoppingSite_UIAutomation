import { $ } from '@wdio/globals'
import Page from './page';

/**
 *  page containing specific selectors and methods for a Login page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername(): ChainablePromiseElement { return $('#user-name'); }

    get inputPassword(): ChainablePromiseElement { return $('#password'); }

    get btnSubmit(): ChainablePromiseElement { return $('#login-button'); }

    get errorMessage():ChainablePromiseElement { return $("//h3[@data-test='error']")}

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await browser.takeScreenshot()
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open();
    }
}

export default new LoginPage();
