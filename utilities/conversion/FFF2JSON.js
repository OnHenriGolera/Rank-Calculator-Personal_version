const fs = require("fs")

function FFF2JSON(filepath){

    // Split with " ;" (see data/other/note-sur-les-fff) 
    var FFF = fs.readFileSync(filepath, {encoding:'utf8', flag:'r'}).split("; ")[1]
    
    // Split with ",t " (see data/other/note-sur-les-fff) 
    var players = FFF.split(",t ")
    /*
    FFE Files are like :
    Surname, Name, Date, Gender, Country,,;,,;, Region, Club,,; Rank
    */
    const options = {
        "surname":0,
        "name":1,
        "date":2,
        "club":10,
        "rank":12
    }

    var data = []

    for (player in players){
        
        var player_data = players[player].split(",")
        var player_JSON = {}

        for (key in options){

            player_JSON[key] = player_data[options[key]].replace(";","")

        }

        data.push(player_JSON)


    }

    return data

}

exports.FFF2JSON = FFF2JSON