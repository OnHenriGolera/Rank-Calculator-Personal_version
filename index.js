const ranking_links = require("./data/json/ranking_links.json")
const scrapeFFE = require("./utilities/scrapper")
const categories = Object.keys(ranking_links)
const RankUpdater = require("./utilities/updateRanks")
const data_calculator = require("./utilities/data_calculator")
const change_points = require("./utilities/change_points")
const CSV2JSON = require("./utilities/conversion/CSV2JSON")
const { JSON2CSV } = require("./utilities/conversion/JSON2CSV")


//Config *I assume every var is correctly configurated*

const data = {

    competition_category: "FHM20",
    force_coefficient: 11300,
    FFF_files: [
        "./data/input/henin-dimanche.fff", // Sunday first
        "./data/input/henin-samedi.fff"    // Saturday first
    ],
    last_year: "https://www.escrime-ffe.fr/fr/vie-sportive/classements/1032-national-ffe-tiret-m20-fleuret-hommes/13918-circuit-national-henin-beaumont-2021"

}

main(data)

async function main(data){

    data_calculator.data_calculator(data)

    RankUpdater.updateRanks([data.competition_category])

    var FFE_ranking = await CSV2JSON.CSV2JSON(`./data/csv/ffe_ranking/${data.competition_category}.csv`)

    if (data.last_year!=undefined){

        FFE_ranking = await change_points.substract_points(data, FFE_ranking)
        
    }

    FFE_ranking = await change_points.add_points(data, FFE_ranking)

    JSON2CSV(FFE_ranking, "./data/csv/output/out.csv")

}
