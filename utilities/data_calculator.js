const JSON2CSV = require("./conversion/JSON2CSV")
const FFF2JSON = require("./conversion/FFF2JSON")
const competition_calculator = require("./competition")

function data_calculator(data){
    var FFF_converted = []

    data.FFF_files.forEach(FFF_file => {

        var converted_file = FFF2JSON.FFF2JSON(FFF_file)
        var output_file = FFF_file.replace("./data/input/", "./data/csv/fff_file/")

        JSON2CSV.JSON2CSV(converted_file, output_file.replace(".fff",".csv"))

        FFF_converted.push(converted_file)

    })

    var competition_points = competition_calculator.competition(data.force_coefficient, FFF_converted[0], FFF_converted[1])
    var output_file = data.FFF_files[0].replace("./data/input/", "./data/csv/competition_points/")
    JSON2CSV.JSON2CSV(competition_points, output_file.replace(".fff",".csv"))
}

exports.data_calculator = data_calculator