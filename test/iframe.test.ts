import test, {
  Browser,
  BrowserContext,
  chromium,
  Page,
} from "@playwright/test";

test.describe("handle inputs", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/frame");
  });

  test("iframe", async () => {
    const frame = page.frame({name : "firstFr"});
    if (frame != null) {
      await frame.fill("input[name='lname']", "test frame2");
    } else throw new Error("No frame found");
  });

  test.afterAll(async () => {
    await page.waitForTimeout(4000)
    await page.close();
    await context.close();
    await browser.close();
})
});
