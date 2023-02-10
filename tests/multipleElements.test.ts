import test, { Browser, BrowserContext, chromium, Page } from "@playwright/test";

test.describe('handle inputs', () => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;

    test.beforeAll (async () => {
        browser = await chromium.launch({headless:false,
        channel: "msedge"})
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://letcode.in/elements")
    })
    
    test("Enter git username", async() =>{
        const elem = await page.$("input[name='username']")
        await elem?.fill("ipolnik")
        await elem?.press("Enter")
        
    })
    
    test("Print all the repos", async () =>{
        await page.waitForSelector("app-gitrepos ol li", {timeout: 5000})
        const repos = await page.$$("app-gitrepos ol li")
        for await (const repo of repos){
            
        }
        const allURLs = Promise.all( repos.map(async(el) => {
            return await el.innerText();
        }))
        console.log(await allURLs);
    })
    
    
   
    test.afterAll(async () => {
        await page.waitForTimeout(3000)
        await page.close();
        await context.close();
        await browser.close();
    })
})