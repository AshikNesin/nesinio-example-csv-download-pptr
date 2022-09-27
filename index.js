const puppeteer = require('puppeteer');
const path = require('path');

// We're creating the a new directory inside current directory where the file will be downloaded
const downloadPath = path.resolve('./download');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await page.goto('https://nesinio-pptr-csv-download.surge.sh', { waitUntil: "networkidle2" });
    await page.waitForSelector(`#downloadLink`)
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    });
    await page.click('#downloadLink')
    await browser.close();
})();