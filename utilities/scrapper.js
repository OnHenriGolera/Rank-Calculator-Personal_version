const puppeteer = require('puppeteer')
const text_cleaner = require("./text_cleaner")


async function scrape(link, keys) {

    const browser = await puppeteer.launch({})
    const page = await browser.newPage()

    await page.goto(link)

    var lines = await page.$$(".ligne-classmt")

    var treated_lines = []

    await new Promise((resolve, reject) => {

        lines.forEach(async (column, i) => {

            column = await (await column.getProperty('innerText')).jsonValue()

            treated_lines.push( text_cleaner.cleanData(column, keys) )
            
            if (i === lines.length - 1) {
                resolve()
            }

        })

    })
    console.log(treated_lines)

    browser.close()

}

exports.scrape = scrape