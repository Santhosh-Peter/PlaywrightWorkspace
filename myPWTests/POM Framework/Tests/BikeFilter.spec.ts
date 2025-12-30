import {test, expect, Browser, BrowserContext, Page} from '@playwright/test';
import {azFixture} from '../Utilities/CustomFixture'


test.describe('Search a product and adjust the filters', async() => {

    azFixture('Search the product', async({page, anzLandingPage}) => {

        const deliveryLocation  = await anzLandingPage.getDeliveryLocation();
        expect(deliveryLocation).toBe('Delivering to Chennai 600019')

        const product : string = 'Bike';
        await anzLandingPage.searchProduct(product);
        expect(page.url()).toContain(`https://www.amazon.in/s?k=${product}`);

    });

    azFixture('Validate visibility of  filters', async({anzLandingPage, anzProductResultsPage}) => {

        const deliveryLocation  = await anzLandingPage.getDeliveryLocation();
        expect(deliveryLocation).toBe('Delivering to Chennai 600019')

        const product : string = 'Bike';
        await anzLandingPage.searchProduct(product);

        const visibilityOfFilters = await anzProductResultsPage.areAllFiltersVisible();
        console.log(visibilityOfFilters);

    });


});