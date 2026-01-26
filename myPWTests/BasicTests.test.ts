
    import {test, expect, Browser, BrowserContext, Page, Locator, firefox, APIResponse } from '@playwright/test'
    import { chromium } from '@playwright/test'
    import { link } from 'fs';
    import path from 'path';
    import testData from './testData.json';
    import * as XLSX from 'xlsx';
import { TIMEOUT } from 'dns';
import { error, time } from 'console';

    let browser : Browser;
    let browserContext : BrowserContext;
    let page : Page;


    test.beforeAll(async() => {
        browser = await chromium.launch({headless: false, slowMo: 2000});
    });

    test.afterAll(async() => {
        await browser.close();
    });

    test.beforeEach(async() => {
        browserContext = await browser.newContext();
        page = await browserContext.newPage();
        page.setDefaultTimeout(35000);
        await page.goto('https://testautomationpractice.blogspot.com/');
    });

    test.afterEach(async() => {
        await page.close();
        await browserContext.close();
    });

    test.describe('Whole Application Tests', () =>{

    test('Enter details into text boxes', async() => {

        const nameTB : Locator = await page.getByPlaceholder("Enter Name");
        await nameTB.focus();
        await nameTB.fill("FirstName", {timeout:1000, force : true});
        // await nameTB.pressSequentially("FirstName", {delay : 2000});

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
            await jhgh();
            await page.screenshot({path: 'screenshot1.png', animations : 'allow', scale : 'device', fullPage : true});
            // await clickRadio(element);

        }


    //     async function clickRadio(element: string) {

    //     const genderRadioFemale : Locator = page.locator(element);
    //     await genderRadioFemale.click();
    //     await page.screenshot({path: 'screenshot1.png'});
    // }    



    }); // end of test 1


    test('Select all multi select checkboxes', async() => {

    const checkboxesContainer = page.locator('//div[@class="form-group"][4]');
    const checkboxes = checkboxesContainer.locator('//div');

    const checkBoxesCount : number = await checkboxes.count();

    for(let i = 1; i<=checkBoxesCount; i++){
        await checkboxes.nth(i).click();
        await page.waitForTimeout(2000);
        await page.screenshot({path: './screenshots/screenshot' + i + '.png'});
    }

    }); // end of test 2


    test('Get all countries from dropdown', async() =>{

        const countriesDropdown = page.locator('//select[@id="country"]');
        await countriesDropdown.scrollIntoViewIfNeeded();
        await countriesDropdown.click();
        console.log((await countriesDropdown.allTextContents()).toString());
        console.log("@@@@@@@@@@@");

        const dropdownOptions = page.locator('//select[@id="country"]//option');
        console.log((await dropdownOptions.allTextContents()).toString());
        console.log('--------------------');
        const dropdownOptionsCount : number = await dropdownOptions.count();

        for(let i = 0; i<dropdownOptionsCount; i++){
        // await dropdownOptions.scrollIntoViewIfNeeded();
        let countryName = (await dropdownOptions.nth(i).innerText()).replace(/[^a-z0-9]/gi, '').trim();
        await page.waitForTimeout(1000);
        console.log(countryName);
    }

    }); // End of test 3


    test('Upload files', async() => {

        const uploadSingleFile = page.locator('//input[@id="singleFileInput"]');
        await uploadSingleFile.scrollIntoViewIfNeeded();
        uploadSingleFile.setInputFiles("D:/Downloaded/Austronaut in plasma suite.jpeg");
        await page.waitForTimeout(5000);
        await page.locator('//form[@id="singleFileForm"]//input/following-sibling::button').click();
        await page.waitForTimeout(5000);
    }); // End of test 4


    test('Upload multiple files', async() => {

        const uploadMultiFiles = page.locator('//input[@id="multipleFilesInput"]');
        uploadMultiFiles.scrollIntoViewIfNeeded();
        uploadMultiFiles.setInputFiles(['D:/Downloaded/Austronaut in plasma suite.jpeg',
                                        path.join('D:/Downloaded/Nasa James Webb - Space.jpg')
        ]);
        await page.waitForTimeout(5000);
        await page.locator('//form[@id="multipleFilesForm"]//input/following-sibling::button').click();
        await page.waitForTimeout(5000);

    }); // End of test 5



    test('Handle alerts', async() => {

        const playwrightPracticeSection : Locator = page.getByRole('link', {name: 'PlaywrightPractice'});
        await playwrightPracticeSection.click();

        expect(page.url()).toBe('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
        await page.waitForTimeout(2000);

        await expect(page.getByRole('heading', {name: 'PlaywrightPractice'})).toBeVisible();
        await page.waitForTimeout(2000);

        page.once('dialog', async(alert) =>{

            console.log(alert.type());
            await page.waitForTimeout(2000);
            alert.dismiss();
        });

        await page.locator('//button[@id="alertBtn"]').click();

        page.once('dialog', async(alert) =>{

            console.log(alert.type());
            await page.waitForTimeout(2000);
            alert.accept();
        });
        
        await page.locator('//button[@id="confirmBtn"]').click();

        page.once('dialog', async(alert) =>{

            console.log('Aler type : ' + alert.type());
            await page.waitForTimeout(2000);
            console.log(alert.message());
            alert.accept('Shut up! I know');
        });
        
        await page.locator('//button[@id="promptBtn"]').click();


        // const [mDialog, _] = await Promise.all([
        //     page.waitForEvent('dialog'),
        //     page.locator('//button[@id="promptBtn"]').click(),
        // ]);

        // console.log(mDialog.type());
        // await mDialog.accept('Some text')


    });  // End of test 6


    test('Handle new window and popup', async() => {

        const playwrightPracticeSection : Locator = page.getByRole('link', {name: 'PlaywrightPractice'});
        await playwrightPracticeSection.click();

        const newTabButton = page.getByRole('button', {name: 'New Tab'});

        
        await newTabButton.click();
        const newTab : Page = await page.waitForEvent('popup');
        console.log('new tab url is : ' + newTab.url());
        await newTab.screenshot({path:'./kjhkjh.png'});
        newTab.close();

        await page.waitForTimeout(10000);

        const newPopupButton = page.getByRole('button', {name: 'Popup Windows'});
        await newPopupButton.click();

        const popupPage : Page = await page.waitForEvent('popup');
        console.log('new popup window url is : ' + popupPage.url());
        // await expect(popupPage.getByRole('heading', {name: 'Getting Started'})).toBeVisible();
        await popupPage.screenshot({path:'./lmnopq.png'});
        popupPage.close();
        

    }); // End of test 7


    test('Drag and drops', async() => {

        const playwrightPracticeSection : Locator = page.getByRole('link', {name: 'PlaywrightPractice'});
        await playwrightPracticeSection.click();

        await page.getByText('Drag me to my target').scrollIntoViewIfNeeded();
        await page.waitForTimeout(10000);

        await page.locator('#draggable').hover();
        await page.mouse.down();
        await page.locator('#droppable').hover();
        await page.mouse.up();

        // await page.dragAndDrop('#draggable', '#droppable');
        await page.waitForTimeout(5000);

    }); // End of test 8


    test('Copy Paste', async() => {

        const playwrightPracticeSection : Locator = page.getByRole('link', {name: 'PlaywrightPractice'});
        await playwrightPracticeSection.click();

        const text =  page.locator('//p[contains(text(),"Double click on button")]');
        text.scrollIntoViewIfNeeded();
        text.click({clickCount: 3});
        await page.waitForTimeout(2000);
        await page.keyboard.press('Control+c');
        await page.waitForTimeout(2000);
        const emailbox =  page.locator('xpath=//input[@type="email"]');
        emailbox.scrollIntoViewIfNeeded();
        await emailbox.focus();
        await page.keyboard.press('Control+v');
        await page.waitForTimeout(2000);
    }); // End of test 9


    test('Static Table', async() => {

        const playwrightPracticeSection : Locator = page.getByRole('link', {name: 'PlaywrightPractice'});
        await playwrightPracticeSection.click();

        const staticTable = page.locator('//table[@name="BookTable"]');
        await staticTable.scrollIntoViewIfNeeded();
        const rows = staticTable.locator('//tr');
        const rowCount = await rows.count();
        console.log('Number of rows : ' + rowCount);

        for(let i=0; i<rowCount; i++){
            console.log((await rows.nth(i).innerText()).toString());
        }

        const columnsHeaders = rows.locator('//th');
        console.log('Number of columns : ' + (await columnsHeaders.count()).toString());

        const columnData = rows.locator('//td');
        const columnDataCount = await columnData.count();

        const cellsCount = await columnsHeaders.count() * rowCount;
        console.log('Total cells of the tabe : ' + cellsCount);

        for(let i=0; i<columnDataCount;i++){

            const colValue = await columnData.nth(i).innerText();
            if(colValue == '3000'){
                const expensiveCourse = await columnData.nth(i-1).innerText();
                console.log('Course having the price 3000 is : ' + expensiveCourse.toString());
            }
        }

    }); // End of test 10


    test('Data from Json file', async() => {

        const lastHobby = testData.hobbies[2];
        console.log(lastHobby);

        const secondOrderProduct = testData.orders[1].product;
        console.log(secondOrderProduct);

        expect(testData.orders[0].delivered).toBeTruthy();
        
    }); // End of test 11


    test('Pagination table test', async() => {

        const playwrightPracticeSection : Locator = page.getByRole('link', {name: 'PlaywrightPractice'});
        await playwrightPracticeSection.click();

        await page.waitForSelector('//table[@id="productTable"]');   // needs wait for the paginaion elemens to load
        const tablePages = page.locator('//ul[@class="pagination"]//li');

        console.log('total pages of table : ' + (await tablePages.count()).toString());
    }); // End of test 12



    test('Read from and write to excel', async() => {

        const workbook = XLSX.readFile('C://Users//Santhosh Peter//Desktop//DummyData.xlsx');
        const workSheet = workbook.Sheets["Sheet1"];

        const tableRange = XLSX.utils.decode_range(workSheet['!ref']as string);
        console.log(tableRange);
        const rowCount = tableRange.e.r+1;

        for(let i=2; i<=rowCount; i++){
            const col1Data = workSheet['A'+i]?.v;
            console.log(col1Data);

            if(col1Data?.includes('@gmail.com')){
                workSheet['C'+i] = {t : 's' , v : 'Gmail Account'}; // t for type and v for value
            } else if(col1Data?.includes('@yahoo.com')){
                workSheet['C'+i] = {t :'s' , v : 'Yahoo Account'}
            } else{
                workSheet['C'+i] = {t : 's' , v : 'Outlook Account'}
            }            
        }

        workSheet['!ref'] = `A1:C${rowCount}`; // Use backticks; not qoutes. This is to force Excel to recognize new cells

        try{
                XLSX.writeFile(workbook, 'C://Users//Santhosh Peter//Desktop//DummyData.xlsx');
                console.log('Column written');
            } catch(error){
                console.error('Write went wrong', error);
            }
    }); // End of test 13


    test('Dynamic table', async() => {
        const playwrightPracticeSection : Locator = page.getByRole('link', {name: 'PlaywrightPractice'});
        await playwrightPracticeSection.click();

        const dyTable = page.locator('//table[@id="taskTable"]');
        
        console.log(await findValueInDyTable(dyTable, 'Firefox', 'Memory (MB)'));

    }); // End of test 14


    // This test will not work as page.evaluate runs on browser context unlike the variables declared in the test context.
    // So scrolling from (initialPageSize, newPageSize) doesn’t really mean anything meaningful to window.scrollTo.
    test('Lazy loading page scrolling', async() => {

        let initialPageSize = 0;
        let newPageSize = document.body.scrollHeight;

        while(newPageSize != initialPageSize){

            await page.evaluate(() => {
                window.scrollTo(initialPageSize, newPageSize);
                initialPageSize = newPageSize;
                newPageSize = document.body.scrollHeight;
            });
        }

    }); // End of test 15

    // This approach is perfectly fine but will still error out if the page has infinite scroll.
    // Playwright will giveup looping after 30 seconds no matter how many times it has looped.
    test('Lazy loading page scrolling test', async() => {

        await page.goto('https://www.pinterest.com/today/best/duo-photo-ideas/128364/');
        await page.waitForLoadState('domcontentloaded');

        let initialPageSize = 0;

        while(true){

            let newPageSize = await page.evaluate(() => document.body.scrollHeight);

            if(newPageSize == initialPageSize){
                break;
            }

            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

            await page.waitForTimeout(1000);

        }

    }); // End of test 16


    test('API test', async({request}) => {

        const response = await request.get('https://www.youtube.com/results', {params : 
            {
                'search_query' : 'review+pull+request+like+a+senior'
            }
        , timeout : 3000, failOnStatusCode: true});

        expect(response.status()).toBe(200);
        console.log('Content type recieved in response : ' + response.headers()['content-type'].toString());
        expect(response.headers()['content-type']).toContain('text/html; charset=utf-8');

        const responseBody = await response.body(); // Using .body instead of .json as the response is html page
        console.log(responseBody);

        expect(responseBody).not.toHaveProperty('requestStatus')

    }); // End of test 16

    test('Mocking or Routing an API', async({page}) => {

        await page.goto('https://somewww');

        await page.route('https://www.youtube.com/', async(routee) => {

            // Fulfill does nothing with the response from the API request but we mock the whole Response.
           await routee.fulfill({
            status : 200,
            contentType : 'text/plain',
            headers : {
                header1 : "header1value",
                header2 : "header2value"
            },
            body : JSON.stringify({
                name : "SomeName",
                DOB : 12/12/2020,
                info : 'Nothing here'
            })
           });

           // Aborting the request. Takes pre-defined errorcodes.
           routee.abort('aborted');

        });
    }); // End of test 17


    test('Fetching response and manipulating it beofore using', async() =>{

        // This is kind of a listener. So it should be implemented before actually making a call to the API.
        await page.route('https://dog.ceo/api/breeds/list/all', async(routee) => {

           // Fetch is used to fetch the response and manipulate before using it.
           
            const ogResponse : APIResponse =  await routee.fetch();
            const responseJson = await ogResponse.json();
            console.log('Original response : ' + JSON.stringify(responseJson, null, 2));
            responseJson.message.somejsonField = "SomeNewValue";

            // It should be fulfilled with fulfill() method, passing APIResponse and Response Json body got and manipulated from the fetch.
            await routee.fulfill({response : ogResponse, json : responseJson});

            console.log('New response : ' + JSON.stringify(responseJson, null, 4));

        });

        await page.goto("https://dog.ceo/api/breeds/list/all");

    });


    }); // end of test description

    async function findValueInDyTable(table : Locator, rowValue: String, colValue: String) {
        const dyTableRows = table.locator('//tr');
        const dyTableCols = table.locator('//th');
        const dyTableRowCount = await dyTableRows.count()+1;
        const dyTableColCount = await dyTableCols.count()+1;

        let requiredCell;

        for(let i=2; i<dyTableRowCount; i++){
            if(await dyTableRows.nth(i).innerText() === rowValue){
                const savedRow = i;
                console.log(savedRow);

                for(let j=1; j<dyTableColCount; j++){
                    if(await dyTableCols.nth(i).innerText() === colValue){
                        const savedCol = j;
                        console.log(savedCol);
                        requiredCell = table.locator('tr[' + savedRow + ']//td[' + savedCol + ']');
                        await requiredCell.screenshot({animations : 'allow', type : 'png', path : '.DynamicTableValue.png'})
                            console.log((await requiredCell.innerText()).toString());
                            await page.screenshot({fullPage : true, animations : 'allow', type : 'png', path : '.DynamicTable.png'})
                    }
                }
            }
        } return requiredCell;

    }