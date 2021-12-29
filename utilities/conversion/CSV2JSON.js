var fs = require('fs')

function CSV2JSON(input_file){

    var lines = []
    var JSON_out = []

    lines = fs.readFileSync(input_file, 'utf8').split("\n")

    var keys = lines[0].split(",")

    for (var i=1;i<lines.length;i++){

        var player_data = lines[i].split(",")
        
        var player_out = {}

        for (a=0;a<keys.length;a++){

            player_out[keys[a]] = player_data[a]

        }

        if (player_out.name != undefined & player_out.surname != undefined){
            JSON_out.push(player_out)
        }

    }
    
    return JSON_out

}

exports.CSV2JSON = CSV2JSON