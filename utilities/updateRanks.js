const JSON2CSV = require("./JSON2CSV")
const scrapper = require("./scrapper")
const jsonfile = require('jsonfile')

const JSON_ranking_links = "./data/json/ranking_links.json"

async function updateRank(name, link){

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

    var JSON_data = await scrapper.scrapeFFE(real_link, default_keys, true)

    JSON2CSV.JSON2CSV(JSON_data, path)

}

async function updateRanks(ranking_links, force=false){

    for (category in ranking_links){

        var date = new Date().getTime()

        if (force == true || date - ranking_links[category].update > 1000*3600*12){ // > 12h

            console.log(`updating ${category}...`)
            await updateRank( category, ranking_links[category].link )
            console.log(`${category} updated`)

            ranking_links[category]["update"] = date

            jsonfile.writeFile(JSON_ranking_links, ranking_links, { spaces: 4 }, function (err) {
                if (err) console.error(err)
            })

        }


    }

    console.log("All up to date")

}

exports.updateRanks = updateRanks