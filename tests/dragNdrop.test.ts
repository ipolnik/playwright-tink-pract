import test, {
  Browser,
  BrowserContext,
  chromium,
  Page,
} from "@playwright/test";

test.describe("launch browser", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false, channel: "msedge" });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/dropable");
  });
  test("Open leetcode", async () => {
    const dragE = await page.$("#graggable");
    const dropE = await page.$("#droppable");
    if (dropE && dragE) {
      const dragBound = await dragE.boundingBox();
      const dropBound = await dropE.boundingBox();
      if (dragBound && dropBound) {
        await page.mouse.move(dragBound.x, dragBound.y);
        await page.mouse.down();
        await page.mouse.move(dropBound.x, dropBound.y);
        await page.mouse.down();
      } else {
        throw new Error("No Element");
      }
    }
  });
  test.afterAll(async () => {
    await page.waitForTimeout(3000);
    await page.close();
    await context.close();
    await browser.close();
  });
});
