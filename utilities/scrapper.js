const puppeteer = require('puppeteer')
const text_cleaner = require("./text_cleaner")


async function scrapeFFE(link, keys, multipage=false) {

    /*
    Arborescence : 

    -> classement-general.html
    -> [optional if multi page] classement-general/page1.html
    ->                          classement-general/....

    Each page is in pages var
    */
    var pages = [".html"]
    if (multipage == true){
        
        // First for page number
        const page_number_browser = await puppeteer.launch({})
        const page_number_page = await page_number_browser.newPage()

        await page_number_page.goto(link+".html")

        // On website, page number tag is .pagination-txt
        // I divide by 2 because there are two .pagination-txt div (on top and one on bottom)
        var page_number = parseInt(await (await page_number_page.$$(".pagination-txt")).length / 2)

        if (await page_number_page.$$(".pagination-txt") == null){
            page_number = 1
        }

        page_number_browser.close()

        
        // We add "page1.html", "pageX.html"...
        for (var i=1;i<(page_number);i++){
            pages.push(`/page${i+1}.html`)
        }

    }

    // Main list for each player
    var treated_lines = []

    // ForEach page, we launch a request
    for (var i=0;i<pages.length;i++){

        const browser = await puppeteer.launch({})
        const page = await browser.newPage()

        // i'th page
        await page.goto(link + pages[i])

        // Case if there is not rank
        if (await page.$(".ligne-classmt") == null){
            browser.close()
            return {}
        }

        // All ranks are in .ligne-classmnt div
        var lines = await page.$$(".ligne-classmt")

        // This part is to get every element in .ligne-classmnt
        await new Promise((resolve, reject) => {

            lines.forEach(async (column, i) => {

                column = await (await column.getProperty('innerText')).jsonValue()

                // We clean data because is separated by spaces, and for conversion, "," become "." (for float)
                var data = text_cleaner.cleanData(column.replace(",","."), keys)
                if (!treated_lines.includes(data)){
                    treated_lines.push(data)
                }
                
                if (i === lines.length - 1) {
                    resolve()
                }

            })

        })

        browser.close()

    }

    //console.log(treated_lines)
    return treated_lines

}

exports.scrapeFFE = scrapeFFE