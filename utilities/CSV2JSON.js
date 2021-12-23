const fs = require("fs")

function CSV2JSON(file){

    var csv = fs.readFileSync(file, {encoding:'utf8', flag:'r'}).split("\n")
    console.log(csv)

}
CSV2JSON("./data/csv/FHM20.csv")