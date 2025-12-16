
    import {test,Locator } from '@playwright/test'

    test('Dynamic table', async({page}) => {

        await page.goto('https://testautomationpractice.blogspot.com/');
        const playwrightPracticeSection : Locator = page.getByRole('link', {name: 'PlaywrightPractice'});
        await playwrightPracticeSection.click();

        const dyTable = page.locator('#taskTable');
        await dyTable.scrollIntoViewIfNeeded();
        await page.waitForTimeout(15000);
        
        console.log('Firefox used ' + await findValueInDyTable(page, dyTable, 'Firefox', 'Memory (MB)') + ' of memory.');

    });

        async function findValueInDyTable(page : any, table : Locator, rowValue: String, colValue: String) {
            const dyTableRows = table.locator('tr');
            const dyTableheads = table.locator('th');
            const dyTableRowCount = await dyTableRows.count();
            const dyTableColCount = await dyTableheads.count();

            let requiredCell;
            let savedRow;

            console.log('dyTableColCount '+dyTableColCount);
            await table.scrollIntoViewIfNeeded();


            for(let i=1; i<=dyTableRowCount; i++){
                console.log('i value : ' + i)
                let rowsFirstCell = ((await dyTableRows.nth(i).locator('td').first().innerText()).trim()).toString();
                if(rowsFirstCell === rowValue){
                    savedRow = i;
                    console.log(rowValue + ' is available in row : ' + savedRow);
                    break;   
                }    
            }

            for(let j=1; j<=dyTableColCount; j++){
                console.log('j value : ' + j);
                let headerValue = (await table.locator('//thead//th').nth(j).innerText()).toString();
                console.log('Header : ' + headerValue);
                        if(headerValue.trim().toLowerCase() === colValue.trim().toLowerCase()){
                            const savedCol = j+1;
                            console.log('saved col : '+savedCol);
                            requiredCell = table.locator(`tr:nth-child(${savedRow}) td:nth-child(${savedCol})`);
                            await requiredCell.screenshot({animations : 'allow', type : 'png', path : '.DynamicTableValue.png'});
                            console.log((await requiredCell.innerText()).toString());
                            await page.screenshot({fullPage : true, animations : 'allow', type : 'png', path : '.DynamicTable.png'});
                            break;
                        }
                    }
            return requiredCell?.innerText();
        };