import test, { Browser, BrowserContext, chromium, Page } from "@playwright/test";



test.describe('handle inputs', () => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;

    test.beforeAll (async () => {
        browser = await chromium.launch({headless:false})
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://letcode.in/alert")
    })

    test("simple alert", async () => {
       const ele =  await page.$("#prompt");
       page.on("dialog", (dialog) =>{
        
        console.log(dialog.message());
        console.log(dialog.defaultValue()); 
        console.log(dialog.type()); 
        dialog.accept("accepted")
       })
       await ele?.click();
       page.waitForTimeout(5000)
    })
})