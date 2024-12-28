import Page from "./page";

class DashboardPage extends Page{
    
    get productTitle() { return $('.title'); }

    get productLists(): ChainablePromiseArray  { return $$("//div[@class='inventory_item_name ']"); }
    
    productItems(index: number): ChainablePromiseElement{ return $(`(//div[@class='inventory_item_name '])[${index}]`); }

    productPrice(index: number): ChainablePromiseElement { return $(`(//div[@class='inventory_item_price'])[${index}]`); }

    productAddToCartButton(index: number) { return $(`(//div[@class='inventory_item_price'])//following::button[${index}]`); }

    get cartButton(): ChainablePromiseElement  { return $('.shopping_cart_link'); }

    get checkOutButton(): ChainablePromiseElement  { return $('#checkout'); }


    // Dashboard Methods

    public async searchAnItemAddToCart(itemArr: string[]): Promise<void> {
        const lengthOfProductLists = await this.productLists.length;

        for (let index = 1; index <= lengthOfProductLists; index++) {
            const productName = await this.productItems(index).getText();
            if (itemArr.some(item => productName.includes(item))) {
                console.log(`Product Name:${productName}`);
                console.log(`Product price:${await this.productPrice(index).getText()}`);
                await this.productAddToCartButton(index).click();
            }
            
        }
       
        
    }

    
}
export default new DashboardPage()