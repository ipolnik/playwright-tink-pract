import test, { Browser, BrowserContext, chromium, Page } from "@playwright/test";

test.describe('handle inputs', () => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;

    test.beforeAll (async () => {
        browser = await chromium.launch({headless:false})
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://letcode.in/windows")
    })

    test('single page handling', async () => {
        const [newWindow] = await Promise.all([
        context.waitForEvent("page"),
        await page.click("#home")
    ]);
        await newWindow.waitForLoadState();
        test.expect(newWindow.url()).toContain("test");
        await newWindow.click('"Log in"');
        await newWindow.waitForURL("https://letcode.in/signin");
        test.expect(newWindow.url()).toContain("signin");
        //await newWindow.close();
        await page.bringToFront();
        await page.click('"Work-Space"');
    })
    
    test('Multiple windows', async () => {
        const [multiPage] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#multi")
        ])
        await multiPage.waitForLoadState();
        const pages = multiPage.context().pages();
        console.log(pages.length, "pages");
        pages.forEach(page => {
            console.log(page.url());
        })
        
    })

    test.afterAll(async () => {
        page.close();
        await context.close();
        await browser.close();
    })
})