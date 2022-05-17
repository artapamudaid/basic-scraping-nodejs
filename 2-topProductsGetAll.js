const puppeteer = require('puppeteer');

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://webscraper.io/test-sites/e-commerce/static');
    //   await page.screenshot({ path: 'top-products.png' });

    const products = await page.$$eval(".thumbnail", (elements) => {
        const product = elements.map((element) => {
            const name = element.querySelector(".title").getAttribute("title")
            const price = element.querySelector(".pull-right.price").innerText
            const description = element.querySelector(".description").innerText
            const reviewCount = element.querySelector(".ratings .pull-right").innerText
            const rating = element.querySelector("[data-rating]").getAttribute("data-rating")

            return {
                name,price, description, reviewCount, rating
            }
        })

        return product
    })

    console.log(products)
    await browser.close();
};

main()