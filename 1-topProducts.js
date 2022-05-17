const puppeteer = require('puppeteer');

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://webscraper.io/test-sites/e-commerce/static');
    //   await page.screenshot({ path: 'top-products.png' });

    //method 1
    const method1 = await page.evaluate(() => {
        return document.querySelector(".title").innerText
    })

    //method2
    const method2Element = await page.$(".title")
    const method2 = await method2Element.evaluate((el) => el.innerText)

    //method3
    const method3 = await page.$eval(".title", (el) => {
        return el.innerText
    })

    console.log("Method 1 : ", method1)
    console.log("Method 2 : ", method2)
    console.log("Method 3 : ", method3)

    await browser.close();
};

main()