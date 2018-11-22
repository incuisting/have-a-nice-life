const puppeteer = require('puppeteer')

async function getCookie(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const cookie = await page.cookies()
  return cookie
}

module.exports = {
  getCookie
}
