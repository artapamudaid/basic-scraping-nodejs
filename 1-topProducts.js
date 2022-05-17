const puppeteer = require('puppeteer');

const main = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://webscraper.io/test-sites/e-commerce/static');
  await page.screenshot({ path: 'top-products.png' });

  await browser.close();
};

main()