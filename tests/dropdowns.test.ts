import test, { Browser, BrowserContext, chromium, Page } from "@playwright/test";

test.describe('handle inputs', () => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;

    test.beforeAll (async () => {
        browser = await chromium.launch({headless:false})
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://letcode.in/dropdowns")
    })

    test("select based on value", async () => {
       const ddown = await page.$("#fruits");
       await ddown?.selectOption("2");
       let msg = await page.$(".subtitle")
       console.log(await msg?.textContent(), "ertreteetrt");
       if(msg){
         test.expect(await msg.textContent()).toContain("Orange");
       }
    })

    test('count selected', async () => {
        const lang = await page.$$("#lang option")
        console.log(lang.length, "length");
    })

    test('select country', async () => {
        //await page.selectOption("#country", {index: 2})
        const textV = await page.$eval<string, HTMLSelectElement>("#country", e => e.value)
        console.log(textV);
        test.expect(textV).toBe("Argentina")
    })
    
    

    test.afterAll(async () => {
        await page.waitForTimeout(5000)
        await page.close();
        await context.close();
        await browser.close();
    })


})