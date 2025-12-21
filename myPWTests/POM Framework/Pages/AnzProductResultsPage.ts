import { Page } from "@playwright/test";

export class AnzProductResultsPage {

    private readonly page : Page;


    constructor(page : Page){
        this.page = page;
    }

    get leftFilterSection() {
         return this.page.locator('#s-refinements');
    }

    get popularShoppingIdeasSection() {
       return this.page.locator('#topRefinements\\/0');
    }

    get deliveryDateSection() {
        return this.page.locator('#deliveryRefinements');
    }

    get priceFilterSection() {
        return this.page.locator('#priceRefinements');
    }

    get reviewFilterSection() {
        return this.page.locator('#reviewsRefinements');
    }

    get brandFilterSection() {
        return this.page.locator('#brandsRefinements');
    }


    async areAllFiltersVisible() : Promise<Boolean> {

        this.page.waitForTimeout(5000);

        let allFilterVisibility : boolean;

        if(await this.leftFilterSection.isVisible() && 
        await this.popularShoppingIdeasSection.isVisible() && 
        await this.deliveryDateSection.isVisible() && 
        await this.priceFilterSection.isVisible() && 
        await this.reviewFilterSection.isVisible() &&
        await this.brandFilterSection.isVisible()){
            allFilterVisibility = true;
        }else{
            allFilterVisibility = false;
            console.log('leftFilterSection : ' + await this.leftFilterSection.isVisible());
            console.log('popularShoppingIdeasSection : ' + await this.popularShoppingIdeasSection.isVisible());
            console.log('deliveryDateSection : ' + await this.deliveryDateSection.isVisible());
            console.log('priceFilterSection : ' + await this.priceFilterSection.isVisible());
            console.log('reviewFilterSection : ' + await this.reviewFilterSection.isVisible());
            console.log('brandFilterSection : ' + await this.brandFilterSection.isVisible());

        }

        return allFilterVisibility;
    }
    

    


}