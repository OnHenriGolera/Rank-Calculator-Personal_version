const scrapper = require("./scrapper")
const CSV2JSON = require("./conversion/CSV2JSON")

async function substract_points(data, rank){
    const keys = [
        "rank",
        "surname",
        "name",
        "club",
        "points"
    ]

    var FFE_ranking = rank

    var JSON_data = await scrapper.scrapeFFE(data.last_year, keys, true)

    for (player in JSON_data){

        var player_data = JSON_data[player]

        var request = FFE_ranking.findIndex(obj => obj.surname==player_data.surname & obj.name==player_data.name)

        if (request != undefined & request != -1){

            FFE_ranking[request].points = Math.round( (parseFloat(FFE_ranking[request].points) - parseFloat(player_data.points)) * 100 ) / 100
            
        }else{
            FFE_ranking.push(player_data)
        }
    
    }

    return FFE_ranking

}



async function add_points(data, rank){

    var file = data.FFF_files[0].replace("./data/input/", "./data/csv/competition_points/")

    var FFE_ranking = rank

    var JSON_data = CSV2JSON.CSV2JSON(file.replace(".fff",".csv"))

    for (player in JSON_data){

        var player_data = JSON_data[player]

        var request = FFE_ranking.findIndex(obj => obj.surname==player_data.surname & obj.name==player_data.name)

        if (request != undefined & request != -1){

            FFE_ranking[request].points = Math.round( (parseFloat(FFE_ranking[request].points) + parseFloat(player_data.points)) * 100 ) / 100
                
        }else{
            FFE_ranking.push({
                rank: 10000,
                surname: player_data.surname,
                name: player_data.name,
                year: "",
                club: player_data.club,
                points: player_data.points
            })
        }
    
    }


    console.log("sorting...")
    while (is_sorted(FFE_ranking, "points") != -1){

        var index = is_sorted(FFE_ranking, "points")
        var temp1 = FFE_ranking[index]
        var temp2 = FFE_ranking[index+1]

        FFE_ranking[index] = temp2
        FFE_ranking[index+1] = temp1

    }

    for (var i=0;i<FFE_ranking.length;i++){

        FFE_ranking[i].rank = i+1

    }

    return FFE_ranking

}

function is_sorted(json, key){

    for (var i=0;i<json.length-1;i++){

        if (json[i][key] < json[i+1][key]){
            return i
        }

    }
    return -1


}

exports.add_points = add_points
exports.substract_points = substract_points