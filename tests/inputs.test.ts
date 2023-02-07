import test, { Browser, BrowserContext, chromium, Page } from "@playwright/test";

test.describe('handle inputs', () => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;

    test.beforeAll (async () => {
        browser = await chromium.launch({headless:false})
        context = await browser.newContext();
        page = await context.newPage();
    })

    test("Enter full name", async () => {
        await page.goto("https://letcode.in/edit")
        //await page.type("id=fullName", "test user")
        const nameInput = await page.$("#fullName")
        nameInput?.type("test user")
        const joinText = await page.$("#join")
        //await joinText?.fill("check append")
        await joinText?.focus();
        await page.keyboard.press("End")
        await joinText?.type(" check append")
        const attrt = await page.getAttribute("#getMe", "value")
        console.log(attrt);
        await page.fill("#clearMe", "")
        await page.waitForTimeout(5000) 
    } )

    test.afterAll(async () => {
        page.close();
        await context.close();
        await browser.close();
    })
})