
import {expect, test as setupTest} from '@playwright/test';import path from 'path';


const authenticationFile = path.join(__dirname, '../playwright/.auth/user.json');


setupTest('Amazon authentication setup', async({page}) => {

    await page.goto('https://www.amazon.in/');
    await page.waitForLoadState('domcontentloaded');

    const profile = await page.locator('xpath=//div[@id="nav-link-accountList"]');
    await profile.hover();
    await page.locator('xpath=//span[text()="Sign in"]').click();
    await page.waitForTimeout(3000);
    expect(page.url()).toContain('https://www.amazon.in/ap/signin?');
    await page.waitForTimeout(3000);

    await page.getByRole('textbox', {name : 'email'}).fill('santhoshpeter91@gmail.com');
    await page.locator('xpath=//span[@id="continue"]').click();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('https://www.amazon.in/ax/claim?');

    await page.getByRole('textbox', {name : 'password'}).fill('AmazonPassword*2020');
    await page.getByRole('button', {name : 'Sign in'}).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(20000);
    await page.waitForResponse('https://unagi-na.amazon.com/1/events/com.amazon.Vowels.PageWeightMetrics');

    page.context().storageState({path : authenticationFile});

});