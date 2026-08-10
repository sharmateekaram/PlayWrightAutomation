
const ExcelJsObj = require('exceljs');
const {test, expect} = require('@playwright/test');

const filePath = "/Users/AKASH/Downloads/download.xlsx";


 
test('@web Excel upload download', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    //await page.locator("#downloadButton").click();
    await page.getByRole('button',{name:'Download'}).click();
    await downloadPromise;
    //await page.locator("#fileinput").click();

    await writeExcelTest(filePath, "Kivi","Kiwisss");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    console.log(await page.locator(".lnOUep").first().textContent());


    
})


async function writeExcelTest(filePath, valueToBeChange, valueToBeReplaceWith)
{  
    const workbook = new ExcelJsObj.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, valueToBeChange);
    const cell = worksheet.getCell(output.row, output.column);
    cell.value = valueToBeReplaceWith;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, valueToBeChange)
{
    const output = {row:-1, column:-1};
    worksheet.eachRow((row, rowNumber)=>
    {
        row.eachCell((cell, colnumber)=>
        {
            if(cell.value==valueToBeChange)
            {
                output.row = rowNumber;
                output.column = colnumber;
            }
        });
    });
    return output;
}






