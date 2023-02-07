import test, { chromium } from "@playwright/test";
test

test.describe("Upload file", ()=> {

    const videoA = '../video/a.webm';
    const videoB = '../video/b.webm';
     
    test("upload video file", async() => {

    const browser = await chromium.launch({headless: false});

    const brContext = await browser.newContext();
    const page = await brContext.newPage();

    await page.goto("https://www.sendgb.com/en/");
    await page.setInputFiles("input[name='qqfile']", [videoA, videoB]);
    })

    test("upload video file 2", async ()=> {
        const browser = await chromium.launch({headless: false});

        const brContext = await browser.newContext();
        const page = await brContext.newPage();
        await page.goto("https://the-internet.herokuapp.com/upload");
        page.on("filechooser", async (fileChooser)  => {
             await fileChooser.setFiles([videoA, videoB])
        })
        await page.click("#drag-drop-upload", {force: true})
        await page.waitForTimeout(4000)
    })
})