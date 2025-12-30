
import {test as fixTest} from '@playwright/test';
import { AnzLandingPage } from '../Pages/AznLandingPage';
import { AnzProductResultsPage } from '../Pages/AnzProductResultsPage';

type amazonPages = {
    anzLandingPage : AnzLandingPage
    anzProductResultsPage : AnzProductResultsPage
}

const amazonFixture = fixTest.extend<amazonPages>({

    anzLandingPage : async({page}, use) => {
        page.goto('https://www.amazon.in/');
        page.waitForLoadState('domcontentloaded')
        await use (new AnzLandingPage(page));
    },

    anzProductResultsPage : async({page}, use) => {

        await use(new AnzProductResultsPage(page));
    },

});


export const azFixture = amazonFixture;