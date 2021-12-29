//const FFF2JSON = require("./conversion/FFF2JSON")

function formulae(F, rank, player_number){

    return Math.round( F * (1.01 - Math.log10(rank) / Math.log10(player_number)) * 100 ) / 100

}

function competition(FORCE, dDay, firstDay=[]){

    if (firstDay===undefined){ firstDay = [] }

    var true_first_day = firstDay.slice(dDay.length+1, firstDay.length)

    var real_rank = dDay.concat(true_first_day)

    var player_number = real_rank.length

    if (firstDay.length > 1){
        player_number = firstDay.length
    }
    

    for (player in real_rank){

        var player_data = real_rank[player]

        real_rank[player]["points"] = formulae(FORCE, parseInt(player_data.rank), player_number)

    }

    return real_rank

}

exports.competition = competition

//competition(11300, FFF2JSON.FFF2JSON("./data/other/henin-dimanche.fff"), FFF2JSON.FFF2JSON("./data/other/henin-samedi.fff")) // Henin Beaumont
//competition(12800, FFF2JSON.FFF2JSON("./data/other/paris.fff")) // Paris