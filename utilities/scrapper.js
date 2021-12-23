const puppeteer = require('puppeteer')
const text_cleaner = require("./text_cleaner")


async function scrapeFFE(link, keys, multipage=false) {


    var pages = [".html"]
    if (multipage == true){

        const page_number_browser = await puppeteer.launch({})
        const page_number_page = await page_number_browser.newPage()

        await page_number_page.goto(link)

        var page_number = parseInt(await page_number_page.$$(".pagination-bt", element => element.length) / 2)

        if (await page_number_page.$(".pagination-bt") == null){
            page_number = 1
        }

        page_number_browser.close()

        

        for (var i=0;i<(page_number);i++){
            pages.push(`/page${i+1}.html`)
        }

    }


    var treated_lines = []

    for (var i=0;i<pages.length;i++){

        const browser = await puppeteer.launch({})
        const page = await browser.newPage()
        await page.goto(link + pages[i])

        if (await page.$(".ligne-classmt") == null){
            browser.close()
            return {}
        }
        var lines = await page.$$(".ligne-classmt")

        await new Promise((resolve, reject) => {

            lines.forEach(async (column, i) => {

                column = await (await column.getProperty('innerText')).jsonValue()

                treated_lines.push( text_cleaner.cleanData(column.replace(",","."), keys) )
                
                if (i === lines.length - 1) {
                    resolve()
                }

            })

        })

        browser.close()

    }


    return treated_lines

}

exports.scrapeFFE = scrapeFFE