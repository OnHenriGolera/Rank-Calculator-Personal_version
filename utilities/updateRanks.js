const JSON2CSV = require("./JSON2CSV")
const scrapper = require("./scrapper")
const jsonfile = require('jsonfile')

// Const to help
const JSON_ranking_links = "./data/json/ranking_links.json"

async function updateRank(name, link){

    // Keys for ranks
    const default_keys = [
        "rank",
        "surname",
        "name",
        "year",
        "club",
        "points"
    ]
    var real_link = `https://www.escrime-ffe.fr/fr/vie-sportive/classements/${link}/classement-general`
    var path = `./data/csv/${name}.csv`

    // Get data from scrapeFFE, save it
    var JSON_data = await scrapper.scrapeFFE(real_link, default_keys, true)

    // Write JSON data on csv file
    JSON2CSV.JSON2CSV(JSON_data, path)

}

async function updateRanks(ranking_links, force=false){

    // ForEach category, do...
    for (category in ranking_links){

        // Get today's date
        var date = new Date().getTime()

        // If I force-update or the last update was 12 hours ago
        if (force == true || date - ranking_links[category].update > 1000*3600*12){ // > 12h

            // Update category
            console.log(`updating ${category}...`)
            await updateRank( category, ranking_links[category].link )
            console.log(`${category} updated`)

            // Update time in JSON
            ranking_links[category]["update"] = date

            jsonfile.writeFile(JSON_ranking_links, ranking_links, { spaces: 4 }, function (err) {
                if (err) console.error(err)
            })

        }


    }

    console.log("All up to date")

}

exports.updateRanks = updateRanks