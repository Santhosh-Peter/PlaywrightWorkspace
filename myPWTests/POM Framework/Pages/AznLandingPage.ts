import {Page} from '@playwright/test';

export class AnzLandingPage {

    private readonly page : Page;

    constructor(page : Page) {
        this.page = page;
    }

    get globalSearchBox() {
        return this.page.locator('#twotabsearchtextbox');
    }

    get deliveryLocationText() {
        return this.page.locator('xpath=//span[@class="nav-line-1 nav-progressive-content" and contains(text(),"Delivering")]');
    }


    async searchProduct(product : string){
        await this.globalSearchBox.fill(product);
        await this.globalSearchBox.press('Enter', {delay : 2000});
    }

    async getDeliveryLocation() : Promise<string> {
        return await this.deliveryLocationText.innerText();
    }


}
