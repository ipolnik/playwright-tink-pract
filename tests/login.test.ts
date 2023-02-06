import test, { chromium } from "@playwright/test";

test.describe("launch browser", () => {
  test("Open leetcode", async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({recordVideo: {
      dir: "../video/",
      size: {
        width: 800,
        height: 600
      }
    }});
    const page = await context.newPage();
    await page.goto("https://letcode.in/");
    await page.click("text=Log in")
    await page.fill("input[name=email]", "koushik350@gmail.com")
    await page.fill("input[name=password]", "Pass123$")
    await page.click(`button:text("LOGIN")`)
    await page.click(`"Sign out"`)
    await browser.close();
  });
});