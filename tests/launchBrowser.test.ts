import test, { chromium } from "@playwright/test";

test.describe("launch browser", () => {
  test("Open leetcode", async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://leetcode.com/");
    await browser.close();
  });
});
