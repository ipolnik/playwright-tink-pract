import test, { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import CommonFunctoins from "../../page/commonFunctions.page";
import Header from "../../page/Header.page";
import LoginPage from "../../page/Login.page";
import Env from "../../utils/environment";
import * as data from '../../test-data/login.cred.json'

test.describe('TC001', () => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;

    //all pages
    let header : Header;
    let login: LoginPage;
    let commonFunc : CommonFunctoins;

    test.beforeAll (async () => {
        browser = await chromium.launch({headless:false,
        channel: "chrome"})
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(Env.testUrl);

        header = new Header(page);
        login = new LoginPage(page);
        commonFunc = new CommonFunctoins(page);
    })
    
    test('Login positive_JIRA101', async () => {
        test.expect(page.url()).toBe("https://letcode.in/")
        await header.clickLoginLink();
        await login.enterUserName(data.email);
        await login.enterUserPassword(data.password);
        await login.clickLoginBtn();
        const toaster = await commonFunc.toaster();
        test.expect(await toaster?.textContent()).toContain("Welcome");
        await header.clickSignOutLink();
    })
    
    
    test.afterAll(async () => {
        await page.waitForTimeout(3000)
        await page.close();
        await context.close();
        await browser.close();
    })
})