
    import {test, expect, Locator, Browser, Page, BrowserContext} from '@playwright/test'
    import { chromium } from '@playwright/test'
import path from 'path';


    let browser : Browser;
    let browserContext : BrowserContext;
    let page : Page;


    test.beforeAll(async() => {
        browser = await chromium.launch({headless: false});
    });

    test.afterAll(async() => {
        await browser.close();
    });

    test.beforeEach(async() => {
        browserContext = await browser.newContext();
        page = await browserContext.newPage();
    });

    test.afterEach(async() => {
        await browserContext.close();
        await page.close();
    });

    test.describe('Whole Application Tests', () =>{

    test('Enter details into text boxes', async() => {

        page.setDefaultTimeout(15000);

        await page.goto('https://testautomationpractice.blogspot.com/');

        const nameTB : Locator = await page.getByPlaceholder("Enter Name");
        await nameTB.focus();
        await nameTB.fill("FirstName", {timeout:1000});

        (await page.waitForSelector('//input[@placeholder="Enter EMail"]')).focus;

        const genderRadioMale : Locator = await page.locator("#male");
        const radioEnabled: boolean = await genderRadioMale.isEnabled();

        if(radioEnabled == false){
            await genderRadioMale.click();
        } else{
            const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
            await sleep(10000);
            await page.waitForTimeout(10000);
            const jhgh = async() => await page.locator("//input[@id='female']").click();
            await page.screenshot({path: 'screenshot1.png'});
            // await clickRadio(element);

        }


    //     async function clickRadio(element: string) {

    //     const genderRadioFemale : Locator = page.locator(element);
    //     genderRadioFemale.click();
    //     await page.screenshot({path: 'screenshot1.png'});
    // }    



    }); // end of test 1


    test('Select all multi select checkboxes', async() => {

    page.setDefaultTimeout(15000);

    await page.goto('https://testautomationpractice.blogspot.com/');

    const checkboxesContainer = page.locator('//div[@class="form-group"][4]');
    const checkboxes = checkboxesContainer.locator('//div');

    const checkBoxesCount : number = await checkboxes.count();

    for(let i = 0; i<checkBoxesCount; i++){
        await checkboxes.nth(i).click();
        await page.waitForTimeout(2000);
        await page.screenshot({path: './screenshots/screenshot' + i + '.png'});
    }

    }); // end of test 2


    test('Get all countries from dropdown', async() =>{

        await page.goto('https://testautomationpractice.blogspot.com/');

        const countriesDropdown = page.locator('//select[@id="country"]');
        await countriesDropdown.scrollIntoViewIfNeeded();
        await countriesDropdown.click();

        const dropdownOptions = page.locator('//select[@id="country"]//option');
        const dropdownOptionsCount : number = await dropdownOptions.count();

        for(let i = 0; i<dropdownOptionsCount; i++){
        // await dropdownOptions.scrollIntoViewIfNeeded();
        let countryName = (await dropdownOptions.nth(i).innerText()).replace(/[^a-z0-9]/gi, '').trim();
        await page.waitForTimeout(1000);
        console.log(countryName);
    }

    }); // End of test 3


    test('Upload files', async() => {

        await page.goto('https://testautomationpractice.blogspot.com/');

        const uploadSingleFile = page.locator('//input[@id="singleFileInput"]');
        await uploadSingleFile.scrollIntoViewIfNeeded();
        uploadSingleFile.setInputFiles("D:/Downloaded/Austronaut in plasma suite.jpeg");
        await page.waitForTimeout(5000);
        await page.locator('//form[@id="singleFileForm"]//input/following-sibling::button').click();
        await page.waitForTimeout(5000);
    }); // End of test 4


    test('Upload multiple files', async() => {

        await page.goto('https://testautomationpractice.blogspot.com/');

        const uploadMultiFiles = page.locator('//input[@id="multipleFilesInput"]');
        uploadMultiFiles.scrollIntoViewIfNeeded();
        uploadMultiFiles.setInputFiles([path.join('D:/Downloaded/Austronaut in plasma suite.jpeg'),
                                        path.join('D:/Downloaded/Nasa James Webb - Space.jpg')
        ]);
        await page.waitForTimeout(5000);
        await page.locator('//form[@id="multipleFilesForm"]//input/following-sibling::button').click();
        await page.waitForTimeout(5000);

    }); // End of test 5


    }); // end of test description

    function something(){
        
    }