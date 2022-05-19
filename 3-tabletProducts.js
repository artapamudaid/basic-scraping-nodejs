const puppeteer = require('puppeteer');

const getProducts = async (page) => {

    await page.waitForSelector(".thumbnail")
    return page.$$eval(".thumbnail", (elements) => {
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
}

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://webscraper.io/test-sites/e-commerce/static');

    //  navigate to tablet page
    await page.waitForSelector(".category-link")
    await page.click(".category-link")

    await page.waitForXPath("//*[contains(text(),'Tablet')]")
    const tabletButton = await page.$x("//*[contains(text(),'Tablet')]")
    await tabletButton[0].click();

    const allProducts =[]

    await page.waitForSelector('[rel="next"]')
    let nextButton = await page.$('[rel="next"]')
    const firsPageProducts = await getProducts(page)
    allProducts.push(firsPageProducts)

    while(nextButton !== null) {
        await nextButton.click()
        const products = await getProducts(page)
        allProducts.push(products)

        nextButton = await page.$('[rel="next"]')
    }

    console.log(allProducts)
    await browser.close();

};

main()