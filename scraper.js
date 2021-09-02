/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

const hamsterCache = {};

async function hamsterScrape () {

    // launch puppeteer (opens chrome browser) to see what its doing (headless : true)
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});

    // reference the page of new browser
    const [page] = await browser.pages();

    await page.goto(
    'https://www.whisky-hamster.com/catalog?onSale=true&limit=96  &inc=96&viewType=table'
    , { waitUntil: 'domcontentloaded' });

    // console.log(await page.content());
    // await page.screenshot({ path: 'screenshot.png' });

    // await browser.close();

    //=============== CLASS NAMES ================//
    // sc-jlRMkV ksCOFC -> pound price
    // sc-fXeWgy hmFFGo -> class to get the name
    // sc-gUQueJ eSdaFP  -> proof
    

    const result = await page.evaluate(() => {
        let title = document.querySelector(‘sc-fXeWgy hmFFGo’).innerText;
        let price = document.querySelector(‘sc-jlRMkV ksCOFC’).innerText;
        let proof = document.querySelector(‘sc-gUQueJ eSdaFP’).innerText;
       return {title,price}
      });
}

hamsterScrape()
