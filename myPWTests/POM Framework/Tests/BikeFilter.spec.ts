import {test, expect, Browser, BrowserContext, Page} from '@playwright/test';
import { AnzLandingPage } from '../Pages/AznLandingPage';


test.describe('Search a product and adjust the filters', async() => {

    test('Search the product', async({page}) => {
        page.goto('https://www.amazon.in/');
        page.waitForLoadState('domcontentloaded')

        const landingPage = new AnzLandingPage(page);

        const deliveryLocation  = await landingPage.getDeliveryLocation();
        expect(deliveryLocation).toBe('Delivering to Chennai 600009')

        const product : string = 'Bike';
        await landingPage.searchProduct(product);
        // expect(page).toHaveURL(`https://www.amazon.in/s?k=${product}`)

    });

});