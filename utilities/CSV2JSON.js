const fs = require("fs")

// Not finished

function CSV2JSON(file){

    var csv = fs.readFileSync(file, {encoding:'utf8', flag:'r'}).split("\n")
    console.log(csv)

}