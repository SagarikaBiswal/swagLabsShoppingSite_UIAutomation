import { waitForExist } from "webdriverio/build/commands/element";
import Page from "./page";

class DashboardPage extends Page{
    
    /**
     *  page containing specific selectors and methods for a Dashboard page
     */
    
    get productTitle() { return $('.title'); }

    get productLists(): ChainablePromiseArray  { return $$("//div[@class='inventory_item_name ']"); }
    
    productName(index: number): ChainablePromiseElement{ return $(`(//div[@class='inventory_item_name '])[${index}]`); }

    productPrice(index: number): ChainablePromiseElement { return $(`(//div[@class='inventory_item_price'])[${index}]`); }

    productAddToCartButton(index: number) { return $(`(//div[@class='inventory_item_price'])//following::button[${index}]`); }

    get cartButton(): ChainablePromiseElement  { return $('.shopping_cart_link'); }

    get checkOutButton(): ChainablePromiseElement  { return $('#checkout'); }

    get filterButton(): ChainablePromiseElement  { return $('.product_sort_container'); }


    /*
    * productName - Reads the items from Swag Lab Shopping Site
    * @params - itemArr - is an list of items thats need to be added in the cart
    * searchAnItemAddToCart - matches productName and itemArr and add matched items to the cart 
    */
    public async searchAnItemAddToCart(itemArr: string[]): Promise<void> {

        if (itemArr.length<1) {
            console.log("There are no items in the list!!!")
        } else {
            const lengthOfProductLists = await this.productLists.length;

            for (let index = 1; index <= lengthOfProductLists; index++) {
                const pName = await this.productName(index).getText();
                if (itemArr.some(item => pName.includes(item))) {
                    console.log(`Product Name:${pName}`);
                    console.log(`Product price:${await this.productPrice(index).getText()}`);
                    await this.productAddToCartButton(index).click();
                }
            }
        }
        await browser.takeScreenshot()
    }

    /**
     * sortItems - method that select the sort category and validate whether the items are actually sorted as per given order
     */
    public async sortItems(item : string) {
        
        const lengthOfProductLists = await this.productLists.length;
        // console.log(await this.productLists)
        // const itemNames = await Promise.all(this.productLists.map(async (element: any) => await element.getText()));

        let itemNames: string[] = [];
        let expectedSortNames: string[] =[]; 
        for (let index = 1; index <= lengthOfProductLists; index++) {
            console.log(await this.productName(index).getText())
            itemNames.push(await this.productName(index).getText());
        }
        console.log("item :", item);
        console.log("item Name:", itemNames);
        if(item.includes("A to Z")){
            // Ascending Order
            expectedSortNames = [...itemNames].sort((a, b) => a.localeCompare(b));
            console.log("Ascending Order:", expectedSortNames);
        }
        else if(item.includes("Z to A")){
            // Descending order
            expectedSortNames = [...itemNames].sort((a, b) => b.localeCompare(a));
            console.log("Descending Order:", expectedSortNames);
        }
        console.log("Descending Order:", expectedSortNames);
        // click on the Available dropDown 
        console.log(`Sorting by: ${item}`);
        this.filterButton.selectByVisibleText(item);
        await browser.pause(3000)
        await browser.waitUntil(async () => {
            const currentCount = await this.productLists.length;
            return currentCount === lengthOfProductLists;
        }, {
            timeout: 5000,
            timeoutMsg: 'Element count changed during sorting'
        });
        
        let actualItemNames: string[] = [];
        for (let index = 1; index <= lengthOfProductLists; index++) {
            // console.log(await this.productName(index).getText())
            actualItemNames.push(await (await this.productName(index).getText()).trim());
        }
        console.log("actualItemNames"+actualItemNames)
        await expect(actualItemNames).toStrictEqual(expectedSortNames)
        console.log("Sucess")
        // 
        // await browser.pause(3000)
        
        // await browser.pause(3000)


    }
}
export default new DashboardPage()