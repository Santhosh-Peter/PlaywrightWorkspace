
import{test, expect, Browser, Page, Locator} from '@playwright/test'
import { chromium } from 'playwright'

test("Launch Playwright and goto docs", async() => {

    const browser: Browser = await chromium.launch({headless : false, channel : 'chrome'});
    const page: Page = await browser.newPage();

    await page.goto("https://playwright.dev/");

    await page.waitForTimeout(2000);

    const language: Locator = await page.locator("//div[@class='navbar__item dropdown dropdown--hoverable']");
    await language.hover();
    const language_Node: Locator = await page.locator("//div[@class='navbar__item dropdown dropdown--hoverable']//ul//li//a[text()='Node.js']"); 
    await language_Node.click();

    await page.locator("//div[@class='container']//h1/following-sibling::div//a[contains(text(),'Get started')]").click();

    await page.screenshot({path : 'New Screnshot.png'})

    const topic: string = await page.locator("//h1").innerText();

    expect(topic).toEqual("Installation");

    // Selecting an option from a dropdown
    // Just save the raw selector (xpath) in a constant. Do not store as a locator
    const dropdown = 'RawSelectorForTheSelectTag';
    page.selectOption(dropdown, {value: "some dowpdown value"});

    // Storing all options of a dropdown
    const allOptions = await page.$$(dropdown + ' > option');
    for(const option of allOptions){
        console.log(option.innerText());
    }


    page.close();
    browser.close();
})